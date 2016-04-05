/**
 * Created by chanupolphermpoon on 4/4/2016 AD.
 */
"use strict";

app.controller("teacherController", function ($scope, teacherService) {


    $scope.getNewTeacherData = function () {
        
        teacherService.getTeacherFromCyberU().then(function (response) {
            console.log(response);
        },function (err) {
            console.log(err);
        });
    }
});