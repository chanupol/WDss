/**
 * Created by chanupolphermpoon on 1/17/2017 AD.
 */

"use strict";


var Boom = require("boom");
var GraphModel = require("../../models/report/graph");
var graphModel = new GraphModel();

function GraphController() {

}

//--------------------------------------------------------------------------------
//
// Get section (Oracle WTUDSS Database)
//
//--------------------------------------------------------------------------------

GraphController.prototype.getTeacher = function (request, reply) {

    var roleId = request.params.roleId;
    var userName = request.params.userName;

    graphModel.getTeacher(roleId, userName, function (err, result) {
        if (err) {
            reply(Boom.internal("Cannot get Teacher list information", err));
        } else {
            reply(result);
        }
    });
};


GraphController.prototype.getSubjectInTeacherWithPeriod = function (request, reply) {

    var criteria = {
        tchCode: request.params.tchCode,
        periodCode: decodeURIComponent(request.params.periodCode)
    };

    graphModel.getSubjectInTeacherWithPeriod(criteria, function (err, result) {

        if (err) {
            reply(Boom.internal("Cannot get Subject list information", err));
        } else {
            reply(result);
        }

    });

};


//--------------------------------------------------------------------------------
//
// Get section (MSSQL CyberU  Database)
//
//--------------------------------------------------------------------------------

GraphController.prototype.getGraphDataInClassPercentage = function (request, reply) {

    var criteria = GraphController.prototype.returnCriteria(request);

    graphModel.getGraphDataInClassPercentage(criteria, function (err, result) {

        if (err) {
            reply(Boom.internal("Cannot get Student In Class information", err));
        } else {
            reply(result);
        }

    });

};

GraphController.prototype.getGraphDataPreTestPercentage = function (request, reply) {

    var criteria = GraphController.prototype.returnCriteria(request);

    graphModel.getGraphDataPreTestPercentage(criteria, function (err, result) {

        if (err) {
            reply(Boom.internal("Cannot get Pre-Test information", err));
        } else {
            reply(result);
        }

    });

};


GraphController.prototype.getGraphDataPostTestPercentage = function (request, reply) {

    var criteria = GraphController.prototype.returnCriteria(request);

    graphModel.getGraphDataPostTestPercentage(criteria, function (err, result) {

        if (err) {
            reply(Boom.internal("Cannot get Post-Test information", err));
        } else {
            reply(result);
        }

    });

};


GraphController.prototype.returnCriteria = function (request, reply) {
    var criteria = {
        tchCode: request.params.tchCode,
        periodCode: decodeURIComponent(request.params.periodCode),
        subjectCode: request.params.subjectCode,
    };

    return criteria;
};


module.exports = GraphController;