console.log('Loading function');

var aws = require('aws-sdk');
var iot = new aws.Iot();

exports.handler = function(event, context) {

    if(!event.name) {
        context.fail("Please provide a device name in the path.");
    }
    if(Object.keys(event.attributes).length > 3) {
        context.fail("A thing can only have three keys. Please try again")
    }
    var params = {
      attributePayload: { /* required */
        attributes: event.attributes
      },
      thingName: event.name /* required */
    };
    iot.updateThing(params, function(err, data) {
        if (err) {
            console.log("Error: " + err, err.stack); // an error occurred
            context.fail("An error occured querying from IOT. Please reformat your request");
            return;
        }
        context.succeed({status: "Success"});
        return;
    });
};
