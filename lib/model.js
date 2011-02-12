require.paths.unshift('vendor')

var db      = require('riak-js/lib').getClient(),
    sys     = require('sys'),
    crypto  = require('crypto')

Model = function(bucket, keyParts, instanceMethods){
  var model = this

  instanceMethods.key = function(){
    k = ''
    for(i in keyParts)
      k = k + ':' + this.attributes[keyParts[i]]
    return crypto.createHash('md5').update(k).digest()
  }

  instanceMethods.save = function(attributes, callback){
    if(typeof attributes == 'function'){
      callback = attributes
      attributes = {}
    }

    if(!callback) callback = function(){}

    db.save(bucket, this.key(), this.attributes)(callback)
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