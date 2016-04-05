/**
 * Created by Aem on 3/15/2016 AD.
 */
/**
 * Created by Aem on 3/10/2016 AD.
 */
"use strict";

app.controller("userController", function ($scope, $uibModal, $location, notificationService, securityService) {
    //------------------------------------------------
    //
    // KendoUi Configurations
    //
    //------------------------------------------------
    $scope.notificationCenterOptions = notificationService.options;

    $scope.grdUserOptions = {
        dataSource: securityService.getUsersDs(),
        //height: 500,
        sortable: true,
        selectable: "row",
        scrollable: true,
        // change: onGridMasterOrderChange,
        dataBound: function (e) {
            //
            // Set defautl first row selected
            var row = e.sender.tbody.find(" > tr:not(.k-grouping-row)").eq(0);
            e.sender.select(row);
        },
        columns: [
            {
                field: "ID",
                title: "Id",
                width: 50,
                headerAttributes: {style: "text-align:center"},
            }, {
                field: "USERNAME",
                title: "Username",
                width: 80,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},

            },
            {
                field: "STATUS",
                title: "Status",
                width: 80,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},

            }
        ]
    };

    //------------------------------------------------
    //
    // Even Handler
    //
    //------------------------------------------------
    $scope.btnCreateNewUserClicked = function () {
        var user = {
            userName: "489000608",
            password: "489000608",
            tchChiefId: "489000608",
            tchHenchManId: "489000608",
            roleId: 2,

        };

        //
        // Create new user
        securityService.addUser(user).then(function (result) {
            $scope.notificationCenter.success({
                message: "Save success."
            });
        }, function (err) {
            $scope.notificationCenter.error({
                message: err.message
            });
        });
    };

    $scope.btnGenerateTokenClicked = function () {
        //
        // Create new user
        securityService.generateToken().then(function (result) {
            $scope.notificationCenter.success({
                message: "Save success."
            });
        }, function (err) {
            $scope.notificationCenter.error({
                message: err.message
            });
        });
    };
});