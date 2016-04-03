/**
 * Created by chanupolphermpoon on 4/1/2016 AD.
 */
"use strict";
var oracledb = require("oracledb");
var Database = require("../../config/database");

oracledb.autoCommit = true;

function ReportModel() {
}

//--------------------------------------------------------------------------------
//
// Get section
//
//--------------------------------------------------------------------------------
ReportModel.prototype.getAllSubject = function (callback) {
    var database = new Database();

    oracledb.outFormat = oracledb.OBJECT;

    oracledb.getConnection(database.oracleConfig(), function (err, connection) {
        if (err) {
            console.error(err.message);
            database.DoRelease(connection);
            callback(err, null);
        }

        connection.execute("SELECT * FROM VSUBJECT", function (err, result) {
            if (err) {
                console.error(err.message);
                database.DoRelease(connection);
                callback(err, null);
            } else {
                database.DoRelease(connection);
                callback(err, result.rows);
            }
        });
    });
};

ReportModel.prototype.getSubjectByPeriod = function (periodCode, callback) {
    var database = new Database();

    oracledb.outFormat = oracledb.OBJECT;

    oracledb.getConnection(database.oracleConfig(), function (err, connection) {
        if (err) {
            console.error(err.message);
            database.DoRelease(connection);
            callback(err, null);
        }

        connection.execute("SELECT * FROM VSUBJECT Where PeriodCode like '%" + periodCode + "%'", function (err, result) {
            if (err) {
                console.error(err.message);
                database.DoRelease(connection);
                callback(err, null);
            } else {
                database.DoRelease(connection);
                callback(err, result.rows);
            }
        });
    });
};

ReportModel.prototype.getPeriod = function (callback) {
    var database = new Database();

    oracledb.outFormat = oracledb.OBJECT;

    oracledb.getConnection(database.oracleConfig(), function (err, connection) {
        if (err) {
            console.error(err.message);
            database.DoRelease(connection);
            callback(err, null);
        }

        connection.execute("SELECT * FROM VPERIOD", function (err, result) {
            if (err) {
                console.error(err.message);
                database.DoRelease(connection);
                callback(err, null);
            } else {
                database.DoRelease(connection);
                callback(err, result.rows);
            }
        });
    });
};

ReportModel.prototype.getTeacherBySubject = function (subjectCode, periodCode, callback) {
    var database = new Database();

    oracledb.outFormat = oracledb.OBJECT;

    oracledb.getConnection(database.oracleConfig(), function (err, connection) {
        if (err) {
            console.error(err.message);
            database.DoRelease(connection);
            callback(err, null);
        }

        connection.execute("SELECT * FROM VGETVDOLENGTHFORTEACHER " +
            "Where SubjectCode ='" + subjectCode + "'  " +
            "and PeriodCode like '%" + periodCode + "%'", function (err, result) {
            if (err) {
                console.error(err.message);
                database.DoRelease(connection);
                callback(err, null);
            } else {
                database.DoRelease(connection);
                callback(err, result.rows);
            }
        });
    });
};

ReportModel.prototype.getUnitBySubjectPeriodTeacher = function (subjectCode, periodCode, tchCode, callback) {
    var database = new Database();

    oracledb.outFormat = oracledb.OBJECT;

    oracledb.getConnection(database.oracleConfig(), function (err, connection) {
        if (err) {
            console.error(err.message);
            database.DoRelease(connection);
            callback(err, null);
        }

        connection.execute("SELECT * FROM vUnit " +
            "Where SubjectCode ='" + subjectCode + "'" +
            " and TchCode =  '" + tchCode + "'" +
            " and PeriodCode like '%" + periodCode + "%'  order by SubjectCode,UnitId", function (err, result) {
            if (err) {
                console.error(err.message);
                database.DoRelease(connection);
                callback(err, null);
            } else {
                database.DoRelease(connection);
                callback(err, result.rows);
            }
        });
    });
};

/*ReportModel.prototype.getUnitBySubjectPeriodTeacher = function (subjectCode, periodCode, tchCode, callback) {
    var database = new Database();

    oracledb.outFormat = oracledb.OBJECT;

    oracledb.getConnection(database.oracleConfig(), function (err, connection) {
        if (err) {
            console.error(err.message);
            database.DoRelease(connection);
            callback(err, null);
        }

        connection.execute("SELECT * FROM vUnit " +
            "Where SubjectCode ='" + subjectCode + "'" +
            " and TchCode =  '" + tchCode + "'" +
            " and PeriodCode like '%" + periodCode + "%' order by SubjectCode,UnitId", function (err, result) {
            if (err) {
                console.error(err.message);
                database.DoRelease(connection);
                callback(err, null);
            } else {
                database.DoRelease(connection);
                callback(err, result.rows);
            }
        });
    });
};*/

ReportModel.prototype.getTopicBySubjectPeriodTeacher = function (subjectCode, periodCode, tchCode, unitId, callback) {
    var database = new Database();

    oracledb.outFormat = oracledb.OBJECT;

    oracledb.getConnection(database.oracleConfig(), function (err, connection) {
        if (err) {
            console.error(err.message);
            database.DoRelease(connection);
            callback(err, null);
        }

        connection.execute("SELECT * FROM vSumTopic " +
            "Where SubjectCode ='" + subjectCode + "'" +
            " and TchCode =  '" + tchCode + "'" +
            " and UnitId =  '" + unitId + "'" +
            " and PeriodCode like '%" + periodCode + "%' order by unitId,topicno", function (err, result) {
            if (err) {
                console.error(err.message);
                database.DoRelease(connection);
                callback(err, null);
            } else {
                database.DoRelease(connection);
                callback(err, result.rows);
            }
        });
    });
};


module.exports = ReportModel;