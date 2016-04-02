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

        var roles = $rootScope.user.roles.filter(function (obj) {
            return obj.ROLENAME == currentPage;
        })[0];

        if (roles == undefined || roles == null) {
            //
            // If user not authority route user to not authorization page
            $location.path("/notauth");
        }
    }
});