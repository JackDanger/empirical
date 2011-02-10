require('./vendor/express/lib')
require('./vendor/express/lib/express/plugins')
require ('./lib/datastore')
var db   = require('./lib/riak-js/lib').getClient(),
    sys  = require('sys'),
    util = require('util')

configure(function(){
  use(MethodOverride)
  use(ContentLength)
  use(CommonLogger)
  use(Cookie)
  use(Session)
  use(Flash)
  set('root', __dirname)
})

get('/', function(){
  this.render('index.haml.html', {
    locals: {
      flashes: this.flash('info')
    }  
  })
})

get('/hosts', function(){

  var self = this

  db.execute('?buckets=true')(function(value, meta){
    if(db.error(value)){
      // handle error
    } else {
      self.contentType('json'),
      self.halt(200, JSON.encode(value.buckets))
    }
  })
})

post('/:host/sessions', function(){  
  var self = this

  getSessions(this.param('host'), function(value, meta){
    if(db.error(value)){
      // handle error
    } else {
      self.contentType('json'),
      self.halt(200, JSON.encode(value))
    }
  })
})
post('/:host/:session/paths', function(){  
  var self = this

  getPaths(this.param('host'), this.param('session'), function(value, meta){
    if(db.error(value)){
      // handle error
    } else {
      self.contentType('json'),
      self.halt(200, JSON.encode(value))
    }
  })
})

get('/public/*', function(file){
  this.sendfile(__dirname + '/public/' + file)
})

get('/*.css', function(file){
  this.render(file + '.sass.css', { layout: false })
})

run()