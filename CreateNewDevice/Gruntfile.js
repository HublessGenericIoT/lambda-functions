var AWS = require('aws-sdk')
AWS.config.region = 'us-east-1'

var grunt = require('grunt');
grunt.loadNpmTasks('grunt-aws-lambda');

grunt.initConfig({
   lambda_invoke: {
      default: {
         options: {
            file_name: 'index.js'
         }
      }
   },
   lambda_deploy: {
      default: {
         function: 'CreateNewDevice'
      }
   },
   lambda_package: {
      default: {
      }
   }
});

grunt.registerTask('deploy', ['lambda_package', 'lambda_deploy'])
