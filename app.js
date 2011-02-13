
require('./lib/web')
require('./lib/model')
require('fs').readdir('models', function(_, files){
  for (i in files)
    require('./models/'+files[i])
})

for (i in process.argv){
  if ('--port' == process.argv[i]){
    Web.port = process.argv[parseInt(i)+1]
    require('sys').puts("Starting Empirical web app on port "+Web.port)
    Web.listen(Web.port)
  }
}