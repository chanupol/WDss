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
        //selectable: "row",
        scrollable: true,
        filterable: {
            extra: false,
            operators: {
                string: {
                    startswith: "Starts with",
                    contains: "contains"
                }
            }
        },
        pageable: {
            buttonCount: 5,
            refresh: true,
            messages: {
                morePages: "More pages"
            }
        },
        // change: onGridMasterOrderChange,
        dataBound: function (e) {
            //
            // Set defautl first row selected
            /*var row = e.sender.tbody.find(" > tr:not(.k-grouping-row)").eq(0);
             e.sender.select(row);*/
        },
        columns: [
            {
                field: "ID",
                title: "Id",
                width: 50,
                headerAttributes: {style: "text-align:center"},
                hidden: true,
            },
            {
                field: "ROLENAME",
                title: "ROLE NAME",
                width: 80,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
            },
            {
                field: "USERNAME",
                title: "User Name",
                width: 80,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},

            },
            {
                field: "TCHFULLNAME",
                title: "Teacher Name",
                width: 150,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},

            },
            {
                field: "TCHEMAIL",
                title: "Teacher Email",
                width: 150,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},

            },
            {
                field: "FACNAME",
                title: "Faculty Name",
                width: 80,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},

            },
            {
                field: "USERSTATUS",
                title: "Status",
                width: 80,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},

            },
            
        ]
    };

    //------------------------------------------------
    //
    // Even Handler
    //
    //------------------------------------------------
    $scope.NewUsername = "";
    $scope.Password = "";

    $scope.btnCreateNewUserClicked = function () {
        /* var user = {
         userName: "489000608",
         password: "489000608",
         tchChiefId: "489000608",
         tchHenchManId: "489000608",
         roleId: 2,

         };*/

        console.log("$scope.NewUsername =" + $scope.NewUsername);
        console.log("$scope.NewUsername =" + $scope.Password);

        var user = {
            userName: $scope.NewUsername,
            password: $scope.Password,
            roleId: $('#ddlRole').val()
            //roleId: 2, //1 :Dean ,2 : Teacher, 5 : Admin

        };
        //
        // Create new user
        securityService.addUser(user).then(function (result) {
            $scope.notificationCenter.success({
                message: "Save success."
            });
            $scope.NewUsername = "";
            $scope.Password = "";
        }, function (err) {
            $scope.notificationCenter.error({
                message: err.message
            });
            $scope.NewUsername = "";
            $scope.Password = "";
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