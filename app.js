require.paths.unshift('vendor')

var sys  = require('sys'),
    util = require('util'),
    http = require('http'),
    url  = require('url')

var riak = require('./lib/datastore')

http.createServer(function(request, response){

  var uri = url.parse(request.url, true)

  sys.puts(request.url)
  sys.puts(uri.pathname)


  if( '/' == uri.pathname ){
    sys.puts('found!')
    response.writeHead(200, {'Content-Type': 'text/html'})
    response.end('<html>H1 there</html>')


  } else if ( '/hosts' == uri.pathname ){

    response.writeHead(200, {'Content-Type': 'application/json'})
    riak.getHosts(function(hosts){
      response.end(JSON.stringify(hosts))
    })

  } else if ( '/sessions' == uri.pathname ) {

    response.writeHead(200, {'Content-Type': 'application/json'})
    riak.getSessions(uri.query['host'],
                     function(sessions){
                       response.end(JSON.stringify(sessions))
                     })

  } else if ( '/paths' == uri.pathname ) {

    response.writeHead(200, {'Content-Type': 'application/json'})
    riak.getPaths(uri.query['host'],
                  uri.query['session'],
                  function(sessions){
                    response.end(JSON.stringify(sessions))
                  })

  } else {

    response.writeHead(200, {'Content-Type': 'text/html'})
    response.end('Error: could not find "'+uri.pathname+'"')
    
  }

}).listen(9000)

