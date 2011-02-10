var Riak = require('../lib/riak-node'),
  assert = require('assert');

var db = new Riak(),
  sessions_bucket = 'riak-js-test-sessions'


db.save(sessions_bucket, 'aaaaaaa1', {path: '/a/first',  session_id: 'AAAAA', user_name: 'Billy', user_id: '2', timer: null, ctime: 'Mon, 12 Jul 2010 05:35:00 GMT'})();
db.save(sessions_bucket, 'aaaaaaa2', {path: '/a/second', session_id: 'AAAAA', user_name: 'Billy', user_id: '2', timer: null, ctime: 'Mon, 12 Jul 2010 05:35:01 GMT'})();
db.save(sessions_bucket, 'aaaaaaa3', {path: '/a/third',  session_id: 'AAAAA', user_name: 'Billy', user_id: '2', timer: null, ctime: 'Mon, 12 Jul 2010 05:35:02 GMT'})();
db.save(sessions_bucket, 'aaaaaaa4', {path: '/a/fourth', session_id: 'AAAAA', user_name: 'Billy', user_id: '2', timer: null, ctime: 'Mon, 12 Jul 2010 05:35:03 GMT'})();
db.save(sessions_bucket, 'bbbbbbb1', {path: '/b/first',  session_id: 'BBBBB', user_name: 'Teresa', user_id: '3', timer: null, ctime: 'Mon, 12 Jul 2010 05:35:04 GMT'})();
db.save(sessions_bucket, 'bbbbbbb2', {path: '/b/second', session_id: 'BBBBB', user_name: 'Teresa', user_id: '3', timer: null, ctime: 'Mon, 12 Jul 2010 05:35:05 GMT'})();

// querying

var map = function(v, keydata, args) {
  if (v.values) {
    var ret = [],
        a = Riak.mapValuesJson(v)[0];
    if (a.session_id == args.session_id) {
      ret.push(a);
    }
    return ret;
  } else {
    return [];
  }
};

var from = 'EZE', before = 'Wed, 14 Jul 2010',
  flight_print = function(flight) {
  db.log('Flight ' + flight.code + ' with destination ' + flight.to + ' departing ' + flight.departure);
};

// map/reduce

// error example
db.reduce(undefined).run(flight_bucket)(function(response, meta) {
  // this will return a 4xx error, because we're passing undefined
  assert.ok(db.error(response))
})

db
  .map(map, {from: from, before: before})
  .run(flight_bucket)(function(response) {
    assert.equal(response.length, 2);
    db.log('Flights from ' + from + ' before ' + before + ':');
    response.forEach(flight_print);
    db.log("");
  });

// link-walking

db.walk(airline_bucket, 'KLM', [["_", "flight"]])(function(response, meta) {
  assert.equal(response.length, 2);
  db.log('Flights for airline KLM:');
  response.forEach(flight_print);
  db.log("");
});

// cleanup

[airline_bucket, airport_bucket, flight_bucket].forEach(function(bucket) {
  db.removeAll(bucket)(function(){});
});