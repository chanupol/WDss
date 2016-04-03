/**
 * Created by Aem on 2/8/2016 AD.
 */
"use strict";

var Boom = require("boom");
var SecurityModel = require("../../models/security/security");

var securityModel = new SecurityModel();

function SecurityController() {

}

//--------------------------------------------------------------------------------
//
// User function
//
//--------------------------------------------------------------------------------
SecurityController.prototype.GetUser = function (request, reply) {
    var token = request.payload.token;

    securityModel.CheckToken(token, function(err, tokenResult) {
        if (tokenResult.length <= 0) {
            reply(Boom.unauthorized());
        } else {
            securityModel.GetUser(function (err, result) {
                if (err) {
                    reply(Boom.internal("Cannot get user", err));
                } else {
                    reply(result);
                }
            });
        }
    });
};

SecurityController.prototype.GetUserByToken = function (request, reply) {
    var token = request.params.token;

    securityModel.GetUserByToken(token, function(err, result) {
        if (result == "undefind" || result == null) {
            reply(Boom.unauthorized());
        } else {
            reply(result);
        }
    });
};

SecurityController.prototype.CreateNewUser = function (request, reply) {
    var token = request.params.token;
    var user = request.payload;

    securityModel.CheckToken(token, function(err, tokenResult) {
        if (tokenResult.length <= 0) {
            reply(Boom.unauthorized());
        } else {
            securityModel.CreateNewUser(user, function (err, result) {
                if (err) {
                    reply(Boom.badData("Invalid Data", user));
                } else {
                    reply(result);
                }
            });
        }
    });
};

SecurityController.prototype.GenerateToken = function (request, reply) {
    var token = request.params.token;

    securityModel.CheckToken(token, function(err, tokenResult) {
        if (tokenResult.length <= 0) {
            reply(Boom.unauthorized());
        } else {
            securityModel.GenerateToken(function (err, result) {
                if (err) {
                    reply(Boom.badData("Can't generate token for user.", err));
                } else {
                    reply(result);
                }
            });
        }
    });
};


//--------------------------------------------------------------------------------
//
// Security function
//
//--------------------------------------------------------------------------------
SecurityController.prototype.Login = function (request, reply) {
    var username = request.params.username;
    var password = request.params.password;

    securityModel.Login(username, password, function (err, result) {
        if (err) {
            reply(Boom.unauthorized('invalid username or password'));
            return;
        }

        if (result == undefined || result == null) {
            reply(Boom.unauthorized('invalid username or password'));
        } else {
            reply(result);
        }
    });
};

SecurityController.prototype.CheckToken = function (request, reply) {
    var token = request.params.token;

    securityModel.CheckToken(token, function (err, result) {
        if (err) {
            reply(Boom.internal("Cannot get token", err));
            return;
        }

        if (result == undefined || result == null) {
            reply(Boom.unauthorized('invalid token', 'sample'));
        } else {
            reply(result);
        }
    });
};

module.exports = SecurityController;
