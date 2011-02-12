require('../app')

var sys     = require('sys'),
    assert  = require('assert'),
    crypto  = require('crypto')


var hosts = ['host1, host2, host3']
for (i in hosts){
  var name = hosts[i]
  var record = new Host({name: name})
  record.save(function(buffer, meta){
    sys.puts(meta.statusCode)
  })
}
