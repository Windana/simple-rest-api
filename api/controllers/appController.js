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
    
    if(method == 'POST') {
        var ussdAction = body.inboundUSSDMessageRequest.ussdAction;
        log.info('ussdAction | ', ussdAction, ' | at: ', new Date().toJSON());

        //Manipulate the response:
        
        var inJson = body.inboundUSSDMessageRequest;
        var outJson = ussd.ussdMoContinue.outboundUSSDMessageRequest;
        ussd.ussdMoContinue.outboundUSSDMessageRequest = outJson;    

        outJson.address = inJson.address;
        outJson.sessionID = inJson.sessionID;
        outJson.keyword = inJson.keyword;
        outJson.shortCode = inJson.shortCode;
        outJson.outboundUSSDMessage = "Hello dude! Select your choice\n1. Pork\n2. Beef \n3. Cancel";
        outJson.clientCorrelator = inJson.clientCorrelator;
        outJson.responseRequest.notifyURL = inJson.responseRequest.notifyURL;
        outJson.responseRequest.callbackData = inJson.responseRequest.callbackData;
        outJson.ussdAction = "mtfin";
    
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(ussd.ussdMoContinue, null, 3)); 
    }
    else {
        res.send('OK');
    }
};