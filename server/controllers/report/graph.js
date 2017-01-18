/**
 * Created by chanupolphermpoon on 1/17/2017 AD.
 */

"use strict";


var Boom = require("boom");
var GraphModel = require("../../models/report/graph");
var graphModel = new GraphModel();

function GraphController() {

}

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


module.exports = GraphController;