'use strict';
module.exports = function(app) {
  var appCtrl = require('../controllers/appController');

  // SMS MO Routes
  app.route('/mo')
    .get(appCtrl.mo)
    .post(appCtrl.mo);
};