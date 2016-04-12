/**
 * Created by Aem on 2/8/2016 AD.
 */
"use strict";

module.exports = function () {
    function Database() {
    }

    //--------------------------------------------------------------------------------
    //
    // Connection string
    //
    //--------------------------------------------------------------------------------
    Database.prototype.oracleConfig = function () {
        var oracleConfig = {
            //user: "WTUDSS",
            //password: "WTUDSS12345678",
            //connectString: "wstock.dyndns.org/orcl.localdomain",
            user: "WTUDSS",
            password: "WTUDSS12345678",
            //connectString : process.env.NODE_ORACLEDB_CONNECTIONSTRING || "wstock.dyndns.org/orcl.localdomain",
            //connectString : process.env.NODE_ORACLEDB_CONNECTIONSTRING || "10.1.10.16/orcl.localdomain",
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

    Database.prototype.DoClose = function (connection, resultSet) {
        resultSet.close(
            function (err) {
                if (err) {
                    console.error(err.message);
                }

                connection.release(function (err) {
                    if (err) {
                        console.error(err.message);
                    }
                });
            });
    };

    return new Database();
};