/**
 * Created by chanupolphermpoon on 1/17/2017 AD.
 */

"use strict";
var oracledb = require("oracledb");
var Database = require("../../config/database");

oracledb.autoCommit = true;

function GraphModel() {
}

//--------------------------------------------------------------------------------
//
// Get section
//
//--------------------------------------------------------------------------------

GraphModel.prototype.getTeacher = function (roleId, userName, callback) {

    var database = new Database();
    oracledb.outFormat = oracledb.OBJECT;

    if (roleId === 1) { // Dean

        oracledb.getConnection(database.oracleConfig(), function (err, connection) {
            if (err) {
                console.error(err.message);
                database.DoRelease(connection);
                callback(err, null);
            }
            var strSql = 'Begin SP_GET_TCH_FOR_DEAN(:userName,:cursorTeacher); End;';

            connection.execute(strSql, {
                userName: userName,
                cursorTeacher: {type: oracledb.CURSOR, dir: oracledb.BIND_OUT}
            }, function (err, result) {
                if (err) {
                    console.error(err.message);
                    database.DoRelease(connection);
                    callback(err, null);
                } else {

                    var obj = result.outBinds;
                    database.FetchCursorRow(obj.cursorTeacher, [], function (err, cursorTeacher) {
                        if (err) {
                            console.error(err);
                        }
                        var teachers = {
                            tch: cursorTeacher
                        };
                        database.DoRelease(connection);
                        callback(err, teachers);
                    });
                }
            });
        });

    } else if (roleId === 2) { // Teacher

        oracledb.getConnection(database.oracleConfig(), function (err, connection) {
            if (err) {
                console.error(err.message);
                database.DoRelease(connection);
                callback(err, null);
            }
            var strSql = "SELECT DISTINCT VSUBJECT.TCHCODE, TCHNAME FROM vSubject WHERE TCHCODE ='" + userName + "'";
            connection.execute(strSql,
                [],
                {maxRows: 2000},
                function (err, result) {
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

    } else if (roleId === 5) { // admin role

        oracledb.getConnection(database.oracleConfig(), function (err, connection) {
            if (err) {
                console.error(err.message);
                database.DoRelease(connection);
                callback(err, null);
            }
            var strSql = "SELECT DISTINCT VSUBJECT.TCHCODE, TCHNAME FROM vSubject WHERE TCHCODE IS NOT NULL AND TCHNAME IS NOT NULL  ";
            connection.execute(strSql,
                [],
                {maxRows: 2000},
                function (err, result) {
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


    } else if (roleId === 3) {  //associate dean (fix the filter user in SPROC)

        oracledb.getConnection(database.oracleConfig(), function (err, connection) {
            if (err) {
                console.error(err.message);
                database.DoRelease(connection);
                callback(err, null);
            }

            var strSql = 'Begin SP_GET_TCH_FOR_ASSOCIATE_DEAN(:userName,:cursorTeacher); End;';

            connection.execute(strSql, {
                userName: userName,
                cursorTeacher: {type: oracledb.CURSOR, dir: oracledb.BIND_OUT}
            }, function (err, result) {
                if (err) {
                    console.error(err.message);
                    database.DoRelease(connection);
                    callback(err, null);
                } else {


                    var obj = result.outBinds;
                    database.FetchCursorRow(obj.cursorTeacher, [], function (err, cursorTeacher) {
                        if (err) {
                            console.error(err);
                        }
                        var teachers = {
                            tch: cursorTeacher
                        };
                        database.DoRelease(connection);
                        callback(err, teachers);
                    });
                }
            });
        });

    }

};

module.exports = GraphModel;
