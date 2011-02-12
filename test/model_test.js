require('../lib/datastore')

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
