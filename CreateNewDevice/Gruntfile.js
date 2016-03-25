var functionName = "CreateNewDevice";

var AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';

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
            function: functionName,
            options: {
                enableVersioning: true
            }
        },
        dev: {
            function: functionName,
            options: {
                enableVersioning: true,
                aliases: "dev"
            }
        },
        prod: {
             function: functionName,
            options: {
                enableVersioning: true,
                aliases: "prod"
            }
        }
    },
    lambda_package: {
        default: {
        },
        dev: {},
        prod: {}
    }
});

//grunt.registerTask('deploy', ['lambda_package', 'lambda_deploy']);
grunt.registerTask('deploy_dev', ['lambda_package:dev', 'lambda_deploy:dev']);
grunt.registerTask('deploy_prod', ['lambda_package:prod', 'lambda_deploy:prod']);
