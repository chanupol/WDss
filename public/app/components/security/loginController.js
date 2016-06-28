/**
 * Created by Aem on 3/11/2016 AD.
 */
"use strict";

app.controller("loginModalDialogController", function ($scope, $uibModalInstance, $location, localStorageService, securityService) {
    $scope.username = "";
    $scope.password = "";

    //------------------------------------------------
    //
    // KendoUi Configurations
    //
    //------------------------------------------------
    $scope.notificationCenterOptions = {
        appendTo: "#appendto"
    };

    $scope.ok = function () {
        securityService.logIn($scope.username, $scope.password).then(function(result){
            //
            // Login success and route to default page of user role
            securityService.loginSuccess(result);

            //
            // Close modal dialog
            $uibModalInstance.dismiss("cancel");
        }, function(err) {
            //
            // Display error to user
            $scope.notificationCenter.show(err.message, "error");
            var container = $( $scope.notificationCenter.options.appendTo);
            container.scrollTop(container[0].scrollHeight);
        });
    };

    $scope.cancel = function () {
        $scope.username = "";
        $scope.password = "";
    };
});

app.controller("loginController", function ($scope, $uibModal) {
    //
    // Show Dialog
    var modalDialog = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: "loginModalDialog",
        controller: "loginModalDialogController",
        //size: "lg",
        backdrop: "static"
    });


});