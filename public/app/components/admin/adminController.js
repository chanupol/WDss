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
        //dataSource: orderDs,
        //height: 500,
        sortable: true,
        selectable: "row",
        scrollable: true,
        // change: onGridMasterOrderChange,
        dataBound: function(e) {
            //
            // Set defautl first row selected
            var row = e.sender.tbody.find(" > tr:not(.k-grouping-row)").eq(0);
            e.sender.select(row);
        },
        columns: [
            {
                field: "Time",
                title: "Time",
                width: 50,
                headerAttributes: { style: "text-align:center" },
            }, {
                field: "Order",
                title: "Order",
                width: 20,
                headerAttributes: { style: "text-align:center" },
            }, {
                field: "Volume",
                title: "Volume",
                width: 50,
                headerAttributes: { style: "text-align:center" },
            }, {
                field: "Price",
                title: "Price",
                width: 50,
                headerAttributes: { style: "text-align:center" },
                attributes: { "class": "text-center" },
                format: "{0:#,###.000}"
            }, {
                field: "Value",
                title: "Value",
                width: 50,
                headerAttributes: { style: "text-align:center" },
                attributes: { "class": "text-center" },
                format: "{0:#,###}"
            }, {
                field: "Status",
                title: "Status",
                width: 50,
                headerAttributes: { style: "text-align:center" },
                attributes: { "class": "text-center" }
            },{
                field: "Matched",
                title: "Matched",
                width: 50,
                headerAttributes: { style: "text-align:center" },
                attributes: { "class": "text-center" },
                format: "{0:#,###}"
            }, {
                field: "Unmatched",
                title: "Unmatched",
                width: 50,
                headerAttributes: { style: "text-align:center" },
                attributes: { "class": "text-center" },
                format: "{0:#,###}"
            }
        ]
    };

    //------------------------------------------------
    //
    // Even Handler
    //
    //------------------------------------------------
    $scope.btnCreateNewUserClicked = function() {
        var user = {
            userName: "command",
            password: "command",
            firstName: "Command1",
            lastName: "Command"
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

    $scope.btnGenerateTokenClicked = function() {
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