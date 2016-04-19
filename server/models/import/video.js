/**
 * Created by chanupolphermpoon on 3/28/2016 AD.
 */
'use strict';
var async = require('async');
var oracledb = require("oracledb");
var Database = require("../../config/database");
var http = require('http');
var urlPath = "http://localhost:8009/api/get/cyberu/videodata";
var Nipple = require('nipple');
function VideoLengthModel() {

}


VideoLengthModel.prototype.GetVDOFromCyberU = function (clientImportDate, callback) {
   
    var importDate = new Date(); //new Date(clientImportDate);
    var VdoData = [{}];

    var url = 'http://western-cyberu.net:81/api/report/courseoutlineall/courseoutlinerptlist/';

    http.get(url, function (res) {
        var body = '';

        res.on('data', function (chunk) {
            //console.log(chunk);
            body += chunk;
        });

        res.on('end', function () {
            var vdoResponse = JSON.parse(body);
            //console.log("Got a response: ", vdoResponse);
            //for (var i=0;i<vdoResponse.length;i++){
            ImportCyberUVdoData(vdoResponse, importDate, function (err, response) {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, response);
                }
            });
            //}

        });
    }).on('error', function (e) {
        console.log("Got an error: ", e);
        callback(err, null);
    });
    

};

function runAsyncWaterFall(doconnect, insertVDOData, dorelease) {
    async.waterfall(
        [
            doconnect,
            insertVDOData,
            /*  insertPeriod,
             insertTeacher*/

        ],
        function (err, conn) {
            if (err) {
                console.error("In waterfall error cb: ==>", err, "<==");
            }
            if (conn)
                dorelease(conn);
        });
}

function importTeacher(database, importDate) {
    var teacherData = [{}];
    // Query on a second connection
    var strInsertTeacherSPROC = "Begin SP_INSERT_CYBERUTEACHER(" +
        ":tchCode," +
        ":tchPName," +
        ":tchFName," +
        ":tchLastName," +
        ":tchTel," +
        ":tchEmail," +
        ":tchPicture," +
        ":tchSocialMedia," +
        ":tchIsSpecial," +
        ":tchIsActive," +
        ":tchStatusCode," +
        ":tchCreateDate," +
        ":tchUpdateDate); End;";
    Nipple.get('http://western-cyberu.net:81/api/cyberuteacher/teachers/list', function (err, res, payload) {
        teacherData = JSON.parse(payload);
    });

    var insertTeacherData = function (conn, cb) {
        oracledb.getConnection(database.oracleConfig(),
            function (err, connection3) {
                if (err) {
                    console.error(err.message);
                    return cb(err, conn);
                }

                for (var x = 0; x < teacherData.length; x++) {
                    connection3.execute(
                        strInsertTeacherSPROC,
                        {
                            tchCode: teacherData[x].tchCode,
                            tchPName: teacherData[x].tchPName,
                            tchFName: teacherData[x].tchFName,
                            tchLastName: teacherData[x].tchLastName,
                            tchTel: teacherData[x].tchTel,
                            tchEmail: teacherData[x].tchEmail,
                            tchPicture: teacherData[x].tchPicture,
                            tchSocialMedia: teacherData[x].tchSocialMedia,
                            tchIsSpecial: (teacherData[x].tchIsSpecial) ? "Y" : "N",
                            tchIsActive: (teacherData[x].tchIsActive) ? "Y" : "N",
                            tchStatusCode: teacherData[x].tchStatusCode,
                            tchCreateDate: teacherData[x].tchCreateDate,
                            tchUpdateDate: teacherData[x].tchUpdateDate
                            //importedDate: importDate
                        },  // Bind values
                        {autoCommit: true},  // Override the default non-autocommit behavior
                        function (err, result) {
                            if (err) {
                                console.error(err.message);
                                return cb(err, conn);
                            }

                            // This will only show 'Chris' because inserting 'Alison' is not commited by default.
                            // Uncomment the autoCommit option above and you will see both rows
                            console.log(result.rows);

                            connection3.release(
                                function (err) {
                                    if (err) {
                                        console.error(err.message);
                                        //return cb(err, conn);
                                    } else {
                                        //return cb(null, conn);
                                    }

                                });
                        });
                }
                return cb(null, conn);
            });
    };
    return insertTeacherData;
}

