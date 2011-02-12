require('../app')

var assert  = require('assert')


// saving
var hosts = ['host1', 'host2', 'host3']
for (i in hosts){
  var name = hosts[i]
  var record = new Host({name: name})
  record.save({id: 'extra'}, function(buffer, meta){
    assert.equal(204, meta.statusCode)
  })
}
