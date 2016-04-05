/**
 * Created by chanupolphermpoon on 4/4/2016 AD.
 */
'use strict';

var Joi = require("joi");
var TeacherController = require("../../controllers/import/teacher");
var Nipple = require('nipple');
exports.register = function (server, options, next) {

    //
    // Setup the controllers
    var teacherController = new TeacherController();

    //
    // Binds all methods
    // when declaring handlers
    server.bind(teacherController);


    //
    // Declare routes
    server.route([
        {
            method: 'GET',
            path: '/api/get/cyberu/teacherdata/',
            handler: teacherController.GetTeacherFromCyberU,
        }

    ]);

    next();
};

exports.register.attributes = {
    name: "routes-import-teacher",
    version: "1.0.0"
};