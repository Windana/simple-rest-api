'use strict';
const log = require('simple-node-logger').createSimpleLogger('project.log');
const ussd = require('../../reqres/ussdMoContinue');

exports.mo = (req, res) => {

    log.info('MO request received. | at: ', new Date().toJSON());

    const { method, url, headers, body } = req;
    log.info('method | ', method, ' | at: ', new Date().toJSON());
    log.info('url | ', url, ' | at: ', new Date().toJSON());
    log.info('headers | ', headers, ' | at: ', new Date().toJSON());
    log.info('body | ', body, ' | at: ', new Date().toJSON());

    if (method == 'POST') {
        var ussdAction = body.inboundUSSDMessageRequest.ussdAction;
        log.info('ussdAction | ', ussdAction, ' | at: ', new Date().toJSON());

        //Manipulate the response:

        var inJson = body.inboundUSSDMessageRequest;
        var outJson = ussd.ussdMoContinue.outboundUSSDMessageRequest;


        outJson.address = inJson.address;
        outJson.sessionID = inJson.sessionID;
        outJson.keyword = inJson.keyword;
        outJson.shortCode = inJson.shortCode;
        outJson.clientCorrelator = inJson.clientCorrelator;
        outJson.responseRequest.notifyURL = inJson.responseRequest.notifyURL;
        outJson.responseRequest.callbackData = inJson.responseRequest.callbackData;
        outJson.ussdAction = "mocont";


        if (inJson.inboundUSSDMessage == null) {
            // 1st Menu
            log.info('1st Menu');
            outJson.outboundUSSDMessage = "Hello dude! Select your choice\n1. Pork\n2. Beef \n3. Cancel";
        }
        else {

            switch (inJson.inboundUSSDMessage) {
                case "1": log.info('1.1 Menu');
                    outJson.outboundUSSDMessage = "Select your choice\n1. Opt1\n2. Opt2 \n3. Cancel";
                    break;
                case "2": log.info('1.2 Menu');
                    outJson.outboundUSSDMessage = "Select your choice\n1. Opt3\n2. Opt4 \n3. Cancel";
                    break;
                case "3": log.info('1.3 Menu');
                    outJson.outboundUSSDMessage = "Thanks!";
                    outJson.ussdAction = "mtfin";
                    break;
            }
        }

        ussd.ussdMoContinue.outboundUSSDMessageRequest = outJson;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(ussd.ussdMoContinue, null, 3));
    }
    else {
        res.send('OK');
    }
};