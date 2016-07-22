'use strict';

var express = require('./express');  // it will search within same directory instead of node_modules
var config = require('../config');
var mongoose = require('./mongoose');
var path = require('path');



module.exports.loadRoutes = function (app) {

    var coreRoute =   require(path.join(process.cwd(),'modules/core/server/routes/core.server.routes'));
    coreRoute(app);

}


// initialize the mongodb
module.exports.start = function () {

    var self =this;

    mongoose.connect(function (db) {
        var app = express.init();  // calls the express init function
        self.loadRoutes(app);
        app.listen(config.app.port,function () {
            console.log("Application is running on port : " + config.app.port);
        });
    })

}