
var db      = require('../vendor/riak-js/lib').getClient(),
    sys     = require('sys'),
    crypto  = require('crypto')

Model = function(bucket, keyParts, instanceMethods){
  var keyParts = keyParts,
      db = db,
      model = this

  return function(attributes){

    this.attributes = attributes

    for (method in instanceMethods)
      this[method] = instanceMethods[method]

    this.key = function(){
      k = ''
      for(i in keyParts)
        k = k + ':' + this.attributes[keyParts[i]]
      return crypto.createHash('md5').update(k).digest()
    }


  }

}

require('../models/host')
require('../models/session')
require('../models/track')