require('../lib/model')
require('../models/host')

var sys     = require('sys'),
    assert  = require('assert'),
    crypto  = require('crypto')

var myHost = new Host({
  name: 'empiricalapp.com'
})

myHost.store(function(arg){
  sys.puts(arg)
})