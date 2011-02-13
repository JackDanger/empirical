require.paths.unshift('vendor')

var db      = require('riak-js/lib').getClient(),
    sys     = require('sys'),
    crypto  = require('crypto')

Model = function(bucket, keyParts, extension){

  var createKey = function(attributes){
    k = ''
    for(i in keyParts){
      k = k + (i > 0 ? '-' : '')
      k += attributes[keyParts[i]]
    }

    return k.replace('/', '_s').replace('\\', '_b')
  }

  var classMethods = {
    find: function(keyList, fn){
      var attrs = {}
      for(i in keyParts)
        attrs[keyParts[i]] = keyList[i]
      key = createKey(attrs)

      db.get(bucket, key)(fn)
    }
  }

  var instanceMethods = {
    key: function(){
      return createKey(this.attributes)
    },
    save: function(attrs, fn){
      var record = this

      if(typeof attrs == 'function'){
        fn = attrs
        attrs = {}
      }

      if(!fn) fn = function(){}

      // add existing attributes to those specified
      for(name in this.attributes)
        if(!attrs[name])
          attrs[name] = this.attributes[name]

      db.save(bucket, this.key(), attrs)(function(buffer, meta){
        if(meta.statusCode >= 200 && meta.statusCode < 400)
          record.attributes = attrs

        fn.apply(record, [buffer, meta])
      })
    }
  }
  for (method in extension)
    instanceMethods[method] = extension[method]

  var model = function(attributes){
    this.attributes = attributes
    this.model = model
    // this.keyParts = keyParts
    // this.bucket = bucket

    for (method in instanceMethods)
      this[method] = instanceMethods[method]
  }
  for (method in classMethods)
    model[method] = classMethods[method]

  model.class = this

  return model

}

require('../models/host')
require('../models/session')
require('../models/track')