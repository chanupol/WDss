/**
 * Created by Aem on 3/15/2016 AD.
 */
"use strict";

app.controller("indexController", function ($scope, $rootScope, $location, localStorageService, securityService) {
    $scope.user = null;

    $scope.logOut = function () {
        securityService.logOut();
    };

    //
    // This function will automatic calley when route page changed
    $rootScope.$on('$routeChangeSuccess', function () {

        var token = localStorageService.get("Token");
        var currentPage = $location.path().split("/")[1];

        if ((currentPage != "login" || currentPage != "notauth") && (token != undefined || token != null)) {
            securityService.getCurrentUser(function(err, result) {
                if (err) {
                    console.log(err);

                    //
                    // If user not authority route user to not authorization page
                    $location.path("/notauth");
                } else {
                    //
                    // Assign user data to global variable
                    $rootScope.user = result;

                    checkUserAuthorized(currentPage);
                }
            });
        }
    });

    function checkUserAuthorized(currentPage) {
        //
        // Render menu
        $scope.user = $rootScope.user;
        $scope.groupMenu = {};
        var distinct = [];

        $rootScope.user.menu.forEach(function (menu) {
            if (menu.DEFAULTGROUPMENU == "Y") {
                if (!$scope.groupMenu[menu.GROUPNAME]) {
                    distinct.push(menu.GROUPNAME);
                    $scope.groupMenu[menu.GROUPNAME] = {
                        name: menu.GROUPNAME,
                        path: menu.PATH
                    };
                }
            }
        });

        var groupMenu = $scope.user.menu.filter(function (obj) {
            return obj.PATH.indexOf(currentPage) === 0;
        })[0];

        if (groupMenu == undefined || groupMenu == null) {
            //
            // If user not authority route user to not authorization page
            $location.path("/notauth");
        }
    }
});