/**
 * Created by Aem on 3/11/2016 AD.
 */
"use strict";

app.factory("securityService", function ($http, $q, $location, $rootScope, localStorageService, handlerService) {
    var uri = serverApiUrl + "security";

    //--------------------------------------------------------------------------------
    //
    // Model
    //
    //--------------------------------------------------------------------------------

    //--------------------------------------------------------------------------------
    //
    // Get Data
    //
    //--------------------------------------------------------------------------------


    //--------------------------------------------------------------------------------
    //
    // Login
    //
    //--------------------------------------------------------------------------------
    function logIn(username, password) {
        var request = $http.get(uri + "/login/" + username + "/" + password);
        return (request.then(handlerService.handlerSuccess, handlerService.handlerError));
    }

    //--------------------------------------------------------------------------------
    //
    // Logout
    //
    //--------------------------------------------------------------------------------
    function logOut() {
        $rootScope.user = null;
        localStorageService.clearAll();
        $location.path("/login");
    }

    //--------------------------------------------------------------------------------
    //
    // Check user login
    //
    //--------------------------------------------------------------------------------
    function loginSuccess(result) {
        //
        // Save login data into user local storage
        localStorageService.set("Token", result.token);

        //
        // Checking user already login.
        var token = localStorageService.get("Token");

        if (token == undefined || token == null) {
            //
            // User not login route user to login page
            logOut();
        } else {
            getUserByToken().then(function (result) {
                //
                // Assign user data to global variable
                $rootScope.user = result;
                localStorageService.set("RoleId", $rootScope.user.roleId);
                localStorageService.set("RoleName", $rootScope.user.roleName);
                localStorageService.set("UserName", $rootScope.user.userName);


                //
                // User already login, route user to default page of user role.
                var defaultPage = $rootScope.user.menu.filter(function (obj) {
                    return obj.DEFAULTROLEMENU == "Y";
                })[0];

                //$location.path("/" + defaultPage.PATH);
                $location.path("/main");
            }, function (err) {
                console.log(err);

                //
                // User not login route user to login page
                logOut();
            });
        }
    }

    function getCurrentUser(callback) {
        if ($rootScope.user == null || $rootScope.user == undefined) {
            //
            // Checking user authentication.
            getUserByToken().then(function (result) {
                //
                // Assign user data to global variable
                $rootScope.user = result;

                callback(null, result);
            }, function (err) {
                console.log(err);

                //
                // If user not authority route user to not authorization page
                $location.path("/notauth");
            });
        } else {
            callback(null, $rootScope.user);
        }
    }

    function getUserByToken() {
        var request = $http.get(uri + "/user/" + getToken());
        return (request.then(handlerService.handlerSuccess, handlerService.handlerError));
    }

    function getUsers() {
        var request = $http.get(uri + "/user/list");
        return (request.then(handlerService.handlerSuccess, handlerService.handlerError));
    }

    function getUsersDs() {
        return new kendo.data.DataSource({
            batch: true,
            transport: {
                read: {
                    url: uri + "/user/list",
                    dataType: "json"
                }
            },
            pageSize: 10,
            schema: {
                model: {
                    id: "ID",
                    fields: {
                        ID: {type: "number"},
                        ROLENAME:{type: "string"},
                        USERNAME: {type: "string"},
                        TCHFULLNAME:{type: "string"},
                        TCHEMAIL:{type: "string"},
                        FACNAME:{type: "string"},
                        USERSTATUS: {type: "string"},
                    }
                }
            }
        });
    }

    function getToken() {
        //
        // Checking user already login.
        var token = localStorageService.get("Token");

        if (token == undefined || token == null) {
            //
            // User not login route user to login page
            logOut();
        } else {
            return token;
        }
    }

    function generateToken() {
        var request = $http.get(uri + "/token/generate/" + getToken());
        return (request.then(handlerService.handlerSuccess, handlerService.handlerError));
    }

    //--------------------------------------------------------------------------------
    //
    // Add data
    //
    //--------------------------------------------------------------------------------
    function addUser(user) {
        var request = $http.put(uri + "/user/new/" + getToken(), user);
        return (request.then(handlerService.handlerSuccess, handlerService.handlerError));
    }

    return ({
        logIn: logIn,
        logOut: logOut,
        loginSuccess: loginSuccess,
        getUserByToken: getUserByToken,
        getCurrentUser: getCurrentUser,
        getToken: getToken,
        addUser: addUser,
        generateToken: generateToken,
        getUsers: getUsers,
        getUsersDs: getUsersDs
    });
});