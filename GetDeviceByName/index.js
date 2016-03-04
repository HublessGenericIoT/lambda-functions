console.log('Loading function');

var aws = require('aws-sdk');
var iot = new aws.Iot();

exports.handler = function(event, context) {

    if(!event.name) {
        context.fail("Please provide a device name in the path.")
    }
    var params = {
        thingName: event.name /* required */
    };
    iot.describeThing(params, function(err, data) {
        if (err) {
            console.log("Error: " + err, err.stack); // an error occurred
            context.fail("An error occured querying from IOT. Please reformat your request");
            return;
        }
        context.succeed(data);
        return;
    });
};
