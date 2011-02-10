
SproutCore = URI.parse 'http://0.0.0.0:4020/'
Riak       = URI.parse 'http://0.0.0.0:8098/'

require 'net/http'

get '/hosts' do
  content_type :json
  get_hosts
end

get '/:host/sessions' do
  content_type :json
  get_sessions params[:host]
end

get '/:host/:session/paths' do
  content_type :json
  get_paths params[:host], params[:session]
end

get '/*' do
  proxy URI.parse(request.url)
end

def proxy uri
  if uri.path[/\.css$/]
    content_type :css
  elsif uri.path[/\.js$/]
    content_type :js
  end

  Net::HTTP.start(SproutCore.host, SproutCore.port) do |http|
    http.get(uri.path.to_s+'?'+uri.query.to_s).read_body
  end
end

def get_hosts
  puts "get hosts"
  Net::HTTP.start(Riak.host, Riak.port) do |http|
    http.get(Riak.path+'riak/?buckets=true').read_body
  end
end

def get_sessions host
  puts "get sessions"
  Net::HTTP.start(Riak.host, Riak.port) do |http|
    http.post(
      Riak.path+'mapred',
      session_query(host)
    ).read_body
  end
end

def get_paths host, session
  puts "get paths"
  Net::HTTP.start(Riak.host, Riak.port) do |http|
    http.post(
      Riak.path+'mapred',
      path_query(host, session)
    ).read_body
  end
end

def session_query host
  %Q{
      {
        "inputs": "#{host}",
        "query": [
          {"map":
            {"language": "javascript",
             "source": "function(v, keydata, args) {
                if (v.values) {
                  var ret = [],
                      a = Riak.mapValuesJson(v)[0];
                  if (a.session_id)
                    return [a];
                  else
                    return [];
                } else {
                  return []
                }
              }"
            }
          },
      {"reduce":
        {"language": "javascript",
         "source":"function(values, arg){
           if(values.length == 0)
             return [];
           return values.reduce(function(a, b){
             a = Array == a.constructor ? a : [a];
             b = Array == b.constructor ? b : [b];

             var collapse = function(s, r){
               if(!s.user_id)   s.user_id   = r.user_id;
               if(!s.user_name) s.user_name = r.user_name;
               s.ctime = s.ctime > r.ctime ? r.ctime : s.ctime;
               s.mtime = s.ctime > r.ctime ? s.ctime : r.ctime;
               return s;
             };

             for (i in b){
               var compare = b[i];
               var found = false;
               for (j in a){
                 var record = a[j];
                 if(record.session_id == compare.session_id){
                   a[j] = collapse(record, compare);
                   found = true;
                 }
               };
               if(!found)
                a.push(compare);
             };

             return a;
           });
          }"
        }
      }]
    }
  }
end

def path_query host, session
  %Q{
    {
      "inputs": "#{host}",
      "query": [
        {"map":
          {"language": "javascript",
           "arg": "#{session}",
           "source": "function(v, keydata, args) {
              if (v.values) {
                var ret = [],
                a = Riak.mapValuesJson(v)[0];
                if (a.session_id == args)
                  ret.push(a)
                return ret
              } else {
                return []
              }
            };"
          }
        },
      {"reduce":
        {"language": "javascript",
         "source":"function(values, arg){
           return values;
           if(0 == values.length)
             return [];
           return values.sort(function(a, b){
             return a.ctime > b.ctime
           });
          }"
        }
      }]
    }
  }
end