function importPeriod(database, importDate) {
    var periodData = [{}];
    // Query on a second connection
    var strInsertPeriodSPROC = "Begin SP_INSERT_CYBERUPERIODCONFIG(" +
        ":currentLearnPeriodCode," +
        ":importedDate); End;";
    Nipple.get('http://western-cyberu.net:81/api/cyberuperiod/config/current/list', function (err, res, payload) {
        periodData = JSON.parse(payload);
    });

    var insertPeriod = function (conn, cb) {
        oracledb.getConnection(database.oracleConfig(),
            function (err, connection2) {
                if (err) {
                    console.error(err.message);
                    return cb(err, conn);
                }

                for (var x = 0; x < periodData.length; x++) {
                    connection2.execute(
                        strInsertPeriodSPROC,
                        {
                            currentLearnPeriodCode: periodData[x].learnPeriodCode,
                            importedDate: importDate
                        },  // Bind values
                        {autoCommit: true},  // Override the default non-autocommit behavior
                        function (err, result) {
                            if (err) {
                                console.error(err.message);
                                return cb(err, conn);
                            }

                            // This will only show 'Chris' because inserting 'Alison' is not commited by default.
                            // Uncomment the autoCommit option above and you will see both rows
                            console.log(result.rows);

                            connection2.release(
                                function (err) {
                                    if (err) {
                                        console.error(err.message);
                                        return cb(err, conn);
                                    } else {
                                        // return cb(null, conn);
                                    }

                                });
                        });
                }
                return cb(null, conn);

            });
    };
    return insertPeriod;
}

function importVDO(vdoLengthData, importDate) {
    if (vdoLengthData != null && vdoLengthData != undefined) {
        var strInsertVDOSproc = "BEGIN SP_INSERT_VIDEOLENGTH(:degreeCode," +
            ":degreeName," +
            ":subjectGroupCode," +
            ":subjectGroupName," +
            ":periodCode," +
            ":subjectCode," +
            ":subjectName," +
            ":subjectNameEng," +
            ":subjectDesc," +
            ":creditDesc," +
            ":creditCalGrade," +
            ":creditCalPrice," +
            ":tchCode," +
            ":tchName," +
            ":isTeacherSpecial," +
            ":isTeacherActive," +
            ":totalPoint," +
            ":rtmpStreamIntro," +
            ":setCode," +
            ":setDesc," +
            ":vdoSetTotalVdoLength," +
            ":unitId," +
            ":unitName," +
            ":vdoUnitTotalVdoLength," +
            ":topicNo," +
            ":topicName," +
            ":totalTopicVdoLengthInMinute," +
            ":rtmpStream," +
            ":importDate," +
            ":tchCodeForUnit," +
            ":tchForCourseOutlineUnit," +
            ":tchForTapeUnit," +
            ":tchCodeForTopic," +
            ":tchForCourseOutlineTopic," +
            ":tchForTapeTopic);End;";

        var insertVDOData = function (conn, cb) {
            for (var i = 0; i < vdoLengthData.length; i++) {
                conn.execute(strInsertVDOSproc,
                    {
                        degreeCode: vdoLengthData[i].degreeCode,
                        degreeName: vdoLengthData[i].degreeName,
                        subjectGroupCode: vdoLengthData[i].subjectGroupCode,
                        subjectGroupName: vdoLengthData[i].subjectGroupName,
                        periodCode: vdoLengthData[i].periodCode,
                        subjectCode: vdoLengthData[i].subjectCode,
                        subjectName: vdoLengthData[i].subjectName,
                        subjectNameEng: vdoLengthData[i].subjectNameEng,
                        subjectDesc: vdoLengthData[i].subjectDesc,
                        creditDesc: vdoLengthData[i].creditDesc,
                        creditCalGrade: vdoLengthData[i].creditCalGrade,
                        creditCalPrice: vdoLengthData[i].creditCalPrice,
                        tchCode: vdoLengthData[i].tchCode,
                        tchName: vdoLengthData[i].tchName,
                        isTeacherSpecial: (vdoLengthData[i].isTeacherSpecial) ? 'Y' : 'N',
                        isTeacherActive: (vdoLengthData[i].isTeacherActive) ? 'Y' : 'N',
                        totalPoint: vdoLengthData[i].totalPoint,
                        rtmpStreamIntro: vdoLengthData[i].rtmpStreamIntro,
                        setCode: vdoLengthData[i].setCode,
                        setDesc: vdoLengthData[i].setDesc,
                        vdoSetTotalVdoLength: vdoLengthData[i].vdoSetTotalVdoLength,
                        unitId: vdoLengthData[i].unitId,
                        unitName: vdoLengthData[i].unitName,
                        vdoUnitTotalVdoLength: vdoLengthData[i].vdoUnitTotalVdoLength,
                        topicNo: vdoLengthData[i].topicNo,
                        topicName: vdoLengthData[i].topicName,
                        totalTopicVdoLengthInMinute: vdoLengthData[i].totalTopicVdoLengthInMinute,
                        rtmpStream: vdoLengthData[i].rtmpStream,
                        importDate: importDate,
                        tchCodeForUnit:vdoLengthData[i].tchCodeForUnit,
                        tchForCourseOutlineUnit:vdoLengthData[i].tchForCourseOutlineUnit,
                        tchForTapeUnit:vdoLengthData[i].tchForTapeUnit,
                        tchCodeForTopic:vdoLengthData[i].tchCodeForTopic,
                        tchForCourseOutlineTopic:vdoLengthData[i].tchForCourseOutlineTopic,
                        tchForTapeTopic:vdoLengthData[i].tchForTapeTopic

                    },  // Bind values
                    {autoCommit: true},  // Override the default non-autocommit behavior
                    function (err, result) {
                        if (err) {
                            console.log(err.message);
                            return cb(err, conn);
                        } else {
                            console.log("Rows inserted: ");  // 1
                            /*return cb(null, conn);*/

                        }
                    });
            }
            //return cb(null, conn);
        };
    }
    return insertVDOData;
}

