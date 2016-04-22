/**
 * Created by Aem on 2/8/2016 AD.
 */
"use strict";

module.exports = function () {

    var async = require("async");

    function Database() {
    }

    //--------------------------------------------------------------------------------
    //
    // Connection string
    //
    //--------------------------------------------------------------------------------
    Database.prototype.oracleConfig = function () {
        var oracleConfig = {
            user: "WTUDSS",
            password: "WTUDSS12345678",
            //connectString : "wstock.dyndns.org/orcl.localdomain",
            //connectString : "10.1.10.16/orcl.localdomain",
            connectString: "113.53.249.27/orcl.localdomain"
        };

        return oracleConfig;
    };

    //--------------------------------------------------------------------------------
    //
    // Maximum rows of cursor
    //
    //--------------------------------------------------------------------------------
    Database.prototype.MaximumCursorRows = function () {
        var maximuCursorRows = 100000;

        return maximuCursorRows;
    };

    //--------------------------------------------------------------------------------
    //
    // Fetch data form cursor
    //
    //--------------------------------------------------------------------------------
    Database.prototype.FetchCursorRow = function(resultSet, resultRows, callback) {
        resultSet.getRows(100, function (err, rows) {
            if (err) {
                callback(err, resultRows);
            } else if (rows.length === 0) {
                callback(null, resultRows);
            } else if (rows.length > 0) {
                resultRows.push.apply(resultRows, rows);

                Database.prototype.FetchCursorRow(resultSet, resultRows, callback);
            }
        });
    };

    //--------------------------------------------------------------------------------
    //
    // Disconnect from oracle section
    //
    //--------------------------------------------------------------------------------
    Database.prototype.DoRelease = function (connection) {
        connection.release(function (err) {
            if (err) {
                console.error(err.message);
            }
        });
    };

    //
    // Close only one result set and then release connection.
    Database.prototype.DoClose = function (connection, resultSet) {
        resultSet.close(
            function (err) {
                if (err) {
                    console.error(err.message);
                }

                Database.prototype.DoRelease(connection);
            });
    };

    //
    // Close all of result set and then release connection.
    Database.prototype.DoCloses = function (connection, resultSets) {
        async.each(resultSets, function (item, callback) {
            item.close(function (err) {
                if (err) {
                    console.error(err.message);
                }

                callback();
            });
        }, function (err) {
            if (err) {
                console.log(err);
            }

            //This function is called when the whole forEach loop is over
            Database.prototype.DoRelease(connection);
        });
    };

    return new Database();
};