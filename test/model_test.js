require('../lib/model')

var sys     = require('sys'),
    assert  = require('assert'),
    crypto  = require('crypto')



var testModel = new Model('bucket', ['id', 'name'], {
  instanceMethod: function(arg, callback){
    return callback(arg)
  }
})

var testRecord = new testModel({
  id: 'someId',
  name: 'someName'
})

// key hashing should be reliable
assert.equal(
  crypto.createHash('md5').update(':someId:someName').digest(),
  testRecord.key()
)

// instance methods should work
testRecord.instanceMethod('argument', function(a){
  assert.equal('argument', a)
})

// saving records with no explicit attributes
testRecord.save(function(response){
  sys.puts(require('util').inspect(response))
})
// saving records with explicit attributes

testRecord.save({name: 'newName'}, function(response){
  sys.puts(require('util').inspect(response))
})
