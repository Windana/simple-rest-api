'use strict';

exports.mo = (req, res) => {
    const { method, url, headers, body } = req;
    console.log('MO request received.');
    console.log(method);
    console.log(url);
    console.log(headers);
    console.log(body);
    res.send('OK');
};