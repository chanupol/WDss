/**
 * Created by Aem on 2/8/2016 AD.
 */
"use strict";
var oracledb = require("oracledb");
var uuid = require("node-uuid");
var Database = require("../../config/database");
var Encryption = require("../../utility/encryption");

oracledb.autoCommit = true;

function SecurityModel() {
}

//--------------------------------------------------------------------------------
//
// User function
//
//--------------------------------------------------------------------------------


SecurityModel.prototype.GetUser = function (callback) {
    var database = new Database();

    oracledb.outFormat = oracledb.OBJECT;

    oracledb.getConnection(database.oracleConfig(), function (err, connection) {
        if (err) {
            console.error(err.message);
            callback(err, null);
        } else {
            connection.execute("SELECT ID, USERNAME, STATUS,RoleId FROM 'USER'", function (err, result) {
                if (err) {
                    console.error(err.message);
                    database.DoRelease(connection);
                    callback(err, null);
                } else {
                    result.outBinds.cursor.getRows(database.MaximumCursorRows(), function (err, rows) {
                        oracledb.DoClose(connection, result.outBinds.cursor);
                        callback(err, rows);
                    });
                }
            });
        }
    });
};

SecurityModel.prototype.GetUserByToken = function (token, callback) {
    var database = new Database();

    oracledb.outFormat = oracledb.OBJECT;

    oracledb.getConnection(database.oracleConfig(), function (err, connection) {
        if (err) {
            console.error(err.message);
            callback(err, null);
        } else {
            connection.execute("BEGIN SP_GET_USER_BY_TOKEN(:p_token, :token, :userId, :userName, :status, :roleId, :roleName,:cursorMenu); END;", {
                p_token: token,
                token: {dir: oracledb.BIND_OUT, type: oracledb.STRING},
                userId: {dir: oracledb.BIND_OUT, type: oracledb.NUMBER},
                userName: {dir: oracledb.BIND_OUT, type: oracledb.STRING},
                status: {dir: oracledb.BIND_OUT, type: oracledb.STRING},
                roleId: {dir: oracledb.BIND_OUT, type: oracledb.NUMBER},
                roleName: {dir: oracledb.BIND_OUT, type: oracledb.STRING},
                cursorMenu: {type: oracledb.CURSOR, dir: oracledb.BIND_OUT}
            }, function (err, result) {
                if (err) {
                    console.error(err.message);
                    database.DoRelease(connection);
                    callback(err, null);
                } else {
                    var obj = result.outBinds;

                    obj.cursorMenu.getRows(database.MaximumCursorRows(), function (err, cursorMenu) {
                            if (err) {
                                console.log(err);
                            }

                            var userData = {
                                token: obj.token,
                                userId: obj.userId,
                                userName: obj.userName,
                                status: obj.status,
                                roleId: obj.roleId,
                                roleName: obj.roleName,
                                menu: cursorMenu
                            };

                            database.DoRelease(connection);
                            callback(err, userData);
                        }
                    );
                }
            });
        }
    });
};

SecurityModel.prototype.CreateNewUser = function (user, callback) {
    var database = new Database();
    var encryption = new Encryption();

    oracledb.outFormat = oracledb.OBJECT;

    oracledb.getConnection(database.oracleConfig(), function (err, connection) {
        if (err) {
            console.error(err.message);
            callback(err, null);
        } else {
            connection.execute("BEGIN SP_INSERT_USER(:username, :password,:tchChiefId,:tchHenchManId,:roleId); END;",
                {
                    userName: user.userName,
                    password: encryption.Encrypt(user.password),
                    tchChiefId:user.tchChiefId,
                    tchHenchManId:user.tchHenchManId,
                    roleId:user.roleId
                },
                function (err, result) {
                    if (err) {
                        console.error(err.message);
                        database.DoRelease(connection);
                        callback(err, null);
                    } else {
                        database.DoRelease(connection);
                        callback(null, result);
                    }
                });
        }
    });
};

//--------------------------------------------------------------------------------
//
// Security function
//
//--------------------------------------------------------------------------------
SecurityModel.prototype.Login = function (username, password, callback) {
    var database = new Database();
    var encryption = new Encryption();

    oracledb.outFormat = oracledb.OBJECT;

    oracledb.getConnection(database.oracleConfig(), function (err, connection) {
        if (err) {
            console.error(err.message);
            callback(err, null);
        } else {
            connection.execute("BEGIN SP_LOGIN(:username, :password, :token); END;", {
                username: username,
                password: encryption.Encrypt(password),
                token: {dir: oracledb.BIND_OUT, type: oracledb.STRING}
            }, function (err, result) {
                if (err) {
                    console.error(err.message);
                    database.DoRelease(connection);
                    callback(err, null);
                } else {
                    database.DoRelease(connection);
                    callback(null, result.outBinds);
                }
            });
        }
    });
};

SecurityModel.prototype.CheckToken = function (token, callback) {
    var database = new Database();

    oracledb.outFormat = oracledb.OBJECT;

    oracledb.getConnection(database.oracleConfig(), function (err, connection) {
        if (err) {
            console.error(err.message);
            callback(err, null);
        } else {
            connection.execute("BEGIN SP_CHECKTOKEN(:ptoken, :token); END;", {
                ptoken: token,
                token: {dir: oracledb.BIND_OUT, type: oracledb.STRING}
            }, function (err, result) {
                if (err) {
                    console.error(err.message);
                    database.DoRelease(connection);
                    callback(err, null);
                } else {
                    database.DoRelease(connection);
                    callback(null, result.outBinds.token);
                }
            });
        }
    });
};

SecurityModel.prototype.GenerateToken = function (callback) {
    var database = new Database();

    oracledb.outFormat = oracledb.OBJECT;

    oracledb.getConnection(database.oracleConfig(), function (err, connection) {
        if (err) {
            console.error(err.message);
            callback(err, null);
        } else {
            connection.execute("SELECT * FROM VUSER", function (err, user) {
                if (err) {
                    console.error(err.message);
                    database.DoRelease(connection);
                    callback(err, null);
                } else {
                    for (var i = 0; i < user.rows.length; i++) {
                        var token = {
                            token: user.rows[i].ID + "-" + uuid.v4(),
                            status: "InUse",
                            userid: user.rows[i].ID
                        };

                        if (user.rows[i].ROLENAME == 'admin') {
                            token.status = "Forever"
                        }

                        connection.execute("BEGIN SP_INSERT_TOKENGENERATED(:userId, :token, :status); END;",
                            {
                                userId: token.userid,
                                token: token.token,
                                status: token.status
                            },
                            function (err, result) {
                                if (err) {
                                    console.error(err.message);
                                }

                                if (i == user.rows.length - 1) {
                                    database.DoRelease(connection);
                                }
                            });
                    }

                    callback(null, null);
                }
            });
        }
    });
};

//--------------------------------------------------------------------------------
//
// Private function
//
//--------------------------------------------------------------------------------
function fetchRowsFromRS(connection, resultSet, numRows) {
    resultSet.getRows( // get numRows rows
        numRows,
        function (err, rows) {
            if (err) {
                console.log(err);
                database.DoClose(connection, resultSet); // always close the result set
            } else if (rows.length === 0) {    // no rows, or no more rows
                database.DoClose(connection, resultSet); // always close the result set
            } else if (rows.length > 0) {
                console.log("fetchRowsFromRS(): Got " + rows.length + " rows");
                console.log(rows);
                fetchRowsFromRS(connection, resultSet, numRows);
            }
        });
}

module.exports = SecurityModel;
