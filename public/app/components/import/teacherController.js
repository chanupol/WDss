/**
 * Created by chanupolphermpoon on 4/4/2016 AD.
 */
"use strict";

app.controller("teacherController", function ($scope,$uibModal,notificationService, teacherService) {

    function displayLoading(target) {
        var element = $(target);
        kendo.ui.progress(element, true);
        setTimeout(function () {
            kendo.ui.progress(element, false);
            $scope.notificationCenter.success({
                message: "Import success."
            });
        }, 10000);
    }

    $scope.getNewTeacherData = function () {
        
        teacherService.getTeacherFromCyberU().then(function (response) {
            console.log(response);
            displayLoading(document.body);
        },function (err) {
            console.log(err);
            $scope.notificationCenter.error({
                message: err.message
            });
        });
    }
});