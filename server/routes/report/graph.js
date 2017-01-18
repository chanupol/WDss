/**
 * Created by chanupolphermpoon on 1/17/2017 AD.
 */

"use strict";

var Joi = require("joi");
var GraphController = require("../../controllers/report/graph");

exports.register = function (server, options, next) {
    //
    // Setup the controllers
    var graphController = new GraphController();

    //
    // Binds all methods
    // when declaring handlers
    server.bind(graphController);

    //
    // Declare routes
    server.route([
        {
            method: "GET",
            path: "/api/graph/tch/list/{roleId}/{userName}",

            config: {
                handler: graphController.getTeacher,
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
            path: "/api/graph/tch/subjects/list/{tchCode}/{periodCode}",

            config: {
                handler: graphController.getSubjectInTeacherWithPeriod,
                validate: {
                    params: {
                        tchCode: Joi.string().required(),
                        periodCode: Joi.string().required()
                    }
                }
            }
        }
    ]);

    next();

};

exports.register.attributes = {
    name: "routes-command-graph",
    version: "1.0.0"
};