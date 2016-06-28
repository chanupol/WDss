/**
 * Created by chanupolphermpoon on 6/24/2016 AD.
 */

"use strict";
var oracledb = require("oracledb");
var Database = require("../../config/database");

oracledb.autoCommit = true;

function AnotherTeacherFacultyModel() {

}

//--------------------------------------------------------------------------------
//
// Get section
//
//--------------------------------------------------------------------------------

AnotherTeacherFacultyModel.prototype.getAnotherTeacherFacultyList = function (callback) {

    var database = new Database();

    oracledb.outFormat = oracledb.OBJECT;

    oracledb.getConnection(database.oracleConfig(), function (err, connection) {
        if (err) {
            console.error(err.message);
            database.DoRelease(connection);
            callback(err, null);
        } else {
            var strSql = "begin SP_GET_ANOTCHFAC ( :cursorAnotherTeacherFaculty ); end;";

            connection.execute(strSql,
                {
                    cursorAnotherTeacherFaculty: {type: oracledb.CURSOR, dir: oracledb.BIND_OUT}
                }
                , function (err, result) {
                    if (err) {
                        console.error(err.message);
                        database.DoRelease(connection);
                        callback(err, null);
                    } else {
                        var obj = result.outBinds;
                        database.FetchRow(obj.cursorAnotherTeacherFaculty, [], function (err, cursorAnotherTeacherFaculty) {
                            if (err) {
                                console.error(err);
                            }
                            database.DoRelease(connection);
                            callback(err, cursorAnotherTeacherFaculty);
                        })
                    }
                });
        }


    });
};

//--------------------------------------------------------------------------------
//
// Insert section
//
//--------------------------------------------------------------------------------

AnotherTeacherFacultyModel.prototype.createNewAnotherTeacherFacultyList = function (objAnotherTchFaculty, callback) {
    var database = new Database();
    oracledb.outFormat = oracledb.OBJECT;
    oracledb.getConnection(database.oracleConfig(), function (err, connection) {
        if (err) {
            console.error(err.message);
            database.DoRelease(connection);
            callback(err, null);
        } else {

            var strSql = "begin SP_INSERT_ANOTCHFAC(:tchCode,:subjectCode,:facultyName); end;";

            connection.execute(strSql,
                {
                    tchCode: objAnotherTchFaculty.tchCode,
                    subjectCode: objAnotherTchFaculty.subjectCode,
                    facultyName: objAnotherTchFaculty.facultyName
                }, function (err, result) {
                    if (err) {
                        console.error(err.message);
                        database.DoRelease(connection);
                        callback(err, null);
                    } else {

                        database.DoRelease(connection);
                        console.dir(result);
                        callback(null, result);
                    }
                });
        }
    });

};


//--------------------------------------------------------------------------------
//
// Update section
//
//--------------------------------------------------------------------------------

AnotherTeacherFacultyModel.prototype.updateStatusAnotherTeacherFacultyList = function (objAnotherTchFaculty, callback) {
    var database = new Database();
    oracledb.outFormat = oracledb.OBJECT;
    oracledb.getConnection(database.oracleConfig(), function (err, connection) {
        if (err) {
            console.error(err.message);
            database.DoRelease(connection);
            callback(err, null);
        } else {

            var strSql = "begin SP_UPDATE_STAT_ANOTCHFAC(:tchCode,:subjectCode,:facultyName,:status); end;";

            connection.execute(strSql,
                {
                    tchCode: objAnotherTchFaculty.tchCode,
                    subjectCode: objAnotherTchFaculty.subjectCode,
                    facultyName: objAnotherTchFaculty.facultyName,
                    status: objAnotherTchFaculty.status
                }, function (err, result) {
                    if (err) {
                        console.error(err.message);
                        database.DoRelease(connection);
                        callback(err, null);
                    } else {

                        database.DoRelease(connection);
                        console.dir(result);
                        callback(null, result);
                    }
                });
        }
    });

};


module.exports = AnotherTeacherFacultyModel;

