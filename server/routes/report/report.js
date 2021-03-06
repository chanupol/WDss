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
            path: "/api/report/subject/list/{roleId}/{userName}",

            config: {
                handler: reportController.getAllSubject,
                validate: {
                    params: {
                        roleId: Joi.number().required(),
                        userName: Joi.string().required()
                    }
                }
            }
        },
        {
            method: "GET",
            path: "/api/report/subject/list/{periodcode}/{token}/{roleId}/{userName}",
            config: {
                handler: reportController.getSubjectByPeriod,
                validate: {
                    params: {
                        periodcode: Joi.string().required(),
                        token: Joi.string().required(),
                        roleId: Joi.number().required(),
                        userName: Joi.string().required()
                    }
                }
            }
        },
        {
            method: "GET",
            path: "/api/report/subject/teacher/list/{subjectCode}/{periodCode}/{token}/{roleId}/{userName}",
            config: {
                handler: reportController.getTeacherBySubjectPeriod,
                validate: {
                    params: {
                        subjectCode: Joi.string().required(),
                        periodCode: Joi.string().required(),
                        token: Joi.string().required(),
                        roleId: Joi.number().required(),
                        userName: Joi.string().required()
                    }
                }
            }
        },
        {
            method: "GET",
            path: "/api/report/subject/teacher/{subjectCode}",
            config: {
                handler: reportController.getTeacherBySubject,
                validate: {
                    params: {
                        subjectCode: Joi.string().required()
                    }
                }
            }
        },
        {
            method: "GET",
            path: "/api/report/subject/teacher/period/{subjectCode}/{periodCode}",
            config: {
                handler: reportController.getTeacherBySubjectWithPeriod,
                validate: {
                    params: {
                        subjectCode: Joi.string().required(),
                        periodCode: Joi.string().required(),
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
            path: "/api/report/subject/unit/{subjectCode}/{tchCode}",
            config: {
                handler: reportController.getUnitBySubjectTeacher,
                validate: {
                    params: {
                        subjectCode: Joi.string().required(),
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
            path: "/api/report/subject/topic/{subjectCode}/{tchCode}/{unitId}",
            config: {
                handler: reportController.getTopicBySubjectTeacher,
                validate: {
                    params: {
                        subjectCode: Joi.string().required(),
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
        ,
        {
            method: "GET",
            path: "/api/report/period/currentperiod",
            handler: reportController.getCurrentPeriod,
        },
        {
            method: "GET",
            path: "/api/report/subject/zerovdo",
            handler: reportController.getZeroVdoData,
        },
        {
            method: "GET",
            path: "/api/report/subject/zerovdo/period/teachercode/{period}/{tchCode}",
            config: {
                handler: reportController.getDataForChart,
                validate: {
                    params: {
                        tchCode: Joi.string().required(),
                        period: Joi.string().required(),
                    }
                }
            }
        },
        //--------------------------------
        // WHAN Callcenter
        //--------------------------------
        {
            method: "POST",
            path: "/api/report/subject/listMedia",
            config: {
                auth: false,
                handler: reportController.getSubjectByCallCenter,
                validate: {
                    payload: {
                        data: Joi.array().optional()
                    }
                }
            }
        },
        {
            method: "GET",
            path: "/api/report/unit/listUnitBySubjectMedia/{periodCode}/{subjectCode}/{tchCode}",
            config: {
                auth: false,
                handler: reportController.getUnitByCallCenter,
                validate: {
                    params: {
                        subjectCode: Joi.string().required(),
                        tchCode: Joi.string().required(),
                        periodCode: Joi.string().required(),
                    }
                }
            }
        }
    ]);

    next();

};

exports.register.attributes = {
    name: "routes-command-report",
    version: "1.0.0"
};
