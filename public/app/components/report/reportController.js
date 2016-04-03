/**
 * Created by chanupolphermpoon on 4/1/2016 AD.
 */
"use strict";

//----------------------------------------
//
// Begin : Get With Period Filter
//
//----------------------------------------
//
// Subject
app.controller("reportSubjectByPeriodController", function ($scope, $uibModal, $location, reportService) {
    //------------------------------------------------
    //
    // KendoUi Configurations
    //
    //------------------------------------------------
    $scope.returnPeriod = function () {
        var ddlPeriodCodeSplit = $("#ddlPeriodCode").data("kendoDropDownList").text().split('/');
        if (ddlPeriodCodeSplit.length === 2) {
            ddlPeriodCodeSplit = ddlPeriodCodeSplit[0] + "_" + ddlPeriodCodeSplit[1];
        }
        return ddlPeriodCodeSplit;
    }


    $scope.ddlPeriodCodeOptions = {
        //$scope.ddlPeriodCode.value()
        dataSource: reportService.getPeriodDs(),
        dataTextField: "Period",
        dataValueField: "PeriodValue",
        index: 0,
        change: ddlPeriodCodeOnChange

    };
    //console.log($scope.ddlPeriodCode.value());


    function ddlPeriodCodeOnChange(e) {
        /*  console.log($scope.ddlPeriodCode.value());
         console.log($scope.ddlPeriodCode.text());
         console.log(e);
         console.log(this.value());*/
        var value = this.value();
        if (value) {
            var xxxx = $scope.grdSubjectByPeriodOptions;
            console.log(xxxx);
            $scope.grdSubjectByPeriodOptions.dataSource.filter({
                field: "PERIODCODE",
                operator: "contains",
                value: $scope.ddlPeriodCode.text()
            });
        } else {
            $scope.grdSubjectByPeriodOptions.dataSource.filter({});
        }

    }


    $scope.grdSubjectByPeriodOptions = {
        dataSource: reportService.getSubjectListByPeriodCodeDs('2%2F58'),
        height: 500,
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
        toolbar: kendo.template($("#periodTemplate").html()),
        pageable: {
            buttonCount: 5,
            refresh: true,
            messages: {
                morePages: "More pages"
            }
        },
        dataBound: function (e) {
            //
            // Set defautl first row selected
            /* var row = e.sender.tbody.find(" > tr:not(.k-grouping-row)").eq(0);
             e.sender.select(row);*/
            //console.log($("#ddlPeriodCode").data("kendoDropDownList").text());
            //console.log($("#ddlPeriodCode").data("kendoDropDownList").value());

            $scope.$apply(function () {
                //returnPeriod();
            });
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
                attributes: {"class": "text-center"},
                hidden: true
            }, {
                field: "SUBJECTCODE",
                title: "Subject Code",
                width: 80,
                headerAttributes: {style: "text-align:center"},
                hidden: true
            }, {
                field: "SUBJECTNAME",
                title: "Subject Name",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            },
            {
                field: null,
                title: "Subject",
                width: "250px",
                template: "<a href='\\#/video/report/subject/teacher/#=SUBJECTCODE#/{{returnPeriod()}}'> #= SUBJECTCODE #-#=SUBJECTNAME#</a>"

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

//
// Teacher With Period
app.controller("reportTeacherBySubjectPeriodController", function ($scope, $routeParams, $uibModal, $location, reportService) {

    console.log("subjectCode " + $routeParams.subjectCode);
    console.log("periodCode " + $routeParams.periodCode);

    /*var periodCode = $routeParams.periodCode;
     if (periodCode != null && periodCode !== undefined) {
     periodCode = periodCode.split('_');
     //console.log('split periodCode' + periodCode);
     periodCode = periodCode[0] + '%2F' + periodCode[1];
     }*/

    $scope.returnPeriod = function () {
        return $routeParams.periodCode;
    }

    $scope.grdTeacherOptions = {
        dataSource: reportService.getTeacherBySubjectPeriodDs($routeParams.subjectCode, $routeParams.periodCode),
        height: 500,
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
        dataBound: function (e) {
            //
            // Set defautl first row selected
            /*var row = e.sender.tbody.find(" > tr:not(.k-grouping-row)").eq(0);
             e.sender.select(row);*/
        },
        columns: [
            {
                field: "FACULTYNAME",
                title: "Faculty Name",
                width: 250,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"}
            }
            , {
                field: "TCHCODE",
                title: "Teacher Code",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }
            , {
                field: "TCHNAME",
                title: "Teacher Name",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }
            ,
            {
                field: null,
                title: "Teacher",
                width: 255,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                template: "<a href='\\#/video/report/subject/unit/#=SUBJECTCODE#/{{returnPeriod()}}/#=TCHCODE#'> #= TCHCODE #-#=TCHNAME#</a>"
            }
            , {
                field: "DEGREECODE",
                title: "Degree Code",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }
            , {
                field: "DEGREENAME",
                title: "Degree Name",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                //hidden: true
            }

            ,
            {
                field: "PERIODCODE",
                title: "Period Code",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            },
            {
                field: "SUBJECTCODE",
                title: "Subject Code",
                width: 80,
                headerAttributes: {style: "text-align:center"},
                hidden: true
            },
            {
                field: "SUBJECTNAME",
                title: "Subject Name",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }
            , {
                field: "IMPORTDATE",
                title: "Import Date",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }

        ]
    };

});

//
// Unit
app.controller("reportUnitBySubjectPeriodTchCodeController", function ($scope, $routeParams, $uibModal, $location, reportService) {

    console.log("subjectCode " + $routeParams.subjectCode);
    console.log("periodCode " + $routeParams.periodCode);
    console.log("tchCode " + $routeParams.tchCode);


    $scope.returnPeriod = function () {
        return $routeParams.periodCode;
    }

    $scope.grdUnitOptions = {
        dataSource: reportService.getUnitBySubjectPeriodTeacherDs($routeParams.subjectCode, $routeParams.periodCode, $routeParams.tchCode),
        height: 500,
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
        dataBound: function (e) {
            //
            // Set defautl first row selected
            /* var row = e.sender.tbody.find(" > tr:not(.k-grouping-row)").eq(0);
             e.sender.select(row);*/
        },


        columns: [
            {
                field: "FACULTYNAME",
                title: "Faculty Name",
                width: 255,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }, {
                field: "DEGREECODE",
                title: "Degree Code",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }
            , {
                field: "DEGREENAME",
                title: "Degree Name",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }
            , {
                field: "TCHCODE",
                title: "Teacher Code",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }
            , {
                field: "TCHNAME",
                title: "Teacher Name",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }
            ,
            {
                field: "PERIODCODE",
                title: "Period Code",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            },
            {
                field: "SUBJECTCODE",
                title: "Subject Code",
                width: 80,
                headerAttributes: {style: "text-align:center"},
                hidden: true
            }, {
                field: "SUBJECTNAME",
                title: "Subject Name",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            },
            {
                field: "UNITID",
                title: "Unit",
                width: 60,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            },
            {
                field: "UNITNAME",
                title: "Unit Name",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            },
            {
                field: null,
                title: "Unit Name",
                width: 255,
                headerAttributes: {style: "text-align:center"},
                //attributes: {"class": "text-center"},
                template: "<a href='\\#/video/report/subject/topic/#=SUBJECTCODE#/{{returnPeriod()}}/#=TCHCODE#/#=UNITID#'> #= UNITID #-#=UNITNAME#</a>"
            },
            {
                field: "TOTALVIDEOINMINUTE",
                title: "Total VDO Minute",
                width: 150,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                format: "{0:n2}",
                footerTemplate: "#: kendo.toString(sum, 'n2') #"

            },
            {
                field: "TotalVDOInMinuteForPercentage",
                title: "Total VDO Minute For Percentage",
                width: 150,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true

            },
            {
                field: "TotalVDODeficitInMinute",
                title: "Total VDO Deficit Minute",
                width: 150,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                format: "{0:n2}",
                footerTemplate: "#: kendo.toString(sum, 'n2') #"

            },
            {
                field: "StandardTotalVideoInMinute",
                title: "Standard VDO Minute",
                width: 150,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                format: "{0:n2}",
                footerTemplate: "#: kendo.toString(sum, 'n2') #"

            },
            {
                field: "Percentage",
                title: "Percentage",
                width: 150,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                template: "<div kendo-progress-bar='progressBar' k-min='0'  k-max='100' k-value='#:kendo.toString(Percentage, 'n2')#' style='width: 100%;'></div>",
            }
            , {
                field: "IMPORTDATE",
                title: "Import Date",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }

        ]
    };

});

//
// Topic
app.controller("reportTopicBySubjectPeriodTchCodeUnitController", function ($scope, $routeParams, $uibModal, $location, reportService) {

    console.log("subjectCode " + $routeParams.subjectCode);
    console.log("periodCode " + $routeParams.periodCode);
    console.log("tchCode " + $routeParams.tchCode);
    console.log("unitId " + $routeParams.unitId);

    /* var periodCode = $routeParams.periodCode;
     if (periodCode != null && periodCode !== undefined) {
     periodCode = periodCode.split('_');
     //console.log('split periodCode' + periodCode);
     periodCode = periodCode[0] + '%2F' + periodCode[1];
     }*/


    $scope.grdTopicOptions = {
        dataSource: reportService.getTopicBySubjectPeriodTeacherUnitDs($routeParams.subjectCode, $routeParams.periodCode, $routeParams.tchCode, $routeParams.unitId),
        height: 500,
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
        dataBound: function (e) {
            //
            // Set defautl first row selected
            /* var row = e.sender.tbody.find(" > tr:not(.k-grouping-row)").eq(0);
             e.sender.select(row);*/
        },


        columns: [
            {
                field: "FACULTYNAME",
                title: "Faculty Name",
                width: 255,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }, {
                field: "DEGREECODE",
                title: "Degree Code",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }
            , {
                field: "DEGREENAME",
                title: "Degree Name",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }
            , {
                field: "TCHCODE",
                title: "Teacher Code",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }
            , {
                field: "TCHNAME",
                title: "Teacher Name",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }
            ,
            {
                field: "PERIODCODE",
                title: "Period Code",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            },
            {
                field: "SUBJECTCODE",
                title: "Subject Code",
                width: 80,
                headerAttributes: {style: "text-align:center"},
                hidden: true
            }, {
                field: "SUBJECTNAME",
                title: "Subject Name",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            },
            {
                field: "UNITID",
                title: "Unit",
                width: 60,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            },
            {
                field: "UNITNAME",
                title: "Unit Name",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            },
            {
                field: "TOPICNO",
                title: "Topic No.",
                width: 40,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            },
            {
                field: "TOPICNAME",
                title: "Topic Name",
                width: 255,
                headerAttributes: {style: "text-align:center"},
                //attributes: {"class": "text-center"}
            },
            {
                field: "TotalVideoInMinute",
                title: "Total VDO Minute",
                width: 60,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                format: "{0:n2}",
                footerTemplate: "#: kendo.toString(sum, 'n2') #"

            }, {
                field: "PERCENTAGE",
                title: "Percentage",
                template: "<div kendo-progress-bar='progressBar' k-min='0' k-max='100' k-value='#:kendo.toString(PERCENTAGE, 'n2')#' style='width: 100%;'></div>",
                width: 150
            }
            , {
                field: "IMPORTDATE",
                title: "Import Date",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }

        ]
    };

});
//----------------------------------------
//
// End : Get With Period Filter
//
//----------------------------------------


//
// Subject All
app.controller("reportSubjectAllController", function ($scope, $uibModal, $location, reportService) {
    //------------------------------------------------
    //
    // KendoUi Configurations
    //
    //------------------------------------------------


    $scope.grdSubjectAllOptions = {
        dataSource: reportService.getSubjectAllDs(),
        height: 500,
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
            buttonCount: 4,
            refresh: true,
            messages: {
                morePages: "More pages"
            }
        },
        dataBound: function (e) {
            //
            // Set defautl first row selected
            /*var row = e.sender.tbody.find(" > tr:not(.k-grouping-row)").eq(0);
             e.sender.select(row);*/
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
                hidden: true,
            }, {
                field: "SUBJECTNAME",
                title: "Subject Name",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true,
            },
            {
                field: null,
                title: "Subject",
                width: "250px",
                template: "<a href='\\#/video/report/subject/list/teacher/#=SUBJECTCODE#'> #= SUBJECTCODE #-#=SUBJECTNAME#</a>"

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

//
// Teacher With Subject
app.controller("reportTeacherBySubjectAPeriodController", function ($scope, $routeParams, $uibModal, $location, reportService) {

    console.log("subjectCode " + $routeParams.subjectCode);
    //console.log("periodCode " + $routeParams.periodCode);

    /*var periodCode = $routeParams.periodCode;
     if (periodCode != null && periodCode !== undefined) {
     periodCode = periodCode.split('_');
     //console.log('split periodCode' + periodCode);
     periodCode = periodCode[0] + '%2F' + periodCode[1];
     }*/

    $scope.returnPeriod = function () {
        return $routeParams.periodCode;
    }

    $scope.grdTeacherOptions = {
        dataSource: reportService.getTeacherBySubjectDs($routeParams.subjectCode),
        height: 500,
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
        dataBound: function (e) {
            //
            // Set defautl first row selected
            /*var row = e.sender.tbody.find(" > tr:not(.k-grouping-row)").eq(0);
             e.sender.select(row);*/
        },
        columns: [
            {
                field: "FACULTYNAME",
                title: "Faculty Name",
                width: 250,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"}
            }
            , {
                field: "TCHCODE",
                title: "Teacher Code",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }
            , {
                field: "TCHNAME",
                title: "Teacher Name",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }
            ,
            {
                field: null,
                title: "Teacher",
                width: 255,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                template: "<a href='\\#/video/report/subject/list/unit/#=SUBJECTCODE#/#=TCHCODE#'> #= TCHCODE #-#=TCHNAME#</a>"
            }
            , {
                field: "DEGREECODE",
                title: "Degree Code",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }
            , {
                field: "DEGREENAME",
                title: "Degree Name",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                //hidden: true
            }

            ,
            {
                field: "PERIODCODE",
                title: "Period Code",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            },
            {
                field: "SUBJECTCODE",
                title: "Subject Code",
                width: 80,
                headerAttributes: {style: "text-align:center"},
                hidden: true
            },
            {
                field: "SUBJECTNAME",
                title: "Subject Name",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }
            , {
                field: "IMPORTDATE",
                title: "Import Date",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }

        ]
    };

});


//
// Unit
app.controller("reportUnitBySubjectTchCodeController", function ($scope, $routeParams, $uibModal, $location, reportService) {

    console.log("subjectCode " + $routeParams.subjectCode);
    //console.log("periodCode " + $routeParams.periodCode);
    console.log("tchCode " + $routeParams.tchCode);


   /* $scope.returnPeriod = function () {
        return $routeParams.periodCode;
    }*/

    $scope.grdUnitOptions = {
        dataSource: reportService.getUnitBySubjectTeacherDs($routeParams.subjectCode,$routeParams.tchCode),
        height: 500,
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
        dataBound: function (e) {
            //
            // Set defautl first row selected
            /* var row = e.sender.tbody.find(" > tr:not(.k-grouping-row)").eq(0);
             e.sender.select(row);*/
        },


        columns: [
            {
                field: "FACULTYNAME",
                title: "Faculty Name",
                width: 255,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }, {
                field: "DEGREECODE",
                title: "Degree Code",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }
            , {
                field: "DEGREENAME",
                title: "Degree Name",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }
            , {
                field: "TCHCODE",
                title: "Teacher Code",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }
            , {
                field: "TCHNAME",
                title: "Teacher Name",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }
            ,
            {
                field: "PERIODCODE",
                title: "Period Code",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            },
            {
                field: "SUBJECTCODE",
                title: "Subject Code",
                width: 80,
                headerAttributes: {style: "text-align:center"},
                hidden: true
            }, {
                field: "SUBJECTNAME",
                title: "Subject Name",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            },
            {
                field: "UNITID",
                title: "Unit",
                width: 60,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            },
            {
                field: "UNITNAME",
                title: "Unit Name",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            },
            {
                field: null,
                title: "Unit Name",
                width: 255,
                headerAttributes: {style: "text-align:center"},
                //attributes: {"class": "text-center"},
                template: "<a href='\\#/video/report/subject/list/topic/#=SUBJECTCODE#/#=TCHCODE#/#=UNITID#'> #= UNITID #-#=UNITNAME#</a>"
            },
            {
                field: "TOTALVIDEOINMINUTE",
                title: "Total VDO Minute",
                width: 150,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                format: "{0:n2}",
                footerTemplate: "#: kendo.toString(sum, 'n2') #"

            },
            {
                field: "TotalVDOInMinuteForPercentage",
                title: "Total VDO Minute For Percentage",
                width: 150,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true

            },
            {
                field: "TotalVDODeficitInMinute",
                title: "Total VDO Deficit Minute",
                width: 150,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                format: "{0:n2}",
                footerTemplate: "#: kendo.toString(sum, 'n2') #"

            },
            {
                field: "StandardTotalVideoInMinute",
                title: "Standard VDO Minute",
                width: 150,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                format: "{0:n2}",
                footerTemplate: "#: kendo.toString(sum, 'n2') #"

            },
            {
                field: "Percentage",
                title: "Percentage",
                width: 150,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                template: "<div kendo-progress-bar='progressBar' k-min='0'  k-max='100' k-value='#:kendo.toString(Percentage, 'n2')#' style='width: 100%;'></div>",
            }
            , {
                field: "IMPORTDATE",
                title: "Import Date",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }

        ]
    };

});


//
// Topic
app.controller("reportTopicBySubjectTchCodeUnitController", function ($scope, $routeParams, $uibModal, $location, reportService) {

    console.log("subjectCode " + $routeParams.subjectCode);
    //console.log("periodCode " + $routeParams.periodCode);
    console.log("tchCode " + $routeParams.tchCode);
    console.log("unitId " + $routeParams.unitId);

    /* var periodCode = $routeParams.periodCode;
     if (periodCode != null && periodCode !== undefined) {
     periodCode = periodCode.split('_');
     //console.log('split periodCode' + periodCode);
     periodCode = periodCode[0] + '%2F' + periodCode[1];
     }*/


    $scope.grdTopicOptions = {
        dataSource: reportService.getTopicBySubjectTeacherUnitDs($routeParams.subjectCode, $routeParams.tchCode, $routeParams.unitId),
        height: 500,
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
        dataBound: function (e) {
            //
            // Set defautl first row selected
            /* var row = e.sender.tbody.find(" > tr:not(.k-grouping-row)").eq(0);
             e.sender.select(row);*/
        },


        columns: [
            {
                field: "FACULTYNAME",
                title: "Faculty Name",
                width: 255,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }, {
                field: "DEGREECODE",
                title: "Degree Code",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }
            , {
                field: "DEGREENAME",
                title: "Degree Name",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }
            , {
                field: "TCHCODE",
                title: "Teacher Code",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }
            , {
                field: "TCHNAME",
                title: "Teacher Name",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }
            ,
            {
                field: "PERIODCODE",
                title: "Period Code",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            },
            {
                field: "SUBJECTCODE",
                title: "Subject Code",
                width: 80,
                headerAttributes: {style: "text-align:center"},
                hidden: true
            }, {
                field: "SUBJECTNAME",
                title: "Subject Name",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            },
            {
                field: "UNITID",
                title: "Unit",
                width: 60,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            },
            {
                field: "UNITNAME",
                title: "Unit Name",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            },
            {
                field: "TOPICNO",
                title: "Topic No.",
                width: 40,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            },
            {
                field: "TOPICNAME",
                title: "Topic Name",
                width: 255,
                headerAttributes: {style: "text-align:center"},
                //attributes: {"class": "text-center"}
            },
            {
                field: "TotalVideoInMinute",
                title: "Total VDO Minute",
                width: 60,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                format: "{0:n2}",
                footerTemplate: "#: kendo.toString(sum, 'n2') #"

            }, {
                field: "PERCENTAGE",
                title: "Percentage",
                template: "<div kendo-progress-bar='progressBar' k-min='0' k-max='100' k-value='#:kendo.toString(PERCENTAGE, 'n2')#' style='width: 100%;'></div>",
                width: 150
            }
            , {
                field: "IMPORTDATE",
                title: "Import Date",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }

        ]
    };

});
