/**
 * Created by chanupolphermpoon on 4/1/2016 AD.
 */
"use strict";


var Boom = require("boom");
var ReportModel = require("../../models/report/report");
var reportModel = new ReportModel();

function ReportController() {

}

ReportController.prototype.getCurrentPeriod = function (request, reply) {

    reportModel.getCurrentPeriod(function (err, result) {
        if (err) {
            reply(Boom.internal("Cannot get period information", err));
        } else {
            reply(result);
        }
    });

};

ReportController.prototype.getAllSubject = function (request, reply) {

    var roleId = request.params.roleId;
    var userName = request.params.userName;

    reportModel.getAllSubject(roleId, userName, function (err, result) {
        if (err) {
            reply(Boom.internal("Cannot get subject list information", err));
        } else {
            reply(result);
        }
    });
};

ReportController.prototype.getSubjectByPeriod = function (request, reply) {

    var periodcode = decodeURIComponent(request.params.periodcode);
    var token = request.params.token;
    var roleId = request.params.roleId;
    var userName = request.params.userName;

    reportModel.getSubjectByPeriod(periodcode, token, roleId, userName, function (err, result) {
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

ReportController.prototype.getTeacherBySubjectPeriod = function (request, reply) {

    var subjectCode = request.params.subjectCode;
    var periodCode = decodeURIComponent(request.params.periodCode);
    var token = request.params.token;
    var roleId = request.params.roleId;
    var userName = request.params.userName;


    reportModel.getTeacherBySubjectPeriod(subjectCode, periodCode, token, roleId, userName, function (err, result) {
        if (err) {
            reply(Boom.internal("Cannot get teacher list information", err));
        } else {
            reply(result);
        }
    });
};

ReportController.prototype.getTeacherBySubject = function (request, reply) {

    var subjectCode = request.params.subjectCode;


    reportModel.getTeacherBySubject(subjectCode, function (err, result) {
        if (err) {
            reply(Boom.internal("Cannot get teacher list information", err));
        } else {
            reply(result);
        }
    });
};

ReportController.prototype.getTeacherBySubjectWithPeriod = function (request, reply) {

    var subjectCode = request.params.subjectCode;
    var periodCode = decodeURIComponent(request.params.periodCode);
    if (periodCode == undefined) {
        periodCode = null;
    }
    reportModel.getTeacherBySubjectWithPeriod(subjectCode, periodCode, function (err, result) {
        if (err) {
            reply(Boom.internal("Cannot get teacher list information", err));
        } else {
            reply(result);
        }
    });
};


ReportController.prototype.getUnitBySubjectPeriodTeacher = function (request, reply) {

    var subjectCode = request.params.subjectCode;
    var tchCode = request.params.tchCode;
    var periodCode = decodeURIComponent(request.params.periodCode);


    reportModel.getUnitBySubjectPeriodTeacher(subjectCode, periodCode, tchCode, function (err, result) {
        if (err) {
            reply(Boom.internal("Cannot get unit list information", err));
        } else {
            reply(result);
        }
    });
};


ReportController.prototype.getUnitBySubjectTeacher = function (request, reply) {

    var subjectCode = request.params.subjectCode;
    var tchCode = request.params.tchCode;


    reportModel.getUnitBySubjectTeacher(subjectCode, tchCode, function (err, result) {
        if (err) {
            reply(Boom.internal("Cannot get unit list information", err));
        } else {
            reply(result);
        }
    });
};


ReportController.prototype.getTopicBySubjectPeriodTeacher = function (request, reply) {

    var subjectCode = request.params.subjectCode;
    var tchCode = request.params.tchCode;
    var periodCode = decodeURIComponent(request.params.periodCode);
    var unitId = request.params.unitId;


    reportModel.getTopicBySubjectPeriodTeacher(subjectCode, periodCode, tchCode, unitId, function (err, result) {
        if (err) {
            reply(Boom.internal("Cannot get unit list information", err));
        } else {
            reply(result);
        }
    });
};


ReportController.prototype.getTopicBySubjectTeacher = function (request, reply) {

    var subjectCode = request.params.subjectCode;
    var tchCode = request.params.tchCode;

    var unitId = request.params.unitId;


    reportModel.getTopicBySubjectTeacher(subjectCode, tchCode, unitId, function (err, result) {
        if (err) {
            reply(Boom.internal("Cannot get unit list information", err));
        } else {
            reply(result);
        }
    });
};


ReportController.prototype.getZeroVdoData = function (request, reply) {
    reportModel.getZeroVdoData(function (err, result) {
        if (err) {
            reply(Boom.internal("Cannot get Zero VDO Data.", err));
        } else {
            reply(result);
        }
    });
};


ReportController.prototype.getDataForChart = function (request, reply) {

    var tchCode = request.params.tchCode;
    var period = request.params.period;


    reportModel.getDataForChart(tchCode, period, function (err, result) {
        if (err) {
            reply(Boom.internal("Cannot get unit list information", err));
        } else {
            reply(result);
        }
    });
};


module.exports = ReportController;
