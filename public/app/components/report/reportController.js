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
app.controller("reportSubjectByPeriodController", function ($scope, $uibModal, $location, reportService, localStorageService) {

    $scope.FacultyName = '';
    $scope.SubjectFullName = '';
    $scope.CurrentPeriod = '';
    var currentPeriod = "";
    var currentPeriodUniCode = "";

    // Get Current Period
    reportService.getCurrentPeriod().then(function (response) {
        console.log("getCurrentPeriod response " + response);
        currentPeriod = response[0].CURRENTLEARNPERIOD;
        $scope.CurrentPeriod = response[0].CURRENTLEARNPERIOD;
        console.log("getCurrentPeriod currentPeriod = " + currentPeriod);

        var periodCodeSplit = currentPeriod.split('/');
        console.log(periodCodeSplit);
        if (periodCodeSplit != undefined && periodCodeSplit.length > 0) {
            currentPeriod = periodCodeSplit[0] + "_" + periodCodeSplit[1];
            //currentPeriodUniCode = periodCodeSplit[0] + "%2F" + periodCodeSplit[1];
        }
    }, function (err) {
        if (err) {
            console.log("getCurrentPeriod err " + err.message);
        }
    });

    $scope.$on('$viewContentLoaded', function (event) {

        console.log('On Load');

        //viewer = new $window.Stimulsoft.Viewer.StiViewer(options, "StiViewer", false);
        currentPeriodUniCode = reportService.getCurrentPeriod();

        //console.log('Initial viewer');

    });

    $scope.$on('$destroy', function () {

    });


    //------------------------------------------------
    //
    // KendoUi Configurations
    //
    //------------------------------------------------
    /* $scope.returnPeriod = function () {
     var ddlPeriodCodeSplit = $("#ddlPeriodCode").data("kendoDropDownList").text().split('/');
     if (ddlPeriodCodeSplit.length === 2) {
     ddlPeriodCodeSplit = ddlPeriodCodeSplit[0] + "_" + ddlPeriodCodeSplit[1];
     }
     return ddlPeriodCodeSplit;
     }*/

    $scope.returnPeriod = function () {
        return currentPeriod;
    }

    $scope.returnTchCode = function () {
        return localStorageService.get("UserName");
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

        dataSource: reportService.getSubjectListByPeriodCodeDs('2%2F59'),
        //dataSource: reportService.getSubjectListByPeriodCodeDs(currentPeriodUniCode),
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
        //toolbar: kendo.template($("#periodTemplate").html()),
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

            var row = e.sender.tbody.find(" > tr:not(.k-grouping-row)").eq(0);
            $scope.$apply(function () {
                //returnPeriod();
                $scope.FacultyName = row[0].cells[0].textContent;
                ;
                $scope.SubjectFullName = row[0].cells[4].textContent;
                ;
            });
        },
        columns: [
            {
                field: "FACULTYNAME",
                title: "คณะ",
                width: 200,
                headerAttributes: {style: "text-align:center"},
                //attributes: {"class": "text-center"}
            },
            {
                field: "DEGREENAME",
                title: "ระดับ",
                width: 100,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},

            },
            {
                field: "PERIODCODE",
                title: "ภาคการศึกษา",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }, {
                field: "SUBJECTCODE",
                title: "รหัสวิชา",
                width: 80,
                headerAttributes: {style: "text-align:center"},
                //hidden: true
            }, {
                field: "SUBJECTNAME",
                title: "ชื่อวิชา",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            },
            {
                field: null,
                title: "ชื่อวิชา",
                width: "250px",
                template: "<a href='\\#/import/report/subject/teacher/#=SUBJECTCODE#/{{returnPeriod()}}'> #=SUBJECTNAME#</a>"
                //template: "<span> #= SUBJECTCODE #-#=SUBJECTNAME#</span>"
            },
            {
                field: null,
                title: "อาจารย์ผู้รับผิดชอบ",
                width: 250,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                template: "<span> #= TCHCODE #-#=TCHNAME#</span>",
                hidden: true,
            }
            , {
                field: "IMPORTDATE",
                title: "วันที่นำเข้าข้อมูล",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"}
            },
            {
                field: "TCHCODE",
                title: "รหัสอาจารย์ผู้รับผิดชอบ",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true,
            },
            {
                field: "TCHNAME",
                title: "อาจารย์ผู้รับผิดชอบ",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true,
            },

            {
                field: "PERCENTAGE",
                title: "เปอร์เซ็น",
                aggregates: ["count"],
                //groupHeaderTemplate: "เปอร์เซ็นที่ <div style='width: 120px;' kendo-progress-bar='progressBar' k-min='0'  k-max='100' k-value='#:kendo.toString(value, 'n2')#' style='width: 100%;'></div> ( Total Count:  #=count# )",
                width: 150,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                template: "<a href='\\#/import/report/subject/unit/#=SUBJECTCODE#/{{returnPeriod()}}/#=TCHCODE#'><div kendo-progress-bar='progressBar' k-min='0'  k-max='100' k-value='#:kendo.toString(PERCENTAGE, 'n2')#' style='width: 100%;'></div></a>",
                //template: "<div kendo-progress-bar='progressBar' k-min='0'  k-max='100' k-value='#:kendo.toString(Percentage, 'n2')#' style='width: 100%;'></div>",
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

    $scope.FacultyName = '';
    $scope.SubjectFullName = '';
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
            var row = e.sender.tbody.find(" > tr:not(.k-grouping-row)").eq(0);
            $scope.$apply(function () {
                //returnPeriod();
                $scope.FacultyName = row[0].cells[0].textContent;

                $scope.SubjectFullName = row[0].cells[7].textContent + '-' + row[0].cells[8].textContent;

            });
        },
        columns: [
            {
                field: "FACULTYNAME",
                title: "คณะ",
                width: 250,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"}
            }
            , {
                field: "TCHCODE",
                title: "รหัสอาจารย์ผู้สอน",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }
            , {
                field: "TCHNAME",
                title: "ชื่ออาจารย์ผู้สอน",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }
            ,
            {
                field: null,
                title: "อาจารย์ผู้สอน",
                width: 255,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                template: kendo.template($("#displayTeacherName").html()),
                //template: "<span>#= TCHCODE #-#=TCHNAME#</span>"
                //template: "<a href='\\#/import/report/subject/unit/#=SUBJECTCODE#/{{returnPeriod()}}/#=TCHCODE#'> #= TCHCODE #-#=TCHNAME#</a>"
            }
            , {
                field: "DEGREECODE",
                title: "รหัสระดับ",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }
            , {
                field: "DEGREENAME",
                title: "ระดับ",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                //hidden: true
            }

            ,
            {
                field: "PERIODCODE",
                title: "ภาคการศึกษา",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            },
            {
                field: "SUBJECTCODE",
                title: "รหัสวิชา",
                width: 80,
                headerAttributes: {style: "text-align:center"},
                hidden: true
            },
            {
                field: "SUBJECTNAME",
                title: "ชื่อวิชา",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }
            , {
                field: "IMPORTDATE",
                title: "วันที่นำเข้าข้อมูล",
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

    $scope.FacultyName = '';
    $scope.SubjectFullName = '';


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

            var row = e.sender.tbody.find(" > tr:not(.k-grouping-row)").eq(0);
            $scope.$apply(function () {
                //returnPeriod();
                $scope.FacultyName = row[0].cells[0].textContent;

                $scope.SubjectFullName = row[0].cells[6].textContent + '-' + row[0].cells[7].textContent;

            });
        },


        columns: [
            {
                field: "FACULTYNAME",
                title: "คณะ",
                width: 255,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }, {
                field: "DEGREECODE",
                title: "รหัสระดับ",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }
            , {
                field: "DEGREENAME",
                title: "ระดับ",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }
            , {
                field: "TCHCODE",
                title: "รหัสอาจารย์ผู้สอน",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }
            , {
                field: "TCHNAME",
                title: "อาจารย์ผู้สอน",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }
            ,
            {
                field: "PERIODCODE",
                title: "ภาคการศึกษา",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            },
            {
                field: "SUBJECTCODE",
                title: "รหัสวิชา",
                width: 80,
                headerAttributes: {style: "text-align:center"},
                hidden: true
            }, {
                field: "SUBJECTNAME",
                title: "ชื่อวิชา",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            },
            {
                field: "UNITID",
                title: "หน่วย",
                width: 60,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            },
            {
                field: "UNITNAME",
                title: "ชื่อหน่วย",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            },
            {
                field: null,
                title: "ชื่อหน่วย",
                width: 220,
                headerAttributes: {style: "text-align:center"},
                //attributes: {"class": "text-center"},
                template: kendo.template($("#displayUnitName").html()),
                //template: "<span> #= UNITID #-#=UNITNAME#</span>"

                //template: "<a href='\\#/import/report/subject/topic/#=SUBJECTCODE#/{{returnPeriod()}}/#=TCHCODE#/#=UNITID#'> #= UNITID #-#=UNITNAME#</a>"
            },
            {
                field: "TOTALVIDEOINMINUTE",
                title: "จำนวนเวลาที่มี",
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
                title: "จำนวนเวลาที่ขาด",
                width: 150,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                format: "{0:n2}",
                footerTemplate: "#: kendo.toString(sum, 'n2') #"

            },
            {
                field: "StandardTotalVideoInMinute",
                title: "จำนวนเวลาที่ต้องมี",
                width: 150,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                format: "{0:n2}",
                footerTemplate: "#: kendo.toString(sum, 'n2') #"

            },
            /*{
             field: null,
             title: "อาจารย์ผู้รับผิดชอบ",
             width: 120,
             headerAttributes: {style: "text-align:center"},
             attributes: {"class": "text-center"},
             template: "<span>#=TCHNAME#</span>"
             //hidden: true
             },*/
            {
                field: "TCHFORCOURSEOUTLINEUNIT",
                title: "อาจารย์ผู้รับผิดชอบ",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                //hidden: true
            },
            {
                field: "TCHFORTAPEUNIT",
                title: "สถานะ",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                //hidden: true
            },
            {
                field: "Percentage",
                title: "เปอร์เซ็น",
                width: 150,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                //template: "<div kendo-progress-bar='progressBar' k-min='0'  k-max='100' k-value='#:kendo.toString(Percentage, 'n2')#' style='width: 100%;'></div>",
                template: "<a href='\\#/import/report/subject/topic/#=SUBJECTCODE#/{{returnPeriod()}}/#=TCHCODE#/#=UNITID#'><div kendo-progress-bar='progressBar' k-min='0'  k-max='100' k-value='#:kendo.toString(Percentage, 'n2')#' style='width: 100%;'></div></a>"
            }
            , {
                field: "IMPORTDATE",
                title: "วันที่นำเข้าข้อมูล",
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

    $scope.FacultyName = '';
    $scope.SubjectCode = $routeParams.subjectCode;
    $scope.SubjectFullName = '';
    $scope.UnitName = '';
    $scope.TchCode = $routeParams.tchCode;
    $scope.PeriodCode = $routeParams.periodCode;

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
            var row = e.sender.tbody.find(" > tr:not(.k-grouping-row)").eq(0);
            $scope.$apply(function () {
                //returnPeriod();
                $scope.FacultyName = row[0].cells[0].textContent;

                //$scope.SubjectCode =row[0].cells[6].innerText;

                $scope.SubjectFullName = row[0].cells[6].textContent + '-' + row[0].cells[7].textContent;

                $scope.UnitName = row[0].cells[8].textContent + '-' + row[0].cells[9].textContent;

            });
        },


        columns: [
            {
                field: "FACULTYNAME",
                title: "คณะ",
                width: 255,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }, {
                field: "DEGREECODE",
                title: "รหัสระดับ",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }
            , {
                field: "DEGREENAME",
                title: "ระดับ",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }
            , {
                field: "TCHCODE",
                title: "รหัสอาจารย์ผู้สอน",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }
            , {
                field: "TCHNAME",
                title: "ชื่ออาจารย์ผู้สอน",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }
            ,
            {
                field: "PERIODCODE",
                title: "ภาคการศึกษา",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            },
            {
                field: "SUBJECTCODE",
                title: "รหัสวิชา",
                width: 80,
                headerAttributes: {style: "text-align:center"},
                hidden: true
            }, {
                field: "SUBJECTNAME",
                title: "ชื่อวิชา",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            },
            {
                field: "UNITID",
                title: "หน่วย",
                width: 60,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            },
            {
                field: "UNITNAME",
                title: "ชื่อหน่วย",
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
                title: "ชื่อหัวข้อ",
                width: 150,
                headerAttributes: {style: "text-align:center"},
                //attributes: {"class": "text-center"}
            },
            {
                field: "TotalVideoInMinute",
                title: "จำนวนเวลาที่มี",
                width: 80,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                format: "{0:n2}",
                footerTemplate: "#: kendo.toString(sum, 'n2') #"

            },
            {
                field: "TCHFORCOURSEOUTLINEUNIT",
                title: "อาจารย์ผู้รับผิดชอบ",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                //hidden: true
            },
            {
                field: "TCHFORCOURSEOUTLINETOPIC",
                title: "อาจารย์เจ้าของเทป",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                //hidden: true
            },
            {
                field: "TCHFORTAPETOPIC",
                title: "สถานะ",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                //hidden: true
            },
            {
                field: "PERCENTAGE",
                title: "การกระจายของหัวข้อ",
                template: "<div kendo-progress-bar='progressBar' k-min='0' k-max='100' k-value='#:kendo.toString(PERCENTAGE, 'n2')#' style='width: 100%;'></div>",
                width: 150
            }
            , {
                field: "IMPORTDATE",
                title: "วันที่นำเข้าข้อมูล",
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
app.controller("reportSubjectAllController", function ($scope, $uibModal, $location, reportService, localStorageService) {
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

    $scope.returnTchCode = function () {
        return localStorageService.get("UserName");
    }

    $scope.uniCodePeriod = function (value) {
        console.log("value = " + value);
        if (value != '' && value != undefined) {
            return value.replace("/", "_");
        } else {
            return '';
        }
    }


    $scope.ddlPeriodCodeOptions = {
        //$scope.ddlPeriodCode.value()
        dataSource: reportService.getPeriodDs(),
        dataTextField: "Period",
        dataValueField: "PeriodValue",
        dataBound: function () {
            var dataSource = this.dataSource;
            var data = dataSource.data();

            if (!this._adding) {
                this._adding = true;

                data.splice(0, 0, {
                    "Period": "All",
                    "PeriodValue": "All"
                });


                //OR add it at the and
                /*dataSource.add({
                 "ProductName": "test",
                 "ProductID": "10000"
                 });*/

                this._adding = false;
            }
            // set selected value after bind
            $("#ddlPeriodCode").data('kendoDropDownList').value("All");
        },
        index: -1,
        change: ddlPeriodCodeOnChange

    };


    function ddlPeriodCodeOnChange(e) {
        /*  console.log($scope.ddlPeriodCode.value());
         console.log($scope.ddlPeriodCode.text());
         console.log(e);
         console.log(this.value());*/
        var value = this.value();
        if (value) {
            var xxxx = $scope.grdSubjectAllOptions;
            console.log(xxxx);
            if ($scope.ddlPeriodCode.text() !== 'All') {
                $scope.grdSubjectAllOptions.dataSource.filter({
                    field: "PERIODCODE",
                    operator: "contains",
                    value: $scope.ddlPeriodCode.text()
                });
            } else {
                $scope.grdSubjectAllOptions.dataSource.filter({});
            }

        } else {

            $scope.grdSubjectAllOptions.dataSource.filter({});
        }

    }


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
            /*var row = e.sender.tbody.find(" > tr:not(.k-grouping-row)").eq(0);
             e.sender.select(row);*/
        },
        columns: [
            {
                field: "FACULTYNAME",
                title: "คณะ",
                width: 200,
                headerAttributes: {style: "text-align:center"},
                //attributes: {"class": "text-center"}
            },
            {
                field: "DEGREENAME",
                title: "ระดับ",
                width: 100,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},

            },
            {
                field: "PERIODCODE",
                title: "ภาคการศึกษา",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"}
            }, {
                field: "SUBJECTCODE",
                title: "รหัสวิชา",
                width: 80,
                headerAttributes: {style: "text-align:center"},
                //hidden: true,
            }, {
                field: "SUBJECTNAME",
                title: "ชื่อวิชา",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true,
            },
            /* {
             field: null,
             title: "ชื่อวิชา",
             width: "250px",
             template: " <a href='\\#/import/report/subject/list/teacher/#=SUBJECTCODE#'> #= SUBJECTCODE #-#=SUBJECTNAME#</a>"
             //template: " <a href='\\#/import/report/subject/list/teacher/period/#=SUBJECTCODE#/{{uniCodePeriod(kendo.toString(#=PERIODCODE#))}}'> #= SUBJECTCODE #-#=SUBJECTNAME#</a>"
             //template: "<span>#= SUBJECTCODE #-#=SUBJECTNAME#</span>"

             },*/
            {
                field: null,
                title: "ชื่อวิชา",
                width: 250,
                headerAttributes: {style: "text-align:center"},
                //attributes: {"class": "text-center"},
                template: kendo.template($("#teacherWithPeriod").html()),
                //hidden: false,
            },
            {
                field: null,
                title: "อาจารย์ผู้รับผิดชอบ",
                width: 250,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                template: "<span> #= TCHCODE #-#=TCHNAME#</span>",
                hidden: true,
            }
            , {
                field: "IMPORTDATE",
                title: "วันที่นำเข้าข้อมูล",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"}
            },
            {
                field: "TCHCODE",
                title: "รหัสอาจารย์ผู้สอน",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true,
            },
            {
                field: "TCHNAME",
                title: "อาจารย์ผู้รับผิดชอบ",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true,
            },
            {
                field: "PERCENTAGE",
                title: "เปอร์เซ็น",
                width: 150,
                aggregates: ["count"],
                //groupHeaderTemplate: "เปอร์เซ็นที่ <div style='width: 120px;' kendo-progress-bar='progressBar' k-min='0'  k-max='100' k-value='#:kendo.toString(value, 'n2')#' style='width: 100%;'></div> ( Total Count:  #=count# )",
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                template: kendo.template($("#unitWithPeriod").html()),
                //template: "<a href='\\#/import/report/subject/list/teacher/#=SUBJECTCODE#'><div kendo-progress-bar='progressBar' k-min='0'  k-max='100' k-value='#:kendo.toString(Percentage, 'n2')#' style='width: 100%;'></div></a>",
                //template: "<a href='\\#/import/report/subject/list/unit/#=SUBJECTCODE#/#=TCHCODE#'><div kendo-progress-bar='progressBar' k-min='0'  k-max='100' k-value='#:kendo.toString(Percentage, 'n2')#' style='width: 100%;'></div></a>",
                //template: "<a href='\\#/import/report/subject/unit/#=SUBJECTCODE#/{{returnPeriod()}}/#=TCHCODE#'><div kendo-progress-bar='progressBar' k-min='0'  k-max='100' k-value='#:kendo.toString(Percentage, 'n2')#' style='width: 100%;'></div></a>",
                //template: kendo.template($("#periodForUnit").html()),
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
    console.log("periodCode " + $routeParams.periodCode);

    $scope.FacultyName = '';
    $scope.SubjectFullName = '';


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
        //dataSource: reportService.getTeacherBySubjectDs($routeParams.subjectCode),
        dataSource: reportService.getTeacherBySubjectWithPeriodDs($routeParams.subjectCode, $routeParams.periodCode),
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
            var row = e.sender.tbody.find(" > tr:not(.k-grouping-row)").eq(0);
            $scope.$apply(function () {
                //returnPeriod();
                $scope.FacultyName = row[0].cells[0].textContent;

                $scope.SubjectFullName = row[0].cells[7].textContent + '-' + row[0].cells[8].textContent;

            });
        },
        columns: [
            {
                field: "FACULTYNAME",
                title: "คณะ",
                width: 250,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"}
            }
            , {
                field: "TCHCODE",
                title: "รหัสอาจารย์ผู้สอน",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }
            , {
                field: "TCHNAME",
                title: "ชื่ออาจารย์ผู้สอน",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }
            ,
            {
                field: null,
                title: "ชื่ออาจารย์ผู้สอน",
                width: 255,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                //template: "<a href='\\#/import/report/subject/list/unit/#=SUBJECTCODE#/#=TCHCODE#'> #= TCHCODE #-#=TCHNAME#</a>"
                //template: "<span>#= TCHCODE #-#=TCHNAME#</span>"
                template: kendo.template($("#displayTeacherName").html()),
            }
            , {
                field: "DEGREECODE",
                title: "รหัสระดับ",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }
            , {
                field: "DEGREENAME",
                title: "ระดับ",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                //hidden: true
            }

            ,
            {
                field: "PERIODCODE",
                title: "ภาคการศึกษา",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            },
            {
                field: "SUBJECTCODE",
                title: "รหัสวิชา",
                width: 80,
                headerAttributes: {style: "text-align:center"},
                hidden: true
            },
            {
                field: "SUBJECTNAME",
                title: "ชื่อวิชา",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }
            , {
                field: "IMPORTDATE",
                title: "วันที่นำเข้าข้อมูล",
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

    $scope.FacultyName = '';
    $scope.SubjectFullName = '';


    $scope.grdUnitOptions = {
        dataSource: reportService.getUnitBySubjectTeacherDs($routeParams.subjectCode, $routeParams.tchCode),
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
            var row = e.sender.tbody.find(" > tr:not(.k-grouping-row)").eq(0);
            $scope.$apply(function () {
                //returnPeriod();
                $scope.FacultyName = row[0].cells[0].textContent;

                $scope.SubjectFullName = row[0].cells[6].textContent + '-' + row[0].cells[7].textContent;

            });
        },


        columns: [
            {
                field: "FACULTYNAME",
                title: "คณะ",
                width: 255,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }, {
                field: "DEGREECODE",
                title: "รหัสระดับ",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }
            , {
                field: "DEGREENAME",
                title: "ระดับ",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }
            , {
                field: "TCHCODE",
                title: "รหัสอาจารย์ผู้สอน",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }
            , {
                field: "TCHNAME",
                title: "ชื่ออาจารย์ผู้สอน",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }
            ,
            {
                field: "PERIODCODE",
                title: "ภาคการศึกษา",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            },
            {
                field: "SUBJECTCODE",
                title: "รหัสวิชา",
                width: 80,
                headerAttributes: {style: "text-align:center"},
                hidden: true
            }, {
                field: "SUBJECTNAME",
                title: "ชื่อวิชา",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            },
            {
                field: "UNITID",
                title: "หน่วย",
                width: 60,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            },
            {
                field: "UNITNAME",
                title: "ชื่อหน่วย",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            },
            {
                field: null,
                title: "ชื่อหน่วย",
                width: 255,
                headerAttributes: {style: "text-align:center"},
                //attributes: {"class": "text-center"},
                template: kendo.template($("#displayUnitName").html()),
                //template: "<span>#= UNITID #-#=UNITNAME#</span>"
                //template: "<a href='\\#/import/report/subject/list/topic/#=SUBJECTCODE#/#=TCHCODE#/#=UNITID#'> #= UNITID #-#=UNITNAME#</a>"
            },
            {
                field: "TOTALVIDEOINMINUTE",
                title: "จำนวนเวลาที่มีจำนวนเวลาที่มี",
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
                title: "จำนวนเวลาที่ขาด",
                width: 150,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                format: "{0:n2}",
                footerTemplate: "#: kendo.toString(sum, 'n2') #"

            },
            {
                field: "StandardTotalVideoInMinute",
                title: "จำนวนเวลาที่ต้องมี",
                width: 150,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                format: "{0:n2}",
                footerTemplate: "#: kendo.toString(sum, 'n2') #"

            },
            /* {
             field: null,
             title: "อาจารย์ผู้รับผิดชอบ",
             width: 220,
             headerAttributes: {style: "text-align:center"},
             attributes: {"class": "text-center"},
             template: "<span>#=TCHCODE#-#=TCHNAME#</span>"
             hidden: true
             },*/

            {
                field: "TCHFORCOURSEOUTLINEUNIT",
                title: "อาจารย์ผู้รับผิดชอบ",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                //hidden: true
            },
            {
                field: "TCHFORTAPEUNIT",
                title: "สถานะ",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                //hidden: true
            },

            {
                field: "Percentage",
                title: "เปอร์เซ็น",
                width: 150,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                template: "<a href='\\#/import/report/subject/list/topic/#=SUBJECTCODE#/#=TCHCODE#/#=UNITID#'><div kendo-progress-bar='progressBar' k-min='0'  k-max='100' k-value='#:kendo.toString(Percentage, 'n2')#' style='width: 100%;'></div></a>"
                //template: "<div kendo-progress-bar='progressBar' k-min='0'  k-max='100' k-value='#:kendo.toString(Percentage, 'n2')#' style='width: 100%;'></div>",
            }
            , {
                field: "IMPORTDATE",
                title: "วันที่นำเข้าข้อมูล",
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
    console.log("periodCode " + $routeParams.periodCode);
    console.log("tchCode " + $routeParams.tchCode);
    console.log("unitId " + $routeParams.unitId);

    /* var periodCode = $routeParams.periodCode;
     if (periodCode != null && periodCode !== undefined) {
     periodCode = periodCode.split('_');
     //console.log('split periodCode' + periodCode);
     periodCode = periodCode[0] + '%2F' + periodCode[1];
     }*/

    $scope.FacultyName = '';
    $scope.SubjectCode = $routeParams.subjectCode;
    $scope.SubjectFullName = '';
    $scope.UnitName = '';
    $scope.TchCode = $routeParams.tchCode;
    $scope.PeriodCode = $routeParams.periodCode;


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

            var row = e.sender.tbody.find(" > tr:not(.k-grouping-row)").eq(0);
            $scope.$apply(function () {
                //returnPeriod();
                $scope.FacultyName = row[0].cells[0].textContent;

                //$scope.SubjectCode =row[0].cells[6].innerText;

                $scope.SubjectFullName = row[0].cells[6].textContent + '-' + row[0].cells[7].textContent;

                $scope.UnitName = row[0].cells[8].textContent + '-' + row[0].cells[9].textContent;

            });
        },


        columns: [
            {
                field: "FACULTYNAME",
                title: "คณะ",
                width: 255,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }, {
                field: "DEGREECODE",
                title: "รหัสระดับ",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }
            , {
                field: "DEGREENAME",
                title: "ระดับ",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }
            , {
                field: "TCHCODE",
                title: "รหัสอาจารย์ผู้สอน",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }
            , {
                field: "TCHNAME",
                title: "ชื่ออาจารย์ผู้สอน",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            }
            ,
            {
                field: "PERIODCODE",
                title: "ภาคการศึกษา",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            },
            {
                field: "SUBJECTCODE",
                title: "รหัสวิชา",
                width: 80,
                headerAttributes: {style: "text-align:center"},
                hidden: true
            }, {
                field: "SUBJECTNAME",
                title: "ชื่อวิชา",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            },
            {
                field: "UNITID",
                title: "หน่วย",
                width: 60,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            },
            {
                field: "UNITNAME",
                title: "ชื่อหน่วย",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            },
            {
                field: "TOPICNO",
                title: "หัวข้อ",
                width: 40,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true
            },
            {
                field: "TOPICNAME",
                title: "ชื่อหัวข้อ",
                width: 180,
                headerAttributes: {style: "text-align:center"},
                //attributes: {"class": "text-center"}
            },
            {
                field: "TotalVideoInMinute",
                title: "จำนวนเวลาที่มี",
                width: 60,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                format: "{0:n2}",
                footerTemplate: "#: kendo.toString(sum, 'n2') #"

            },
            {
                field: "TCHFORCOURSEOUTLINEUNIT",
                title: "อาจารย์ผู้รับผิดชอบ",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                //hidden: true
            },
            {
                field: "TCHFORCOURSEOUTLINETOPIC",
                title: "อาจารย์ผู้รับผิดชอบ",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                //hidden: true
            },
            {
                field: "TCHFORTAPETOPIC",
                title: "สถานะ",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                //hidden: true
            },
            {
                field: "PERCENTAGE",
                title: "การกระจายของหัวข้อ",
                template: "<div kendo-progress-bar='progressBar' k-min='0' k-max='100' k-value='#:kendo.toString(PERCENTAGE, 'n2')#' style='width: 100%;'></div>",
                width: 150
            }
            , {
                field: "IMPORTDATE",
                title: "วันที่นำเข้าข้อมูล",
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
// Graph Report Percent Of Subject
//
//----------------------------------------
app.controller('graphReportPercentOfSubjectForAdminController', function ($rootScope, $scope, $routeParams, $location, graphService, localStorageService) {

    $scope.roleId = localStorageService.get("RoleId");
    $scope.userName = localStorageService.get("UserName");
    $scope.user = $rootScope.user;
    //------------------------------------------------
    //
    // KendoUi Configurations
    //
    //------------------------------------------------

    $scope.$on('$viewContentLoaded', function (event) {

        //if role is Admin or คณะบดี
        if ($scope.roleId == "1" || $scope.roleId == "5") {
            $scope.genGrdTeacher();
        } else {
            //
            //redirect to graph page
            $location.path('/admin/subject/graph/' + $scope.user.tchCode + "/" + $scope.user.tchFullName);

        }
    });

    $scope.$on('$destroy', function () {

    });

    //------------------------------------------------
    //
    // Page Function
    //
    //------------------------------------------------

    //------------------------------------------------
    //
    // Private Function
    //
    //------------------------------------------------

    $scope.genGrdTeacher = function () {

        $scope.grdTeacherOptions = {
            dataSource: graphService.getTeacherDs($scope.roleId, $scope.userName),
            height: 500,
            sortable: true,
            scrollable: true,
            resizable: true,
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
            columns: [
                // {
                //     field: "FACULTYNAME",
                //     title: "คณะ",
                //     width: 250,
                //     headerAttributes: {style: "text-align:center"},
                //     attributes: {"class": "text-center"}
                // },
                {
                    field: "TCHCODE",
                    title: "รหัสอาจารย์ผู้สอน",
                    width: 255,
                    headerAttributes: {style: "text-align:center"},
                    attributes: {"class": "text-center"},
                    template: "<a href='\\#/admin/subject/graph/#=TCHCODE#/#=TCHNAME#'> #=TCHCODE#</a>"
                },
                {
                    field: "TCHNAME",
                    title: "ชื่ออาจารย์ผู้สอน",
                    width: 255,
                    headerAttributes: {style: "text-align:center"},
                    attributes: {"class": "text-center"},
                    template: "<a href='\\#/admin/subject/graph/#=TCHCODE#/#=TCHNAME#'> #=TCHNAME#</a>"
                },
                // {
                //     field: "DEGREENAME",
                //     title: "ระดับ",
                //     width: 120,
                //     headerAttributes: {style: "text-align:center"},
                //     attributes: {"class": "text-center"}
                // }
            ]
        };

    };

    $scope.getTchCode = function () {
        return localStorageService.get("UserName");
    };

});

app.controller('graphReportPercentOfSubjectController', function ($scope, $routeParams, $location, reportService, graphService, localStorageService) {

    $scope.dataArr = [];
    $scope.periodCode = "";
    $scope.subjectCode = "";
    $scope.tchCode = $routeParams.tchCode;
    $scope.roleId = localStorageService.get("RoleId");

    //if role is 5=Admin or 1=คณะบดี
    if ($scope.roleId === 1 || $scope.roleId === 5) {
        $scope.isAdmin = true;
        $scope.tchName = $routeParams.tchFullName;
    } else {
        //
        //hide link
        $scope.isAdmin = false;
        $scope.tchName = $routeParams.tchFullName;
    }

    //------------------------------------------------
    //
    // KendoUi Configurations
    //
    //------------------------------------------------

    $scope.ddlPeriodCodeOptions = {
        dataSource: reportService.getPeriodDs(),
        dataTextField: "Period",
        dataValueField: "PeriodValue"
    };


    $scope.$on('$viewContentLoaded', function (event) {
        // Get Current Period
        reportService.getCurrentPeriod().then(function (response) {

            $scope.periodCode = response[0].CURRENTLEARNPERIOD.replace("/", "%2F");

            $("#ddlPeriodCode").data('kendoDropDownList').value($scope.periodCode);

            $scope.ddlSubjectOptions = {
                dataSource: graphService.getSubjectInTeacherWithPeriodDs($scope.tchCode, $scope.periodCode),
                dataTextField: "SUBJECTNAMELABEL",
                dataValueField: "SUBJECTCODE",
                filter: "contains",
                suggest: true,
                index: 0,
                optionLabel: "เลือกวิชา"
            };

        }, function (err) {
            if (err) {
                console.log("getCurrentPeriod err " + err.message);
            }
        });

    });

    $scope.$on('$destroy', function () {

    });

    //------------------------------------------------
    //
    // Page Function
    //
    //------------------------------------------------

    $scope.ddlPeriodChanged = function () {

        if ($scope.ddlSubject.dataSource) {
            graphService.getSubjectInTeacherWithPeriod($scope.tchCode, $scope.periodCode).then(function (dataSubject) {

                $scope.ddlSubject.dataSource.data(dataSubject);
                $scope.subjectCode = "";
                $scope.chartArr = [];
            }, function (err) {
                if (err) {
                    console.log(err.message);
                }
            });
        }
    };

    $scope.ddlSubjectChanged = function () {

        // if($scope.periodCode === "1%2F59"){
        //     $scope.genDynamicChart($scope.tempData1, $scope.tempDataPrePost4);
        // }else if($scope.periodCode === "1%2F58"){
        //     $scope.genDynamicChart($scope.tempData2, $scope.tempDataPrePost4);
        // }else if($scope.periodCode === "2%2F58"){
        //     $scope.genDynamicChart($scope.tempData3, $scope.tempDataPrePost4);
        // }else if($scope.periodCode === "3%2F58"){
        //     $scope.genDynamicChart($scope.tempData4, $scope.tempDataPrePost4);
        // }

        if ($scope.subjectCode) {
            $scope.loadData();
        } else {
            $scope.chartArr = [];
            $scope.chartDonutArr = [];
        }

    };

    //------------------------------------------------
    //
    // Private Function
    //
    //------------------------------------------------

    $scope.loadData = function () {

        kendo.ui.progress($(document.body), true);

        graphService.getGraphDataInClassPercentage($scope.tchCode, $scope.periodCode, $scope.subjectCode).then(function (dataStudy) {

            graphService.getGraphDataPretestPosttest($scope.tchCode, $scope.periodCode, $scope.subjectCode).then(function (dataPrePost) {
                $scope.genDynamicChart(dataStudy, dataPrePost);

                kendo.ui.progress($(document.body), false);

            }, function (err) {
                kendo.ui.progress($(document.body), false);
                console.log(err.message);
            });
        }, function (err) {
            kendo.ui.progress($(document.body), false);
            console.log(err.message);
        });

    };

    $scope.genDynamicChart = function (dataStudy, dataPrePost) {
        var arr = [];
        $scope.genDynamicStudyChart(dataStudy, arr);
        $scope.genDynamicPretestPosttestChart(dataPrePost, arr);

        if (arr.length === 0) {
            arr.push({});
        }
        $scope.chartArr = arr;
    };

    $scope.genDynamicStudyChart = function (data, resultArr) {
        var groupedArr = _.groupBy(data, 'SubjectCode');

        _.each(groupedArr, function (arr) {
            var sortedArr = _.sortBy(arr, "UnitID");

            resultArr.push(
                {
                    studyOptions: $scope.genChartOption(sortedArr, sortedArr[0].SubjectCode),
                    subjectCode: sortedArr[0].SubjectCode
                }
            );
        });
    };

    $scope.getPeriod = function () {
        return $scope.periodCode.replace("%2F", "/");
    };

    $scope.genChartOption = function (dataSource, subjectName) {
        return {
            // $scope.samepleChartOptions = {
            // title: {
            //     //
            //     //teacher name
            //     text: "จำนวนนักเรียนที่เข้าเรียนในรายวิชา: " + subjectName
            // },
            dataSource: dataSource,
            legend: {
                position: "top",
                item: {
                    visual: createLegendItem
                }
            },
            seriesDefaults: {
                type: "column",
                // stack: true,
                highlight: {
                    toggle: function (e) {
                        // Don't create a highlight overlay,
                        // we'll modify the existing visual instead
                        e.preventDefault();

                        var visual = e.visual;
                        var opacity = e.show ? 0.8 : 1;

                        visual.opacity(opacity);
                    }
                },
                visual: function (e) {
                    return createColumn(e.rect, e.options.color);
                }
            },
            series: [
                //
                //percent range
                {
                    field: "countZeroPercent",
                    name: "0 Percent",
                    color: "#d92800"
                },
                {
                    field: "countFiftyPercent",
                    name: "1-50 Percent",
                    color: "#65c4e0"
                },
                {
                    field: "countEightyPercent",
                    name: "51-80 Percent",
                    color: "#428bca"
                },
                {
                    field: "count100Percent",
                    name: "81-100 Percent",
                    color: "#1045ca"
                }

            ],
            panes: [{
                clip: false
            }],
            chartArea: {
                height: 300
            },
            categoryAxis: {
                //
                //Unit
                field: "UnitID",
                // field: "UnitName",
                // labels: {
                //     rotation: -45
                // },
                majorGridLines: {
                    visible: false
                },
                title: {
                    text: "หน่วยเรียน"
                }
            },
            valueAxis: {
                labels: {
                    template: "#: value# คน"
                },
                // majorUnit: 10,
                line: {
                    visible: false
                },
                title: {
                    text: "จำนวนนิสิต"
                }
            },
            tooltip: {
                visible: true,
                template: "#: value# คน"
            },
            pannable: {
                lock: "y"
            },
            zoomable: {
                mousewheel: {
                    lock: "y"
                },
                selection: {
                    lock: "y"
                }
            },
            dataBound: function (e) {
                var view = e.sender.dataSource.view();
                $("#studyChart").toggle(view.length === 0);
            }
        };
    };

    $scope.genDynamicPretestPosttestChart = function (data, resultArr) {
        //
        //group by subject
        var groupSubjectArr = _.groupBy(data, 'SubjectCode');
        _.each(groupSubjectArr, function (innerSubjectArr) {
            //
            //iterator through Subject Group Object
            var arr = {
                "Pre-Test": [],
                "Post-Test": []
            };
            //
            //group by LearnTypeCode >> Pretest / PostTest
            var groupPrePostArr = _.groupBy(innerSubjectArr, 'LearnTypeCode');
            //
            //iterator through Pretest Posttest Group Object
            _.each(groupPrePostArr, function (prePostArr) {
                //
                //group by IsDone >> Done / Not Done
                var groupedArr = _.groupBy(prePostArr, 'IsDone');
                _.each(groupedArr["Done"], function (done) {
                    //
                    //add 'Not Done' Key to 'Done' array for display in chart
                    var notDone = _.find(groupedArr["Not Done"], ["UnitID", done.UnitID]);
                    if (notDone) {
                        done.NotDone = notDone.CountZeroScore;
                    } else {
                        done.NotDone = 0;
                    }
                });
                arr[prePostArr[0].LearnTypeCode] = _.concat(arr[prePostArr[0].LearnTypeCode], groupedArr["Done"])
            });

            //end onf subject loop here
            //create chart here
            var result = _.find(resultArr, ["subjectCode", $scope.subjectCode]);
            if (result) {
                result.preTestOptions = $scope.genPretestPosttestChartOption(arr["Pre-Test"], $scope.subjectCode, "#pretestChart");
                result.postTestOptions = $scope.genPretestPosttestChartOption(arr["Post-Test"], $scope.subjectCode, "#posttestChart");

                $scope.genDynamicPretestPosttestDonutChart(arr["Pre-Test"], arr["Post-Test"], $scope.subjectCode);
            }
        });
    };

    $scope.genPretestPosttestChartOption = function (dataSource, subjectName, prePostDiv) {
        return {
            // $scope.samepleChartOptions = {
            // title: {
            //     //
            //     //teacher name
            //     text: "จำนวนนักเรียนที่เข้าเรียนในรายวิชา: " + subjectName
            // },
            dataSource: dataSource,
            legend: {
                position: "top",
                item: {
                    visual: createLegendItem
                }
            },
            seriesDefaults: {
                type: "column",
                // stack: true,
                highlight: {
                    toggle: function (e) {
                        // Don't create a highlight overlay,
                        // we'll modify the existing visual instead
                        e.preventDefault();

                        var visual = e.visual;
                        var opacity = e.show ? 0.8 : 1;

                        visual.opacity(opacity);
                    }
                },
                visual: function (e) {
                    return createColumn(e.rect, e.options.color);
                }
            },
            series: [
                //
                //percent range
                {
                    field: "NotDone",
                    name: "ไม่ได้ทำ",
                    color: "#5f5f5f"
                },
                {
                    field: "CountZeroScore",
                    name: "0 Percent",
                    color: "#d92800"
                },
                {
                    field: "CountFiftyPercent",
                    name: "1-50 Percent",
                    color: "#65c4e0"
                },
                {
                    field: "CountEightyPercent",
                    name: "51-80 Percent",
                    color: "#428bca"
                },
                {
                    field: "Count100Percent",
                    name: "81-100 Percent",
                    color: "#1045ca"
                }

            ],
            panes: [{
                clip: false
            }],
            chartArea: {
                height: 300
            },
            categoryAxis: {
                //
                //Unit
                field: "UnitID",
                // field: "UnitName",
                // labels: {
                //     rotation: -45
                // },
                majorGridLines: {
                    visible: false
                },
                title: {
                    text: "หน่วยเรียน"
                }
            },
            valueAxis: {
                labels: {
                    template: "#: value# คน"
                },
                // majorUnit: 10,
                line: {
                    visible: false
                },
                title: {
                    text: "จำนวนนิสิต"
                }
            },
            tooltip: {
                visible: true,
                template: "#: value# คน"
            },
            pannable: {
                lock: "y"
            },
            zoomable: {
                mousewheel: {
                    lock: "y"
                },
                selection: {
                    lock: "y"
                }
            },
            dataBound: function (e) {
                var view = e.sender.dataSource.view();
                $(prePostDiv).toggle(view.length === 0);
            }
        };
    };

    $scope.genDynamicPretestPosttestDonutChart = function (dataPretest, dataPosttest, subjectName) {
        var arr = [];
        var outerArr = [];
        var maxUnit = 15;

        for (var i = 1; i <= maxUnit; i++) {
            var series = [];
            var pretest = _.find(dataPretest, ["UnitID", i]);
            var posttest = _.find(dataPosttest, ["UnitID", i]);
            if (pretest) {
                series.push({
                    name: "Pretest",
                    data: [
                        {
                            category: "ไม่ได้ทำ",
                            value: pretest.NotDone,
                            color: "#9de219"
                        }, {
                            category: "0 Percent",
                            value: pretest.CountZeroScore,
                            color: "#90cc38"
                        }, {
                            category: "1-50 Percent",
                            value: pretest.CountFiftyPercent,
                            color: "#068c35"
                        }, {
                            category: "51-80 Percent",
                            value: pretest.CountEightyPercent,
                            color: "#006634"
                        }, {
                            category: "81-100 Percent",
                            value: pretest.Count100Percent,
                            color: "#004d38"
                        }
                    ]
                });
            }
            if (posttest) {
                series.push({
                    name: "Posttest",
                    visibleInLegend: false,
                    data: [
                        {
                            visibleInLegend: false,
                            category: "ไม่ได้ทำ",
                            value: posttest.NotDone,
                            color: "#9de219"
                        }, {
                            visibleInLegend: false,
                            category: "0 Percent",
                            value: posttest.CountZeroScore,
                            color: "#90cc38"
                        }, {
                            visibleInLegend: false,
                            category: "1-50 Percent",
                            value: posttest.CountFiftyPercent,
                            color: "#068c35"
                        }, {
                            visibleInLegend: false,
                            category: "51-80 Percent",
                            value: posttest.CountEightyPercent,
                            color: "#006634"
                        }, {
                            visibleInLegend: false,
                            category: "81-100 Percent",
                            value: posttest.Count100Percent,
                            color: "#004d38"
                        }
                    ]
                });
            }
            arr.push({
                subjectCode: subjectName,
                unitId: i,
                chartOptions: $scope.genPretestPosttestDonutChartOption(series),
                noRecord: series.length > 0 ? false : true,
            });
            if(arr.length === 3){
                outerArr.push(arr);
                arr = [];
            }
        }
        console.dir(outerArr);
        $scope.chartDonutArr = outerArr;
    };

    $scope.genPretestPosttestDonutChartOption = function (series) {
        return {
            legend: {
                position: "top",
                visible: true
            },
            chartArea: {
                background: "",
                height: 300
            },
            seriesDefaults: {
                type: "donut",
                startAngle: 150
            },
            series: series,
            tooltip: {
                visible: true,
                template: "#= category # (#= series.name #): #= value # คน"
            },
            labels: {
                visible: true,
                background: "transparent",
                position: "outsideEnd",
                template: "#: category#: #: value# คน"
            }
        };
    };

    var drawing = kendo.drawing;

    var geometry = kendo.geometry;

    function createColumn(rect, color) {
        var origin = rect.origin;
        var center = rect.center();
        var bottomRight = rect.bottomRight();
        var radiusX = rect.width() / 2;
        var radiusY = radiusX / 3;
        var gradient = new drawing.LinearGradient({
            stops: [{
                offset: 0,
                color: color
            }, {
                offset: 0.5,
                color: color,
                opacity: 0.9
            }, {
                offset: 0.5,
                color: color,
                opacity: 0.9
            }, {
                offset: 1,
                color: color
            }]
        });

        var path = new drawing.Path({
            fill: gradient,
            stroke: {
                color: "none"
            }
        }).moveTo(origin.x, origin.y)
            .lineTo(origin.x, bottomRight.y)
            .arc(180, 0, radiusX, radiusY, true)
            .lineTo(bottomRight.x, origin.y)
            .arc(0, 180, radiusX, radiusY);

        var topArcGeometry = new geometry.Arc([center.x, origin.y], {
            startAngle: 0,
            endAngle: 360,
            radiusX: radiusX,
            radiusY: radiusY
        });

        var topArc = new drawing.Arc(topArcGeometry, {
            fill: {
                color: color
            },
            stroke: {
                color: "#ebebeb"
            }
        });
        var group = new drawing.Group();
        group.append(path, topArc);
        return group;
    }

    function createLegendItem(e) {
        var color = e.options.markers.background;
        var labelColor = e.options.labels.color;
        var rect = new geometry.Rect([0, 0], [120, 50]);
        var layout = new drawing.Layout(rect, {
            spacing: 5,
            alignItems: "center"
        });

        var overlay = drawing.Path.fromRect(rect, {
            fill: {
                color: "#fff",
                opacity: 0
            },
            stroke: {
                color: "none"
            },
            cursor: "pointer"
        });

        var column = createColumn(new geometry.Rect([0, 0], [15, 10]), color);
        var label = new drawing.Text(e.series.name, [0, 0], {
            fill: {
                color: labelColor
            }
        })

        layout.append(column, label);
        layout.reflow();

        var group = new drawing.Group().append(layout, overlay);

        return group;
    }


});