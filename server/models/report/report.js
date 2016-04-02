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

module.exports = ReportModel;