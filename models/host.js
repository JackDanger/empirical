Host = new Model('hosts', ['name'], {
  index: function(callback){
    db.execute('?buckets=true')(function(value, meta){
      if(db.error(value)){
        // handle error
      } else {
        callback(value.buckets)
      }  
    })
  }
})


