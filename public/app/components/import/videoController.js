/**
 * Created by chanupolphermpoon on 3/29/2016 AD.
 */
"use strict";

app.controller("videolengthController", function ($scope, $uibModal, videolengthService, notificationService, $window) {

    var videoData = [{}];

    var localStorageDateTime = $window.localStorage;

    $scope.notificationCenterOptions = notificationService.options;

    function displayLoading(target) {
        var element = $(target);
        kendo.ui.progress(element, true);
        setTimeout(function () {
            kendo.ui.progress(element, false);
            $scope.notificationCenter.success({
                message: "Import success."
            });
        }, 160000);
    }

    $scope.getNewVideoData = function () {


        kendo.ui.progress($(document.body), true);

        var importDate = new Date();
        //localStorageDateTime.setItem("importDate");
        videolengthService.getVideoFromCyberU(importDate).then(function (response) {
            //console.log(response);
            displayLoading(document.body);

        }, function (err) {
            console.log(err);
            $scope.notificationCenter.error({
                message: err.message
            });
        });
        kendo.ui.progress($(document.body), false);
        /* videolengthService.getVideoFromCyberU().then(function (response) {
         //videoData.push(response);
         //console.log(response);

         if (response.length > 0) {
         console.log(response);

         insertVideoDataToOrcl(response)
         }

         }, function (err) {
         console.log('Error : ' + err.message);
         });*/
    }

    function insertVideoDataToOrcl(videoData) {


        /* for (var i = 1; i <= videoData.length; i++) {
         var videoDataArray = [{}];

         for (var j = 0; j <= 50; i++) {
         videoDataArray.push(videoData[i]);
         }
         console.log('I = ' + i);
         }*/

        /* var importStatus = videolengthService.importVideoFromCyberU(videoData);
         importStatus.then(function (response) {
         console.log('import SuccessFull ' + response.data);
         console.log(i);
         }, function (err) {
         if (err) {
         console.log('import Error : ' + err.message);
         console.log(i);
         }
         });*/


        for (var i = 0; i <= videoData.length; i++) {

            var importStatus = videolengthService.importVideoFromCyberU(videoData[i]);
            importStatus.then(function (response) {
                console.log('import SuccessFull ' + response.data);
                console.log(i);
            }, function (err) {
                if (err) {
                    console.log('import Error : ' + err.message);
                    console.log(i);
                }
            });
        }
    }


});