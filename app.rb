
SproutCoreHost = URI.parse 'http://0.0.0.0:4020'
RiakHost       = URI.parse 'http://0.0.0.0:8098'

get '/data/*' do
  proxy SproutCoreHost, request.path.sub(/^\/app/, '/riak')
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
  open "http://#{uri.host}:#{uri.port}#{path}"
end