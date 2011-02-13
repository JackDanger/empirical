require('../app')

var assert  = require('assert')


// saving
var host = new Host({name: 'host'})

var sessions = [
  {id: 'session_1', user_name: 'Biff McGee', user_id: 1, host: 'host'},
  {id: 'session_2', user_name: 'Sally Sail', user_id: 3, host: 'host'},
  {id: 'session_3', user_name: 'Gruff Dogg', user_id: 3, host: 'host'}
]

// finding
Session.find(['host', 'session_2'], function(record){
  assert.equal('Sally Sail', record.user_name)
})

// saving
for (i in sessions){
  var attrs = sessions[i]
  var record = new Session(attrs)
  record.save({user_name: 'New User'}, function(buffer, meta){
    assert.equal(204, meta.statusCode)
    assert.equal('New User', this.attributes.user_name)
  })
}

