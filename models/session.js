Session = new Model('sessions', ['host', 'id'], {

  index: function(host, callback){
    db
      .map(function(v, keydata, args) {
        if (v.values) {
          var ret = [],
              a = Riak.mapValuesJson(v)[0];
          if (a.session_id)
            return [a];
          else
            return [];
        } else {
          return []
        }
      })
      .reduce(function(values, arg){
         if(values.length == 0)
           return [];
         return values.reduce(function(a, b){
           a = Array == a.constructor ? a : [a];
           b = Array == b.constructor ? b : [b];

           var collapse = function(s, r){
             if(!s.user_id)   s.user_id   = r.user_id;
             if(!s.user_name) s.user_name = r.user_name;
             s.ctime = s.ctime > r.ctime ? r.ctime : s.ctime;
             s.mtime = s.ctime > r.ctime ? s.ctime : r.ctime;
             return s;
           };

           for (i in b){
             var compare = b[i];
             var found = false;
             for (j in a){
               var record = a[j];
               if(record.session_id == compare.session_id){
                 a[j] = collapse(record, compare);
                 found = true;
               }
             };
             if(!found)
              a.push(compare);
           };

           return a;
         })
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

