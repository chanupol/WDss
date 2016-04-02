/**
 * Created by chanupolphermpoon on 4/1/2016 AD.
 */
"use strict";


var Boom = require("boom");
var ReportModel = require("../../models/report/report");
var reportModel = new ReportModel();

function ReportController() {

}

ReportController.prototype.getAllSubject = function (request, reply) {
    reportModel.getAllSubject(function (err, result) {
        if (err) {
            reply(Boom.internal("Cannot get subject list information", err));
        } else {
            reply(result);
        }
    });
};


ReportController.prototype.getPeriod = function (request, reply) {
    reportModel.getPeriod(function (err, result) {
        if (err) {
            reply(Boom.internal("Cannot get period information", err));
        } else {
            reply(result);
        }
    });
};

module.exports = ReportController;
