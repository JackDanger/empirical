Track = new Model('tracks', ['host', 'path'], {

  index: function(host, session, callback){
    db
      .map(function(v, keydata, args) {
        if (v.values) {
          var a = Riak.mapValuesJson(v)[0];
          if (a.session_id == args)
          return [a];
        } else {
          return []
        }
      }, session)
      .reduce(function(values, arg){
        if(0 == values.length)
          return [];
        return values.sort(function(a, b){
          return a.ctime > b.ctime
        });
      })
      .run(host)(function(value, meta){
        if(db.error(value)){
          // handle error
        } else {
          callback(value)
        }  
      })
  }

})
var commonPathsAfter = function(host, path, callback){
  db
    .map(function(v, keydata, args) {
      if (v.values) {
        var ret = [],
        a = Riak.mapValuesJson(v)[0];
        if (a.session_id == args)
          ret.push(a)
        return ret
      } else {
        return []
      }
    }, session)
    .reduce(function(values, arg){
      if(0 == values.length)
        return [];
      return values.sort(function(a, b){
        return a.ctime > b.ctime
      });
    })
    .run(host)(function(value, meta){
      if(db.error(value)){
        // handle error
      } else {
        callback(value)
      }  
    })
}