function ImportCyberUVdoData(vdoLengthData, importDate, callback) {
    //Nipple.get('http://western-cyberu.net:81/api/report/courseoutlineall/courseoutlinerptlist/', function (err, res, payload) {
    //var vdoLengthData = JSON.parse(payload);
    console.log(vdoLengthData.length);
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
    // todo: Begin import VDO Data
    var insertVDOData = importVDO(vdoLengthData, importDate);


    /* //
     // todo: Begin import Period Config Data
     var insertPeriod = importPeriod(database, importDate);

     //
     // todo: Begin import Teacher Data
     var insertTeacher = importTeacher(database, importDate);*/

    return callback(runAsyncWaterFall(doconnect, insertVDOData, dorelease));


    //});

    /*for (var x = 0; x < vdoLengthData.length; x++) {
     console.log(vdoLengthData[x].degreeName);
     }*/

    /*oracledb.getConnection(database.oracleConfig(), function (err, connection) {
     if (err) {
     console.error(err.message);
     database.DoRelease(connection);
     callback(err, null);
     } else {
     var strSproc = "BEGIN SP_INSERT_VIDEOLENGTH(:degreeCode," +
     ":degreeName," +
     ":subjectGroupCode," +
     ":subjectGroupName," +
     ":periodCode," +
     ":subjectCode," +
     ":subjectName," +
     ":subjectNameEng," +
     ":subjectDesc," +
     ":creditDesc," +
     ":creditCalGrade," +
     ":creditCalPrice," +
     ":tchCode," +
     ":tchName," +
     ":isTeacherSpecial," +
     ":isTeacherActive," +
     ":totalPoint," +
     ":rtmpStreamIntro," +
     ":setCode," +
     ":setDesc," +
     ":vdoSetTotalVdoLength," +
     ":unitId," +
     ":unitName," +
     ":vdoUnitTotalVdoLength," +
     ":topicNo," +
     ":topicName," +
     ":totalTopicVdoLengthInMinute," +
     ":rtmpStream," +
     ":importDate);End;";

     var dataResult = [{}];
     for (var i = 0; i < vdoLengthData.length; i++) {
     console.log('Row = ' + vdoLengthData.degreeCode);
     connection.execute(strSproc,
     {
     degreeCode: vdoLengthData[i].degreeCode,
     degreeName: vdoLengthData[i].degreeName,
     subjectGroupCode: vdoLengthData[i].subjectGroupCode,
     subjectGroupName: vdoLengthData[i].subjectGroupName,
     periodCode: vdoLengthData[i].periodCode,
     subjectCode: vdoLengthData[i].subjectCode,
     subjectName: vdoLengthData[i].subjectName,
     subjectNameEng: vdoLengthData[i].subjectNameEng,
     subjectDesc: vdoLengthData[i].subjectDesc,
     creditDesc: vdoLengthData[i].creditDesc,
     creditCalGrade: vdoLengthData[i].creditCalGrade,
     creditCalPrice: vdoLengthData[i].creditCalPrice,
     tchCode: vdoLengthData[i].tchCode,
     tchName: vdoLengthData[i].tchName,
     isTeacherSpecial: (vdoLengthData[i].isTeacherSpecial) ? 'Y' : 'N',
     isTeacherActive: (vdoLengthData[i].isTeacherActive) ? 'Y' : 'N',
     totalPoint: vdoLengthData[i].totalPoint,
     rtmpStreamIntro: vdoLengthData[i].rtmpStreamIntro,
     setCode: vdoLengthData[i].setCode,
     setDesc: vdoLengthData[i].setDesc,
     vdoSetTotalVdoLength: vdoLengthData[i].vdoSetTotalVdoLength,
     unitId: vdoLengthData[i].unitId,
     unitName: vdoLengthData[i].unitName,
     vdoUnitTotalVdoLength: vdoLengthData[i].vdoUnitTotalVdoLength,
     topicNo: vdoLengthData[i].topicNo,
     topicName: vdoLengthData[i].topicName,
     totalTopicVdoLengthInMinute: vdoLengthData[i].totalTopicVdoLengthInMinute,
     rtmpStream: vdoLengthData[i].rtmpStream,
     importDate: importDate

     },
     function (err, result) {
     if (err) {
     console.error(err.message);
     //database.DoRelease(connection);
     return callback(err, null);
     //dataResult = err;
     } else {
     //dataResult = result;
     //database.DoRelease(connection);
     return callback(null, result);
     }
     });
     }
     //callback(dataResult, dataResult);

     }
     });*/
};

