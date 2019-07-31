'use strict';

exports.ussdMoContinue = {
    "outboundUSSDMessageRequest": {
        "address": " tel:+94777123456",
        "sessionID": "B66D71004C29F59CFCD2EB8AD0C21317",
        "keyword": "123",
        "shortCode": "tel:1721",
        "outboundUSSDMessage": " Login to service?\n1. Ok\n2. Cancel ",
        "clientCorrelator": "123456",
        "responseRequest": {
            "notifyURL": "http://ussd.response.receive.url ",
            "callbackData": "some-data-useful-to-the-requester"
        },
        "ussdAction": "mocont"
    }
}