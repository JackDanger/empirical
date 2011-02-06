
SproutCoreHost = URI.parse 'http://0.0.0.0:4020'
RiakHost       = URI.parse 'http://0.0.0.0:8098'

get '/data*' do
  uri = URI.parse request.url
  proxy RiakHost, uri.path.sub(/^\/data/, '/riak') + '?' + uri.query
end

get '/*' do
  proxy SproutCoreHost, request.path
end

def proxy uri, path
  require 'open-uri'
  if path[/(\.css\?|.css$)/]
    content_type :css
  elsif path[/(\.js\?|.js$)/]
    content_type :js
  end
  url = "http://#{uri.host}:#{uri.port}#{path}"
  puts url
  open url
end