## There is no need to set directories here anymore;
## Just run the application

require 'sinatra'

set :static, true

run Sinatra::Application
