
var db   = require('riak-js/lib').getClient(),
    sys  = require('sys')



var getHosts = function(callback){
  db.execute('?buckets=true')(function(value, meta){
    if(db.error(value)){
      // handle error
    } else {
      callback(value.buckets)
    }  
  })
}

var getSessions = function(host, callback){
  db.execute('?buckets=true')(function(value, meta){
    if(db.error(value)){
      // handle error
    } else {
      callback(value.buckets)
    }  
  })
}

var getPaths = function(host, session, callback){
  db.execute('?buckets=true')(function(value, meta){
    if(db.error(value)){
      // handle error
    } else {
      callback(value.buckets)
    }  
  })
}

exports.getHosts    = getHosts
exports.getSessions = getSessions
exports.getPaths    = getPaths