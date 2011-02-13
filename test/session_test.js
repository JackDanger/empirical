require('../app')

var assert = require('assert')


// saving
var host = new Host({name: 'host'})

var sessions = [
  {id: 'session_1', user_name: 'Biff McGee', user_id: 1, host: 'host'},
  {id: 'session_2', user_name: 'Sally Sail', user_id: 3, host: 'host'},
  {id: 'session_3', user_name: 'Gruff Dogg', user_id: 3, host: 'host'}
]

// saving
for (i in sessions){
  var attrs = sessions[i]
  var record = new Session(attrs)
  record.save({user_name: 'New User'}, function(buffer, meta){
    assert.equal(204, meta.statusCode)
    assert.equal('New User', this.attributes.user_name)
  })
}
// finding
var savedAndFound
(new Session({
    host: 'second_host',
    id: 'session_73',
    user_name: 'Becca Finklestein'
  }))
    .save(function(buffer, meta){
          assert.ok(
            meta.statusCode >= 200 && meta.statusCode <  300,
            'Creating record returned status: '+meta.statusCode
          )
          Session.find(['second_host', 'session_73'], function(record){
            savedAndFound = true
            assert.equal('Becca Finklestein', record.user_name)
          })
        })

process.addListener('exit', function() {
  assert.ok(savedAndFound);
});