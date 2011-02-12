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
  'someId-someName',
  testRecord.key()
)

// instance methods should work
testRecord.instanceMethod('argument', function(a){
  assert.equal('argument', a)
})

// saving records with no explicit attributes
testRecord.save(function(buffer, meta){
  assert.equal('',  buffer)
  assert.equal(204, meta.statusCode)
})

// saving records with explicit attributes
testRecord.save({name: 'newName'}, function(buffer, meta){
  assert.equal('',  buffer)
  assert.equal(204, meta.statusCode)
  assert.equal('newName', this.attributes.name)
  assert.equal('someId', this.attributes.id)
})
