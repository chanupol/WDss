/**
 * Created by chanupolphermpoon on 3/28/2016 AD.
 */
"use strict";
var oracledb = require("oracledb");
var Database = require("../../config/database");

function SubjectGroupModel() {
    
}

SubjectGroupModel.prototype.CreateNewSubjectGroupModel = function (subjectGroup, callback) {
    
    var database =new Database();

    oracledb.getConnection(database.oracleConfig(), function (err, connection) {
        if (err) {
            console.error(err.message);
            database.DoRelease(connection);
            callback(err, null);
        } else {
            connection.execute("BEGIN SP_INSERT_SUBJECTGROUP(:subjectGroupCode, :subjectGroupName); END;",
                {
                    subjectGroupCode: subjectGroup.subjectGroupCode,
                    subjectGroupName: subjectGroup.subjectGroupName
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

module.exports = SubjectGroupModel;
