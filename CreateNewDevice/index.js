console.log('Loading function');

var uuid = require('node-uuid');
var aws = require('aws-sdk');
var iot = new aws.Iot();

exports.handler = function(event, context) {

    if(!event.name){
        context.fail("Please provide a device name in the body.");
    }
    if(!event.room){
        context.fail("Please provide a room name in the body.");
    }
    if(!event.type){
        context.fail("Please provide a device type in the body. Allowed types are: { light }");
    }

    var params = {
      attributePayload: { /* required */
        attributes: {
            name: event.name,
            room: event.room,
            type: event.type
        }
      },
      thingName: uuid.v4()  /* required */
    };
    iot.createThing(params, function(err, data) {
        if (err) {
            console.log("Error: " + err, err.stack); // an error occurred
            context.fail("An error occured querying from IOT. Please reformat your request");
            return;
        }
        context.succeed({status: "Success"});
        return;
    });
};
