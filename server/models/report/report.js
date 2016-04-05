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
ReportModel.prototype.getAllSubject = function (roleId, userName, callback) {
    var database = new Database();

    oracledb.outFormat = oracledb.OBJECT;

    if (roleId === 1) {
        oracledb.getConnection(database.oracleConfig(), function (err, connection) {
            if (err) {
                console.error(err.message);
                database.DoRelease(connection);
                callback(err, null);
            }

            connection.execute("Begin SP_GETUSER_FOR_DEAN(:userName,:curUserLevel); End;", {
                userName: userName,
                curUserLevel: {type: oracledb.CURSOR, dir: oracledb.BIND_OUT}
            }, function (err, result) {
                if (err) {
                    console.error(err.message);
                    database.DoRelease(connection);
                    callback(err, null);
                } else {
                    var obj = result.outBinds;
                    obj.curUserLevel.getRows(database.MaximumCursorRows(), function (err, curUserLevel) {
                            if (err) {
                                console.log(err);
                            }

                            var userData = {
                                users: curUserLevel
                            };


                            database.DoRelease(connection);
                            callback(err, curUserLevel);
                        }
                    );
                }
            });
        });
    } else if(roleId === 2) {
        oracledb.getConnection(database.oracleConfig(), function (err, connection) {
            if (err) {
                console.error(err.message);
                database.DoRelease(connection);
                callback(err, null);
            }

            var strSql = "SELECT distinct VSUBJECT.* FROM VSUBJECT,Videolength " +
                "where VSUBJECT.SubjectCode = Videolength.SubjectCode and TchCode='" + userName + "' " ;
            connection.execute(strSql, function (err, result) {
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
    }


};

ReportModel.prototype.getSubjectByPeriod = function (periodCode, token, roleId, userName, callback) {
    var database = new Database();

    oracledb.outFormat = oracledb.OBJECT;

    if (roleId === 1) {
        oracledb.getConnection(database.oracleConfig(), function (err, connection) {
            if (err) {
                console.error(err.message);
                database.DoRelease(connection);
                callback(err, null);
            }

            connection.execute("Begin SP_GETUSER_FOR_DEAN(:userName,:curUserLevel); End;", {
                userName: userName,
                curUserLevel: {type: oracledb.CURSOR, dir: oracledb.BIND_OUT}
            }, function (err, result) {
                if (err) {
                    console.error(err.message);
                    database.DoRelease(connection);
                    callback(err, null);
                } else {
                    var obj = result.outBinds;
                    obj.curUserLevel.getRows(database.MaximumCursorRows(), function (err, curUserLevel) {
                            if (err) {
                                console.log(err);
                            }

                            var userData = {
                                users: curUserLevel
                            };


                            database.DoRelease(connection);
                            callback(err, curUserLevel);
                        }
                    );
                }
            });
        });
    } else if (roleId === 2) {
        oracledb.getConnection(database.oracleConfig(), function (err, connection) {
            if (err) {
                console.error(err.message);
                database.DoRelease(connection);
                callback(err, null);
            }

            var strSql = "SELECT distinct VSUBJECT.* FROM VSUBJECT,Videolength " +
                "where VSUBJECT.SubjectCode = Videolength.SubjectCode and TchCode='" + userName + "' " +
                "and VSUBJECT.PeriodCode like '%" + periodCode + "%'"
            connection.execute(strSql, function (err, result) {
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
    }


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

ReportModel.prototype.getTeacherBySubjectPeriod = function (subjectCode, periodCode, token, roleId, userName, callback) {
    var database = new Database();

    oracledb.outFormat = oracledb.OBJECT;

    if (roleId === 1) {
        oracledb.getConnection(database.oracleConfig(), function (err, connection) {
            if (err) {
                console.error(err.message);
                database.DoRelease(connection);
                callback(err, null);
            }

            connection.execute("SELECT * FROM VGETVDOLENGTHFORTEACHER " +
                "Where SubjectCode ='" + subjectCode + "'  " +
                "and PeriodCode like '%" + periodCode + "%'  ", function (err, result) {
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
    } else if (roleId === 2) {
        oracledb.getConnection(database.oracleConfig(), function (err, connection) {
            if (err) {
                console.error(err.message);
                database.DoRelease(connection);
                callback(err, null);
            }

            connection.execute("SELECT * FROM VGETVDOLENGTHFORTEACHER " +
                "Where SubjectCode ='" + subjectCode + "'  " +
                "and PeriodCode like '%" + periodCode + "%' and TCHCODE='" + userName + "'", function (err, result) {
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
    }

};


ReportModel.prototype.getTeacherBySubject = function (subjectCode, callback) {
    var database = new Database();

    oracledb.outFormat = oracledb.OBJECT;

    oracledb.getConnection(database.oracleConfig(), function (err, connection) {
        if (err) {
            console.error(err.message);
            database.DoRelease(connection);
            callback(err, null);
        }

        connection.execute("SELECT * FROM VGETVDOLENGTHFORTEACHER " +
            "Where SubjectCode ='" + subjectCode + "'  ", function (err, result) {
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

ReportModel.prototype.getUnitBySubjectTeacher = function (subjectCode, tchCode, callback) {
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
            " order by SubjectCode,UnitId", function (err, result) {
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

ReportModel.prototype.getTopicBySubjectTeacher = function (subjectCode, tchCode, unitId, callback) {
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
            "  order by unitId,topicno", function (err, result) {
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