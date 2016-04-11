/**
 * Created by chanupolphermpoon on 4/4/2016 AD.
 */
'use strict';
var async = require('async');
var oracledb = require("oracledb");
var Database = require("../../config/database");
var http = require('http');
var Nipple = require('nipple');

function TeacherModel() {

}

TeacherModel.prototype.GetTeacherFromCyberU = function (callback) {

    var importDate = new Date(); //new Date(clientImportDate);

    var url = 'http://western-cyberu.net:81/api/cyberuteacher/teachers/list';

    http.get(url, function (res) {
        var body = '';

        res.on('data', function (chunk) {
            //console.log(chunk);
            body += chunk;
        });

        res.on('end', function () {
            var teacherResponse = JSON.parse(body);

            var database = new Database();
            oracledb.outFormat = oracledb.OBJECT;

            /*var doconnect = function (cb) {
                oracledb.getConnection(database.oracleConfig(), cb);
            };

            var dorelease = function (conn) {
                conn.release(function (err) {
                    if (err)
                        console.error(err.message);
                });
            };*/

            oracledb.getConnection(database.oracleConfig(), function (err, connection) {
                if (err) {
                    console.error(err.message);
                    database.DoRelease(connection);
                    callback(err, null);
                } else {
                    var strInsertTeacherSPROC = "Begin SP_INSERT_CYBERUTEACHER(" +
                        ":tchCode," +
                        ":tchPName," +
                        ":tchFName," +
                        ":tchLName," +
                        ":tchTel," +
                        ":tchEmail," +
                        ":tchPicture," +
                        ":tchSocialMedia," +
                        ":tchIsSpecial," +
                        ":tchIsActive," +
                        ":statusCode," +
                        ":createDate," +
                        ":facName," +
                        ":facNameEng," +
                        //":updateDate" +
                        ":importedDate); End;";
                    for (var i = 0; i < teacherResponse.length; i++) {

                        connection.execute(strInsertTeacherSPROC,
                            {

                                tchCode: teacherResponse[i].tchCode,
                                tchPName: teacherResponse[i].tchPName,
                                tchFName: teacherResponse[i].tchFName,
                                tchLName: teacherResponse[i].tchLName,
                                tchTel: teacherResponse[i].tchTel,
                                tchEmail: teacherResponse[i].tchEmail,
                                tchPicture: teacherResponse[i].tchPicture,
                                tchSocialMedia: teacherResponse[i].tchSocialMedia,
                                tchIsSpecial: (teacherResponse[i].tchIsSpecial) ? 'Y' : 'N',
                                tchIsActive: teacherResponse[i].tchIsActive ? 'Y' : 'N',
                                statusCode: teacherResponse[i].statusCode,
                                createDate: new Date(teacherResponse[i].createDate),
                                facName:teacherResponse[i].facName,
                                facNameEng:teacherResponse[i].facNameEng,
                                //updateDate: (teacherResponse[i].updateDate != null) ? new Date(teacherResponse[i].updateDate) : null,
                                importedDate: importDate

                            },
                            {autoCommit: true},
                            function (err, result) {
                                if (err) {
                                    console.error(err.message);
                                    //database.DoRelease(connection);
                                    //return callback(err, null);
                                    //dataResult = err;
                                } else {
                                    //dataResult = result;
                                    //database.DoRelease(connection);
                                    //return callback(null, result);
                                }
                            });
                    }
                    callback(err, connection);

                }
            });

            //console.log("Got a response: ", teacherResponse);
            //for (var i=0;i<teacherResponse.length;i++){
            /*ImportCyberUTeacherData(teacherResponse, importDate, function (err, response) {
             if (err) {
             callback(err, null);
             } else {
             callback(null, response);
             }
             });*/
            //}

        });
    }).on('error', function (e) {
        console.log("Got an error: ", e);
        callback(err, null);
    });


};


/*function importTeacher(teacherData, importDate) {
    //var teacherData = [{}];
    // Query on a second connection
    var strInsertTeacherSPROC = "Begin SP_INSERT_CYBERUTEACHER(" +
        ":tchCode," +
        ":tchPName," +
        ":tchFName," +
        ":tchLName," +
        ":importedDate); End;";


    var insertTeacherData = function (conn, cb) {
        for (var x = 0; x < teacherData.length; x++) {
            conn.execute(
                strInsertTeacherSPROC,
                {
                    tchCode: teacherData[x].tchCode,
                    tchPName: teacherData[x].tchPName,
                    tchFName: teacherData[x].tchFName,
                    tchLName: teacherData[x].tchLName,

                    importedDate: importDate
                },  // Bind values
                {autoCommit: true},  // Override the default non-autocommit behavior
                function (err, result) {
                    if (err) {
                        console.log(err.message);
                        return cb(err, conn);
                    } else {
                        console.log("Rows inserted: ");  // 1
                        /!*return cb(null, conn);*!/

                    }
                });
        }
    };
    return insertTeacherData;
}


function ImportCyberUTeacherData(teacherData, importDate, callback) {

    console.log(teacherData.length);
    //var importDate = new Date();
    //console.log(vdoLengthData[0].degreeCode);

    var database = new Database();
    oracledb.outFormat = oracledb.OBJECT;

    var doconnect = function (cb) {
        oracledb.getConnection(database.oracleConfig(), cb);
    };

    var dorelease = function (conn) {
        conn.release(function (err) {
            if (err)
                console.error(err.message);
        });
    };

    //
    // todo: Begin import Teacher Data
    var insertTeacher = importTeacher(teacherData, importDate);

    return callback(runAsyncWaterFall(doconnect, insertTeacher, dorelease));

};


function runAsyncWaterFall(doconnect, insertVDOData, dorelease) {
    async.waterfall(
        [
            doconnect,
            insertVDOData,
            /!*  insertPeriod,
             insertTeacher*!/

        ],
        function (err, conn) {
            if (err) {
                console.error("In waterfall error cb: ==>", err, "<==");
            }
            if (conn)
                dorelease(conn);
        });
}*/


//--------------------------------------------------------------------------------
//
// Get section
//
//--------------------------------------------------------------------------------

module.exports = TeacherModel;