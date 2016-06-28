/**
 * Created by chanupolphermpoon on 6/24/2016 AD.
 */

'use strict';

var Joi = require("joi");
var AnotherTeacherFacultyController = require("../../controllers/teacher/anotherteacherfaculty");
exports.register = function (server, options, next) {

    //
    // Setup the controllers
    var anotherTeacherFacultyController = new AnotherTeacherFacultyController();

    //
    // Binds all methods
    // when declaring handlers
    server.bind(anotherTeacherFacultyController);


    //
    // Declare routes
    server.route([
        {
            method: 'GET',
            path: '/api/anotherteacherfaculty/list',
            handler: anotherTeacherFacultyController.getAnotherTeacherFacultyList,
        },
        {
            method: "POST",
            path: "/api/anotherteacherfaculty/new",
            config: {
                handler: anotherTeacherFacultyController.CreateNewAnotherTeacherFaculty,
                validate: {
                    payload: {
                        tchCode: Joi.string().required().max(10),
                        subjectCode: Joi.string().required().max(10),
                        facultyName: Joi.string().required().max(255)

                    }
                }
            }
        },
        {
            method: "PUT",
            path: "/api/anotherteacherfaculty/update",
            config: {
                handler: anotherTeacherFacultyController.UpdateStatusAnotherTeacherFaculty,
                validate: {
                    payload: {
                        tchCode: Joi.string().required().max(10),
                        subjectCode: Joi.string().required().max(10),
                        facultyName: Joi.string().required().max(255),
                        status: Joi.string().required().max(10),

                    }
                }
            }
        }

    ]);

    next();
};

exports.register.attributes = {
    name: "routes-anotherteacherfaculty",
    version: "1.0.0"
};