require.paths.unshift('vendor')

var db      = require('riak-js/lib').getClient(),
    sys     = require('sys'),
    crypto  = require('crypto')

Model = function(bucket, keyParts, instanceMethods){
  var model = this

  instanceMethods.key = function(){
    k = ''
    for(i in keyParts)
      k = k + (i > 0 ? '-' : '') + this.attributes[keyParts[i]]
    return k.replace('/', '_slash_').replace('\\', '_bslash_')
  }

  instanceMethods.save = function(attrs, callback){
    var record = this

    if(typeof attrs == 'function'){
      callback = attrs
      attrs = {}
    }

    if(!callback) callback = function(){}

    // add existing attributes to those specified
    for(name in this.attributes)
      if(!attrs[name])
        attrs[name] = this.attributes[name]

    db.save(bucket, this.key(), attrs)(function(buffer, meta){
      if(meta.statusCode >= 200 && meta.statusCode < 400)
        record.attributes = attrs

      callback.apply(record, [buffer, meta])
    })
  }



  return function(attributes){

    this.attributes = attributes

    for (method in instanceMethods)
      this[method] = instanceMethods[method]

  }

}

require('../models/host')
require('../models/session')
require('../models/track')