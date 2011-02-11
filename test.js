require.paths.unshift('vendor')

var sys    = require('sys'),
    util   = require('util'),
    http   = require('http'),
    url    = require('url'),
    crypto = require('crypto'),
    db     = require('riak-js/lib').getClient()

function crypt(string){
  return crypto.createHash('md5').update(string).digest()
}


// db.save('paths',
//         crypt('myhost:/home'),
//         { host: 'myhost', path: '/home'}
// )();
// db.save('paths',
//         crypt('myhost:/cities'),
//         { host: 'myhost', path: '/cities'}
// )(function(a){sys.puts(a)});
// db.save('paths',
//         crypt('myhost:/elsewhere'),
//         { host: 'myhost', path: '/cities'}
// )();
// db.save('tracks',
//         crypt('myhost:/cities'),
//         { session_id: 'session_3_1', path: '/home', user_id: 1, user_path: 'Harvey'},
//         { links: [
//           { bucket: 'paths', key: crypt('myhost:/home'), tag: 'path' }
//         ]}
// )();
// db.save('tracks',
//         null,
//         { session_id: 'session_3_2', path: '/cities', user_id: 1, user_path: 'Harvey'},
//         { links: [
//           { bucket: 'paths', key: crypt('myhost:/home'), tag: 'prev_path' },
//           { bucket: 'paths', key: crypt('myhost:/cities'), tag: 'path' }
//         ]}
// )();
// db.save('tracks',
//         null,
//         { session_id: 'session_3_3', path: '/elsewhere', user_id: 1, user_path: 'Harvey'},
//         { links: [
//           { bucket: 'paths', key: crypt('myhost:/cities'), tag: 'prev_path' },
//           { bucket: 'paths', key: crypt('myhost:/elsewhere'), tag: 'path' }
//         ]}
// )();
// db.save('tracks',
//         null,
//         { session_id: 'session_4_1', path: '/home', user_id: 2, user_path: 'Lisa'},
//         { links: [
//           { bucket: 'paths', key: crypt('myhost:/home'), tag: 'path' }
//         ]}
// )();
// db.save('tracks',
//         null,
//         { session_id: 'session_4_2', path: '/elsewhere', user_id: 2, user_path: 'Lisa'},
//         { links: [
//           { bucket: 'paths', key: crypt('myhost:/home'), tag: 'prev_path' },
//           { bucket: 'paths', key: crypt('myhost:/elsewhere'), tag: 'path' }
//         ]}
// )();


db
  .link({bucket: "paths", tag: "prev_path", keep: false})
  .map(function(values, meta, arg){

    var ret = [[values.key, 1]]
    return ret

  }, crypt('myhost:/home'))
  .reduce(function(values, arg){
  
    return values.reduce(function(acc, item){
      acc = Array == acc[0].constructor ? acc : [acc]

      ejsLog('/www/empirical/map_reduce.log', "acc: "+JSON.stringify(acc))

      var found = false
      for (i in acc){
        existing = acc[i]
        if (existing[0] == item[0]){
          found = true
          existing[1] = existing[1] + item[1]
        }
      }
      if (!found)
        acc.push(item)
      return acc;
    })
  
  })
  .run('tracks')(function(output){
    var ret = {}
    for (i in output)
      ret[output[i][0]] = output[i][1]
    sys.puts(util.inspect(ret, true, 40))
  })