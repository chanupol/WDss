/**
 * Created by chanupolphermpoon on 4/1/2016 AD.
 */
"use strict";

app.controller("reportSubjectController", function ($scope, $uibModal, $location, reportService) {
    //------------------------------------------------
    //
    // KendoUi Configurations
    //
    //------------------------------------------------

    $scope.getPeriodOptions = {

        dataSource: reportService.getPeriodDs(),

    }

    $scope.grdSubjectAllOptions = {
        dataSource: reportService.getSubjectAllDs(),
        height: 500,
        sortable: true,
        selectable: "row",
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
            buttonCount: 4,
            refresh: true,
            messages: {
                morePages: "More pages"
            }
        },
        dataBound: function (e) {
            //
            // Set defautl first row selected
            var row = e.sender.tbody.find(" > tr:not(.k-grouping-row)").eq(0);
            e.sender.select(row);
        },
        columns: [
            {
                field: "FACULTYNAME",
                title: "Faculty Name",
                width: 255,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"}
            }, {
                field: "PERIODCODE",
                title: "Period Code",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"}
            }, {
                field: "SUBJECTCODE",
                title: "Subject Code",
                width: 80,
                headerAttributes: {style: "text-align:center"},
            }, {
                field: "SUBJECTNAME",
                title: "Subject Name",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"}
            }
            , {
                field: "IMPORTDATE",
                title: "Import Date",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"}
            },
            {
                field: "Percentage",
                title: "Percentage",
                width: 150,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                template: "<div kendo-progress-bar='progressBar' k-min='0'  k-max='100' k-value='#:kendo.toString(Percentage, 'n2')#' style='width: 100%;'></div>",
            }

        ]
    };

    //------------------------------------------------
    //
    // Even Handler
    //
    //------------------------------------------------

});