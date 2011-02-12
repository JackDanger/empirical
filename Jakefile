var jake = require('jake'),
    OS   = require('os')

jake.task('default', 'test')

jake.task('test', function() {
  OS.system('for test in test/*test.js; do node $test; done;')
})