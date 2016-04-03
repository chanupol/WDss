/**
 * Created by chanupolphermpoon on 4/1/2016 AD.
 */
"use strict";

var Joi = require("joi");
var ReportController = require("../../controllers/report/report");

exports.register = function (server, options, next) {
    //
    // Setup the controllers
    var reportController = new ReportController();

    //
    // Binds all methods
    // when declaring handlers
    server.bind(reportController);

    //
    // Declare routes
    server.route([
        {
            method: "GET",
            path: "/api/report/subject/list",
            handler: reportController.getAllSubject,
        },
        {
            method: "GET",
            path: "/api/report/subject/list/{periodcode}",
            config: {
                handler: reportController.getSubjectByPeriod,
                validate: {
                    params: {
                        periodcode: Joi.string().required()
                    }
                }
            }
        },
        {
            method: "GET",
            path: "/api/report/subject/teacher/list/{subjectCode}/{periodCode}",
            config: {
                handler: reportController.getTeacherBySubject,
                validate: {
                    params: {
                        subjectCode: Joi.string().required(),
                        periodCode: Joi.string().required()
                    }
                }
            }
        },
        {
            method: "GET",
            path: "/api/report/subject/unit/list/{subjectCode}/{periodCode}/{tchCode}",
            config: {
                handler: reportController.getUnitBySubjectPeriodTeacher,
                validate: {
                    params: {
                        subjectCode: Joi.string().required(),
                        periodCode: Joi.string().required(),
                        tchCode: Joi.string().required(),

                    }
                }
            }
        },
        {
            method: "GET",
            path: "/api/report/subject/topic/list/{subjectCode}/{periodCode}/{tchCode}/{unitId}",
            config: {
                handler: reportController.getTopicBySubjectPeriodTeacher,
                validate: {
                    params: {
                        subjectCode: Joi.string().required(),
                        periodCode: Joi.string().required(),
                        tchCode: Joi.string().required(),
                        unitId: Joi.string().required(),

                    }
                }
            }
        },
        {
            method: "GET",
            path: "/api/report/subject/period/list",
            handler: reportController.getPeriod,
        }
    ]);

    next();

};

exports.register.attributes = {
    name: "routes-command-report",
    version: "1.0.0"
};
