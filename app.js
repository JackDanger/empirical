
// require('./lib/web')
require('./lib/model')
require('fs').readdir('models', function(_, files){
  for (i in files)
    require('./models/'+files[i])
})