VideoLengthModel.prototype.ImportVDOFromCyberU = function (vdoLengthData, callback) {

    //console.log('vdoLengthData Length = ' + vdoLengthData.length);


    var database = new Database();


    oracledb.getConnection(database.oracleConfig(), function (err, connection) {
        if (err) {
            console.error(err.message);
            database.DoRelease(connection);
            callback(err, null);
        } else {


            var strSproc = "BEGIN SP_INSERT_VIDEOLENGTH(:degreeCode," +
                ":degreeName," +
                ":subjectGroupCode," +
                ":subjectGroupName," +
                ":periodCode," +
                ":subjectCode," +
                ":subjectName," +
                ":subjectNameEng," +
                ":subjectDesc," +
                ":creditDesc," +
                ":creditCalGrade," +
                ":creditCalPrice," +
                ":tchCode," +
                ":tchName," +
                ":isTeacherSpecial," +
                ":isTeacherActive," +
                ":totalPoint," +
                ":rtmpStreamIntro," +
                ":setCode," +
                ":setDesc," +
                ":vdoSetTotalVdoLength," +
                ":unitId," +
                ":unitName," +
                ":vdoUnitTotalVdoLength," +
                ":topicNo," +
                ":topicName," +
                ":totalTopicVdoLengthInMinute," +
                ":rtmpStream);End;";

            connection.execute(strSproc,
                {
                    degreeCode: vdoLengthData.payload.degreeCode,
                    degreeName: vdoLengthData.payload.degreeName,
                    subjectGroupCode: vdoLengthData.payload.subjectGroupCode,
                    subjectGroupName: vdoLengthData.payload.subjectGroupName,
                    periodCode: vdoLengthData.payload.periodCode,
                    subjectCode: vdoLengthData.payload.subjectCode,
                    subjectName: vdoLengthData.payload.subjectName,
                    subjectNameEng: vdoLengthData.payload.subjectNameEng,
                    subjectDesc: vdoLengthData.payload.subjectDesc,
                    creditDesc: vdoLengthData.payload.creditDesc,
                    creditCalGrade: vdoLengthData.payload.creditCalGrade,
                    creditCalPrice: vdoLengthData.payload.creditCalPrice,
                    tchCode: vdoLengthData.payload.tchCode,
                    tchName: vdoLengthData.payload.tchName,
                    isTeacherSpecial: (vdoLengthData.payload.isTeacherSpecial) ? 'Y' : 'N',
                    isTeacherActive: (vdoLengthData.payload.isTeacherActive) ? 'Y' : 'N',
                    totalPoint: vdoLengthData.payload.totalPoint,
                    rtmpStreamIntro: vdoLengthData.payload.rtmpStreamIntro,
                    setCode: vdoLengthData.payload.setCode,
                    setDesc: vdoLengthData.payload.setDesc,
                    vdoSetTotalVdoLength: vdoLengthData.payload.vdoSetTotalVdoLength,
                    unitId: vdoLengthData.payload.unitId,
                    unitName: vdoLengthData.payload.unitName,
                    vdoUnitTotalVdoLength: vdoLengthData.payload.vdoUnitTotalVdoLength,
                    topicNo: vdoLengthData.payload.topicNo,
                    topicName: vdoLengthData.payload.topicName,
                    totalTopicVdoLengthInMinute: vdoLengthData.payload.totalTopicVdoLengthInMinute,
                    rtmpStream: vdoLengthData.payload.rtmpStream,
                    importDate: new Date(vdoLengthData.payload.importDate)
                },
                function (err, result) {
                    if (err) {
                        console.error(err.message);
                        database.DoRelease(connection);
                        callback(err, null);
                    } else {
                        database.DoRelease(connection);
                        callback(null, null);
                    }
                });
        }
    });

};


//--------------------------------------------------------------------------------
//
// Get section
//
//--------------------------------------------------------------------------------
VideoLengthModel.prototype.getVdoFromImportDateAndCurrentPeriod = function (callback) {
    var database = new Database();

    oracledb.outFormat = oracledb.OBJECT;

    oracledb.getConnection(database.oracleConfig(), function (err, connection) {
        if (err) {
            console.error(err.message);
            database.DoRelease(connection);
            callback(err, null);
        }

        connection.execute("SELECT * FROM VPORT", function (err, result) {
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


module.exports = VideoLengthModel;