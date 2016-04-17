/**
 * Created by Aem on 2/8/2016 AD.
 */
"use strict";

var Joi = require("joi");
var SecurityController = require("../../controllers/security/security");

exports.register = function (server, options, next) {
    //
    // Setup the controllers
    var securityController = new SecurityController();

    //
    // Binds all methods
    // when declaring handlers
    server.bind(securityController);

    //
    // Declare routes
    server.route([
        {
            method: "GET",
            path: "/api/security/login/{username}/{password}",
            config: {
                handler: securityController.Login,
                validate: {
                    params: {
                        username: Joi.string().required(),
                        password: Joi.string().required()
                    }
                }
            }
        },
        {
            method: "GET",
            path: "/api/security/user/{token}",
            config: {
                handler: securityController.GetUserByToken,
                validate: {
                    params: {
                        token: Joi.string().required()
                    }
                }
            }
        },
        {
            method: "GET",
            path: "/api/security/user/list",
            handler: securityController.GetUserList,
        },
        {
            method: "GET",
            path: "/api/security/checktoken/{token}",
            config: {
                handler: securityController.CheckToken,
                validate: {
                    params: {
                        token: Joi.string().required()
                    }
                }
            }
        },
        {
            method: "GET",
            path: "/api/security/token/generate/{token}",
            config: {
                handler: securityController.GenerateToken,
                validate: {
                    params: {
                        token: Joi.string().required()
                    }
                }
            }
        },
        {
            method: "PUT",
            path: "/api/security/user/new/{token}",
            config: {
                handler: securityController.CreateNewUser,
                validate: {
                    params: {
                        token: Joi.string().required()
                    },
                    payload: {
                        userName: Joi.string().min(3).max(50).required(),
                        password: Joi.string().min(3).max(255).required(),
                       /* tchChiefId: Joi.string().max(10).required(),
                        tchHenchManId: Joi.string().max(10).required(),*/
                        roleId: Joi.number().required(),
                    }
                }
            }
        }
    ]);

    next();

};

exports.register.attributes = {
    name: "routes-security",
    version: "1.0.0"
};
