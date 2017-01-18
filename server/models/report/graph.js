/**
 * Created by chanupolphermpoon on 1/17/2017 AD.
 */

"use strict";
var oracledb = require("oracledb");
var mssql = require('mssql');
var Database = require("../../config/database");
var async = require('async');

oracledb.autoCommit = true;

function GraphModel() {
}

//--------------------------------------------------------------------------------
//
// Get section (Oracle WTUDSS Database)
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

GraphModel.prototype.getSubjectInTeacherWithPeriod = function (criteria, callback) {

    var database = new Database();
    oracledb.outFormat = oracledb.OBJECT;

    oracledb.getConnection(database.oracleConfig(), function (err, connection) {
        if (err) {
            console.error(err.message);
            database.doRelease(connection);
            callback(err, null);
        } else {

            database.addParameter("tchCode", criteria.tchCode);
            database.addParameter("periodCode", criteria.periodCode);
            database.addParameter("cursorSubjects", {type: oracledb.CURSOR, dir: oracledb.BIND_OUT});

            connection.execute(database.getProcedureCommand("SP_GET_SUBJECTS_IN_TCH_PERIOD"), database.getParameter(), function (err, result) {
                if (err) {
                    console.error(err.message);
                    database.DoRelease(connection);
                    callback(err, null);
                } else {
                    var obj = result.outBinds;

                    database.FetchRow(obj.cursorSubjects, [], function (err, cursorSubjects) {
                        if (err) {
                            console.error(err);
                        }

                        database.DoRelease(connection);
                        callback(err, cursorSubjects);
                    })
                }
            });
        }
    });


};


//--------------------------------------------------------------------------------
//
// Get section (MSSQL CyberU  Database)
//
//--------------------------------------------------------------------------------

GraphModel.prototype.getGraphDataInClassPercentage = function (criteria, callback) {


    var database = new Database();

    // connect to your database
    mssql.connect(database.mssqlConfig(), function (err) {

        var subjectCodeCondition = " ";

        if (err) console.log(err);

        var request = new mssql.Request();

        request.input('tchCode', mssql.NVarChar(10), criteria.tchCode);
        request.input('periodCode', mssql.NVarChar(5), criteria.periodCode);

        if (criteria.subjectCode != 0) {
            request.input('subjectCode', mssql.NVarChar(10), criteria.subjectCode);
            subjectCodeCondition = "AND sed.SubjectCode = @subjectCode  ";
        }


        var declareTableVariable = "DECLARE @DataForGraph TABLE ( " +
            "Teacher NVARCHAR(255) NOT NULL ," +
            "StuCode NVARCHAR(10) NOT NULL ," +
            "SubjectCode NVARCHAR(10) NOT NULL ," +
            "tmpSubjectUnitPre NVARCHAR(20) NOT NULL ," +
            "UnitID INT NOT NULL ," +
            "UnitName NVARCHAR(255) NOT NULL ," +
            "LearnPCT DECIMAL NOT NULL ," +
            "PeriodCode NVARCHAR(4) NOT NULL);";


        var insertIntoTbVarDataStatement = "INSERT  INTO @DataForGraph " +
            "SELECT  DISTINCT " +
            "( sed.TchCode + ' ' + tch.TchPName + ' ' + tch.TchFName + ' ' + tch.TchLName ) Teacher ," +
            "sed.StuCode ,sed.SubjectCode ," +
            "( sed.SubjectCode + CAST(l.UnitID AS NVARCHAR(10)) + SUBSTRING(sed.EnrollNo, 0, CHARINDEX('-', sed.EnrollNo)) ) tmpSubjectUnitPre ," +
            "l.UnitID ,vsu.UnitName ,l.LearnPCT ,SUBSTRING(sed.EnrollNo, 0, CHARINDEX('-', sed.EnrollNo)) AS PeriodCode " +
            "FROM    wtuuser.tbStuUnitLearn l " +
            "JOIN wtuuser.tbStuEnrollDetail sed ON l.StuEnrollDetail_Idx = sed.Idx " +
            "AND sed.TchCode = @tchCode " +
            subjectCodeCondition +
            "JOIN wtuuser.tbStuUnitVdoTopic suvt ON l.Idx = suvt.StuUnitLearn_Idx " +
            "JOIN wtuuser.tbVdoSet_Unit vsu ON vsu.Idx = suvt.VdoSet_Unit_Idx " +
            "JOIN wtuuser.tbTeacher tch ON tch.Idx = sed.Teacher_Idx " +
            "WHERE   SUBSTRING(sed.EnrollNo, 0, CHARINDEX('-', sed.EnrollNo)) = @periodCode " +
            "ORDER BY SUBSTRING(sed.EnrollNo, 0, CHARINDEX('-', sed.EnrollNo)) ," +
            "sed.StuCode ,sed.SubjectCode ,l.UnitID; ";


        var getDataStatement = "SELECT  countZeroPercent = " +
            "( SELECT COUNT(g.StuCode) " +
            "    FROM   @DataForGraph g " +
            "    WHERE  ( g.LearnPCT < 0.0 AND g.tmpSubjectUnitPre = gg.tmpSubjectUnitPre ) " +
            "), " +
            "countFiftyPercent = " +
            "( SELECT    COUNT(g.StuCode) " +
            "   FROM      @DataForGraph g " +
            "   WHERE     ( ( g.LearnPCT > 1 AND g.LearnPCT <= 50.0 ) AND ( g.tmpSubjectUnitPre = gg.tmpSubjectUnitPre ) ) " +
            "), " +
            "countEightyPercent = " +
            "( SELECT    COUNT(g.StuCode) " +
            "   FROM      @DataForGraph g " +
            "   WHERE     ( ( g.LearnPCT > 50.0 AND g.LearnPCT <= 80.0 )  AND ( g.tmpSubjectUnitPre = gg.tmpSubjectUnitPre ) ) " +
            "), " +
            "count100Percent = " +
            "( SELECT    COUNT(g.StuCode) " +
            "   FROM      @DataForGraph g " +
            "   WHERE     ( ( g.LearnPCT > 80.0 AND g.LearnPCT <= 100.0 ) AND ( g.tmpSubjectUnitPre = gg.tmpSubjectUnitPre ) ) " +
            "), " +
            "gg.Teacher ,gg.SubjectCode , gg.UnitID , gg.UnitName , gg.tmpSubjectUnitPre " +
            "   FROM    @DataForGraph gg " +
            "   GROUP BY gg.SubjectCode , gg.UnitID , gg.UnitName ,gg.tmpSubjectUnitPre ,gg.Teacher " +
            "order by gg.Teacher , " +
            "gg.SubjectCode , " +
            "gg.UnitID";


        request.query(declareTableVariable + insertIntoTbVarDataStatement + getDataStatement).then(function (result) {

            callback(null, result);

        }).catch(function (err) {
            console.log(err.message);
            //console.log(result);
            callback(err, null);
        });
    });


};


GraphModel.prototype.getGraphDataPreTestPercentage = function (criteria, callback) {

};


GraphModel.prototype.getGraphDataPostTestPercentage = function (criteria, callback) {

};


module.exports = GraphModel;
