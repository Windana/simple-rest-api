'use strict';
const log = require('simple-node-logger').createSimpleLogger('project.log');

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


    }

    res.send('OK');
};