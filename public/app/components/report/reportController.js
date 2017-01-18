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

        dataSource: reportService.getSubjectListByPeriodCodeDs('1%2F59'),
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
app.controller('graphReportPercentOfSubjectForAdminController', function ($scope, $routeParams, $location, reportService, localStorageService) {

    console.dir("graphReportPercentOfSubjectForAdminController");
    $scope.roleId = localStorageService.get("RoleId");
    console.dir($scope.roleId);
    //------------------------------------------------
    //
    // KendoUi Configurations
    //
    //------------------------------------------------

    $scope.$on('$viewContentLoaded', function (event) {

        //if role is Admin or คณะบดี
        if($scope.roleId == "1" || $scope.roleId == "5"){
            $scope.genGrdTeacher();
        }else{
            //
            //redirect to graph page
            // $location.path('/subject/graph/' + $scope.getTchCode());

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
            //dataSource: reportService.getTeacherBySubjectDs($routeParams.subjectCode),
            // dataSource: reportService.getTeacherBySubjectWithPeriodDs($routeParams.subjectCode, $routeParams.periodCode),
            dataSource: reportService.getTeacherBySubjectWithPeriodDs("PH2108", "2%2F58"),
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
                {
                    field: "FACULTYNAME",
                    title: "คณะ",
                    width: 250,
                    headerAttributes: {style: "text-align:center"},
                    attributes: {"class": "text-center"}
                },
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
                {
                    field: "DEGREENAME",
                    title: "ระดับ",
                    width: 120,
                    headerAttributes: {style: "text-align:center"},
                    attributes: {"class": "text-center"}
                }
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
    if($scope.roleId === 1 || $scope.roleId === 5){
        $scope.isAdmin = true;
        $scope.tchName = $routeParams.tchFullName;
    }else{
        //
        //hide link
        $scope.isAdmin = false;
        $scope.tchName = localStorageService.get("tchFullName");
    }


    $scope.tempData1 = [
        {
            "countZeroPercent": 1,
            "countFiftyPercent": 2,
            "countEightyPercent": 3,
            "count100Percent": 47,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3111",
            "UnitID": 1,
            "UnitName": "แนวคิดเกี่ยวกับการจัดการเชิงกลยุทธ์ในการพัฒนาระบบสุขภาพ",
            "tmpSubjectUnitPre": "PH311113/58"
        },
        {
            "countZeroPercent": 1,
            "countFiftyPercent": 2,
            "countEightyPercent": 1,
            "count100Percent": 45,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3111",
            "UnitID": 2,
            "UnitName": "กระบวนการจัดทำกลยุทธ์",
            "tmpSubjectUnitPre": "PH311123/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 2,
            "countEightyPercent": 1,
            "count100Percent": 44,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3111",
            "UnitID": 3,
            "UnitName": "หลักการและเทคนิคการวิเคราะห์เชิงกลยุทธ์",
            "tmpSubjectUnitPre": "PH311133/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 3,
            "countEightyPercent": 1,
            "count100Percent": 41,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3111",
            "UnitID": 4,
            "UnitName": "กระบวนการวางแผนกลยุทธ์ด้านสุขภาพ",
            "tmpSubjectUnitPre": "PH311143/58"
        },
        {
            "countZeroPercent": 2,
            "countFiftyPercent": 1,
            "countEightyPercent": 0,
            "count100Percent": 42,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3111",
            "UnitID": 5,
            "UnitName": "การนำกลยุทธ์ไปสู่การปฏิบัติ",
            "tmpSubjectUnitPre": "PH311153/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 0,
            "countEightyPercent": 0,
            "count100Percent": 42,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3111",
            "UnitID": 6,
            "UnitName": "การประเมินและควบคุมกลยุทธ์",
            "tmpSubjectUnitPre": "PH311163/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 1,
            "countEightyPercent": 0,
            "count100Percent": 41,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3111",
            "UnitID": 7,
            "UnitName": "การประสานงานกับประสิทธิภาพการบริหารงานในทางกลยุทธ์",
            "tmpSubjectUnitPre": "PH311173/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 0,
            "countEightyPercent": 1,
            "count100Percent": 41,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3111",
            "UnitID": 8,
            "UnitName": "การบริหารเชิงกลยุทธ์",
            "tmpSubjectUnitPre": "PH311183/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 1,
            "countEightyPercent": 1,
            "count100Percent": 40,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3111",
            "UnitID": 9,
            "UnitName": "แนวคิดเกี่ยวกับกระบวนทัศน์ในการพัฒนาระบบสุขภาพ",
            "tmpSubjectUnitPre": "PH311193/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 0,
            "countEightyPercent": 1,
            "count100Percent": 40,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3111",
            "UnitID": 10,
            "UnitName": "กลยุทธ์การสร้างองค์กรแห่งการเรียนรู้",
            "tmpSubjectUnitPre": "PH3111103/58"
        },
        {
            "countZeroPercent": 1,
            "countFiftyPercent": 0,
            "countEightyPercent": 0,
            "count100Percent": 41,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3111",
            "UnitID": 11,
            "UnitName": "กลยุทธ์การวิจัยและพัฒนา",
            "tmpSubjectUnitPre": "PH3111113/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 1,
            "countEightyPercent": 0,
            "count100Percent": 41,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3111",
            "UnitID": 12,
            "UnitName": "กลยุทธ์การนำเทคโนโลยีและพัฒนาเทคโนโลยีสารสนเทศมาใช้ในโรงพยาบาล",
            "tmpSubjectUnitPre": "PH3111123/58"
        },
        {
            "countZeroPercent": 1,
            "countFiftyPercent": 0,
            "countEightyPercent": 1,
            "count100Percent": 40,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3111",
            "UnitID": 13,
            "UnitName": "การจัดการเชิงกลยุทธ์โรงพยาบาลในประเทศและต่างประเทศ",
            "tmpSubjectUnitPre": "PH3111133/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 1,
            "countEightyPercent": 0,
            "count100Percent": 41,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3111",
            "UnitID": 14,
            "UnitName": "แนวโน้มการจัดการเชิงกลยุทธ์ในการพัฒนาสุขภาพในอนาคต",
            "tmpSubjectUnitPre": "PH3111143/58"
        },
        {
            "countZeroPercent": 1,
            "countFiftyPercent": 0,
            "countEightyPercent": 1,
            "count100Percent": 41,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3111",
            "UnitID": 15,
            "UnitName": "กลยุทธ์ทางการสาธารณสุข",
            "tmpSubjectUnitPre": "PH3111153/58"
        }
    ];

    $scope.tempData2 = [
        {
            "countZeroPercent": 3,
            "countFiftyPercent": 4,
            "countEightyPercent": 2,
            "count100Percent": 45,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3210",
            "UnitID": 1,
            "UnitName": "ความรู้เบื้องต้นเกี่ยวกับกฎหมาย",
            "tmpSubjectUnitPre": "PH321013/58"
        },
        {
            "countZeroPercent": 1,
            "countFiftyPercent": 7,
            "countEightyPercent": 2,
            "count100Percent": 44,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3210",
            "UnitID": 2,
            "UnitName": "กฎหมายเกี่ยวกับบุคลากรและสถานบริการสาธารณสุข",
            "tmpSubjectUnitPre": "PH321023/58"
        },
        {
            "countZeroPercent": 1,
            "countFiftyPercent": 4,
            "countEightyPercent": 2,
            "count100Percent": 43,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3210",
            "UnitID": 3,
            "UnitName": "กฎหมายเกี่ยวกับการสาธารณสุข การป้องกันและควบคุมโรค และคุ้มครองสุขภาพอนามัย",
            "tmpSubjectUnitPre": "PH321033/58"
        },
        {
            "countZeroPercent": 1,
            "countFiftyPercent": 3,
            "countEightyPercent": 0,
            "count100Percent": 43,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3210",
            "UnitID": 4,
            "UnitName": "กฎหมายเกี่ยวกับยา วัตถุออกฤทธิ์ต่อจิตประสาท ยาเสพติดให้โทษ และเครื่องมือแพทย์",
            "tmpSubjectUnitPre": "PH321043/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 3,
            "countEightyPercent": 0,
            "count100Percent": 42,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3210",
            "UnitID": 5,
            "UnitName": "กฎหมายเกี่ยวกับอาหาร เครื่องสำอางและวัตถุอันตราย",
            "tmpSubjectUnitPre": "PH321053/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 3,
            "countEightyPercent": 1,
            "count100Percent": 41,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3210",
            "UnitID": 6,
            "UnitName": "กฎหมายเกี่ยวกับอาชีวอนามัยและความปลอดภัย",
            "tmpSubjectUnitPre": "PH321063/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 4,
            "countEightyPercent": 1,
            "count100Percent": 39,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3210",
            "UnitID": 7,
            "UnitName": "กฎหมายเกี่ยวกับสิ่งแวดล้อม (๑)",
            "tmpSubjectUnitPre": "PH321073/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 3,
            "countEightyPercent": 1,
            "count100Percent": 38,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3210",
            "UnitID": 8,
            "UnitName": "กฎหมายเกี่ยวกับสิ่งแวดล้อม (๒)",
            "tmpSubjectUnitPre": "PH321083/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 3,
            "countEightyPercent": 0,
            "count100Percent": 38,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3210",
            "UnitID": 9,
            "UnitName": "ความรู้ทั่วไปเกี่ยวกับนิติเวชศาสตร์",
            "tmpSubjectUnitPre": "PH321093/58"
        },
        {
            "countZeroPercent": 1,
            "countFiftyPercent": 3,
            "countEightyPercent": 0,
            "count100Percent": 37,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3210",
            "UnitID": 10,
            "UnitName": "การตายและการเปลี่ยนแปลงหลังตาย",
            "tmpSubjectUnitPre": "PH3210103/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 1,
            "countEightyPercent": 0,
            "count100Percent": 37,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3210",
            "UnitID": 11,
            "UnitName": "การพิสูจน์บุคคล",
            "tmpSubjectUnitPre": "PH3210113/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 2,
            "countEightyPercent": 4,
            "count100Percent": 33,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3210",
            "UnitID": 12,
            "UnitName": "การพิสูจน์เหตุและพฤติกรรมการตาย",
            "tmpSubjectUnitPre": "PH3210123/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 1,
            "countEightyPercent": 0,
            "count100Percent": 36,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3210",
            "UnitID": 13,
            "UnitName": "การตรวจพิสูจน์อาชญากรรมทางเพศและอาชญากรรมต่อเด็ก",
            "tmpSubjectUnitPre": "PH3210133/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 1,
            "countEightyPercent": 2,
            "count100Percent": 34,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3210",
            "UnitID": 14,
            "UnitName": "การเป็นพยานและการเขียนรายงานทางการแพทย์",
            "tmpSubjectUnitPre": "PH3210143/58"
        },
        {
            "countZeroPercent": 1,
            "countFiftyPercent": 2,
            "countEightyPercent": 0,
            "count100Percent": 36,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3210",
            "UnitID": 15,
            "UnitName": "จริยธรรมในวิชาชีพ",
            "tmpSubjectUnitPre": "PH3210153/58"
        }
    ];

    $scope.tempData3 = [
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 0,
            "countEightyPercent": 0,
            "count100Percent": 2,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH2108",
            "UnitID": 1,
            "UnitName": "ปรัชญาและการบริหารกับการบริการสาธารณสุข",
            "tmpSubjectUnitPre": "PH210813/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 1,
            "countEightyPercent": 0,
            "count100Percent": 1,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH2108",
            "UnitID": 2,
            "UnitName": "แผนงานบริการสาธารณสุขระดับต้น",
            "tmpSubjectUnitPre": "PH210823/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 0,
            "countEightyPercent": 0,
            "count100Percent": 1,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH2108",
            "UnitID": 3,
            "UnitName": "การจัดองค์การ",
            "tmpSubjectUnitPre": "PH210833/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 0,
            "countEightyPercent": 0,
            "count100Percent": 1,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH2108",
            "UnitID": 4,
            "UnitName": "การบริหารงานบุคคล",
            "tmpSubjectUnitPre": "PH210843/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 0,
            "countEightyPercent": 0,
            "count100Percent": 1,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH2108",
            "UnitID": 5,
            "UnitName": "การอำนวยการ",
            "tmpSubjectUnitPre": "PH210853/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 0,
            "countEightyPercent": 0,
            "count100Percent": 1,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH2108",
            "UnitID": 6,
            "UnitName": "การควบคุมกำกับงาน",
            "tmpSubjectUnitPre": "PH210863/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 0,
            "countEightyPercent": 1,
            "count100Percent": 0,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH2108",
            "UnitID": 7,
            "UnitName": "การบริหารจัดการทรัพยากรบุคคล",
            "tmpSubjectUnitPre": "PH210873/58"
        }
    ];

    $scope.tempData4 = [
        {
            "countZeroPercent": 1,
            "countFiftyPercent": 2,
            "countEightyPercent": 3,
            "count100Percent": 47,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3111",
            "UnitID": 1,
            "UnitName": "แนวคิดเกี่ยวกับการจัดการเชิงกลยุทธ์ในการพัฒนาระบบสุขภาพ",
            "tmpSubjectUnitPre": "PH311113/58"
        },
        {
            "countZeroPercent": 1,
            "countFiftyPercent": 2,
            "countEightyPercent": 1,
            "count100Percent": 45,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3111",
            "UnitID": 2,
            "UnitName": "กระบวนการจัดทำกลยุทธ์",
            "tmpSubjectUnitPre": "PH311123/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 2,
            "countEightyPercent": 1,
            "count100Percent": 44,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3111",
            "UnitID": 3,
            "UnitName": "หลักการและเทคนิคการวิเคราะห์เชิงกลยุทธ์",
            "tmpSubjectUnitPre": "PH311133/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 3,
            "countEightyPercent": 1,
            "count100Percent": 41,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3111",
            "UnitID": 4,
            "UnitName": "กระบวนการวางแผนกลยุทธ์ด้านสุขภาพ",
            "tmpSubjectUnitPre": "PH311143/58"
        },
        {
            "countZeroPercent": 2,
            "countFiftyPercent": 1,
            "countEightyPercent": 0,
            "count100Percent": 42,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3111",
            "UnitID": 5,
            "UnitName": "การนำกลยุทธ์ไปสู่การปฏิบัติ",
            "tmpSubjectUnitPre": "PH311153/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 0,
            "countEightyPercent": 0,
            "count100Percent": 42,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3111",
            "UnitID": 6,
            "UnitName": "การประเมินและควบคุมกลยุทธ์",
            "tmpSubjectUnitPre": "PH311163/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 1,
            "countEightyPercent": 0,
            "count100Percent": 41,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3111",
            "UnitID": 7,
            "UnitName": "การประสานงานกับประสิทธิภาพการบริหารงานในทางกลยุทธ์",
            "tmpSubjectUnitPre": "PH311173/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 0,
            "countEightyPercent": 1,
            "count100Percent": 41,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3111",
            "UnitID": 8,
            "UnitName": "การบริหารเชิงกลยุทธ์",
            "tmpSubjectUnitPre": "PH311183/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 1,
            "countEightyPercent": 1,
            "count100Percent": 40,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3111",
            "UnitID": 9,
            "UnitName": "แนวคิดเกี่ยวกับกระบวนทัศน์ในการพัฒนาระบบสุขภาพ",
            "tmpSubjectUnitPre": "PH311193/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 0,
            "countEightyPercent": 1,
            "count100Percent": 40,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3111",
            "UnitID": 10,
            "UnitName": "กลยุทธ์การสร้างองค์กรแห่งการเรียนรู้",
            "tmpSubjectUnitPre": "PH3111103/58"
        },
        {
            "countZeroPercent": 1,
            "countFiftyPercent": 0,
            "countEightyPercent": 0,
            "count100Percent": 41,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3111",
            "UnitID": 11,
            "UnitName": "กลยุทธ์การวิจัยและพัฒนา",
            "tmpSubjectUnitPre": "PH3111113/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 1,
            "countEightyPercent": 0,
            "count100Percent": 41,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3111",
            "UnitID": 12,
            "UnitName": "กลยุทธ์การนำเทคโนโลยีและพัฒนาเทคโนโลยีสารสนเทศมาใช้ในโรงพยาบาล",
            "tmpSubjectUnitPre": "PH3111123/58"
        },
        {
            "countZeroPercent": 1,
            "countFiftyPercent": 0,
            "countEightyPercent": 1,
            "count100Percent": 40,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3111",
            "UnitID": 13,
            "UnitName": "การจัดการเชิงกลยุทธ์โรงพยาบาลในประเทศและต่างประเทศ",
            "tmpSubjectUnitPre": "PH3111133/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 1,
            "countEightyPercent": 0,
            "count100Percent": 41,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3111",
            "UnitID": 14,
            "UnitName": "แนวโน้มการจัดการเชิงกลยุทธ์ในการพัฒนาสุขภาพในอนาคต",
            "tmpSubjectUnitPre": "PH3111143/58"
        },
        {
            "countZeroPercent": 1,
            "countFiftyPercent": 0,
            "countEightyPercent": 1,
            "count100Percent": 41,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3111",
            "UnitID": 15,
            "UnitName": "กลยุทธ์ทางการสาธารณสุข",
            "tmpSubjectUnitPre": "PH3111153/58"
        },
        {
            "countZeroPercent": 3,
            "countFiftyPercent": 4,
            "countEightyPercent": 2,
            "count100Percent": 45,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3210",
            "UnitID": 1,
            "UnitName": "ความรู้เบื้องต้นเกี่ยวกับกฎหมาย",
            "tmpSubjectUnitPre": "PH321013/58"
        },
        {
            "countZeroPercent": 1,
            "countFiftyPercent": 7,
            "countEightyPercent": 2,
            "count100Percent": 44,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3210",
            "UnitID": 2,
            "UnitName": "กฎหมายเกี่ยวกับบุคลากรและสถานบริการสาธารณสุข",
            "tmpSubjectUnitPre": "PH321023/58"
        },
        {
            "countZeroPercent": 1,
            "countFiftyPercent": 4,
            "countEightyPercent": 2,
            "count100Percent": 43,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3210",
            "UnitID": 3,
            "UnitName": "กฎหมายเกี่ยวกับการสาธารณสุข การป้องกันและควบคุมโรค และคุ้มครองสุขภาพอนามัย",
            "tmpSubjectUnitPre": "PH321033/58"
        },
        {
            "countZeroPercent": 1,
            "countFiftyPercent": 3,
            "countEightyPercent": 0,
            "count100Percent": 43,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3210",
            "UnitID": 4,
            "UnitName": "กฎหมายเกี่ยวกับยา วัตถุออกฤทธิ์ต่อจิตประสาท ยาเสพติดให้โทษ และเครื่องมือแพทย์",
            "tmpSubjectUnitPre": "PH321043/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 3,
            "countEightyPercent": 0,
            "count100Percent": 42,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3210",
            "UnitID": 5,
            "UnitName": "กฎหมายเกี่ยวกับอาหาร เครื่องสำอางและวัตถุอันตราย",
            "tmpSubjectUnitPre": "PH321053/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 3,
            "countEightyPercent": 1,
            "count100Percent": 41,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3210",
            "UnitID": 6,
            "UnitName": "กฎหมายเกี่ยวกับอาชีวอนามัยและความปลอดภัย",
            "tmpSubjectUnitPre": "PH321063/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 4,
            "countEightyPercent": 1,
            "count100Percent": 39,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3210",
            "UnitID": 7,
            "UnitName": "กฎหมายเกี่ยวกับสิ่งแวดล้อม (๑)",
            "tmpSubjectUnitPre": "PH321073/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 3,
            "countEightyPercent": 1,
            "count100Percent": 38,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3210",
            "UnitID": 8,
            "UnitName": "กฎหมายเกี่ยวกับสิ่งแวดล้อม (๒)",
            "tmpSubjectUnitPre": "PH321083/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 3,
            "countEightyPercent": 0,
            "count100Percent": 38,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3210",
            "UnitID": 9,
            "UnitName": "ความรู้ทั่วไปเกี่ยวกับนิติเวชศาสตร์",
            "tmpSubjectUnitPre": "PH321093/58"
        },
        {
            "countZeroPercent": 1,
            "countFiftyPercent": 3,
            "countEightyPercent": 0,
            "count100Percent": 37,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3210",
            "UnitID": 10,
            "UnitName": "การตายและการเปลี่ยนแปลงหลังตาย",
            "tmpSubjectUnitPre": "PH3210103/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 1,
            "countEightyPercent": 0,
            "count100Percent": 37,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3210",
            "UnitID": 11,
            "UnitName": "การพิสูจน์บุคคล",
            "tmpSubjectUnitPre": "PH3210113/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 2,
            "countEightyPercent": 4,
            "count100Percent": 33,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3210",
            "UnitID": 12,
            "UnitName": "การพิสูจน์เหตุและพฤติกรรมการตาย",
            "tmpSubjectUnitPre": "PH3210123/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 1,
            "countEightyPercent": 0,
            "count100Percent": 36,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3210",
            "UnitID": 13,
            "UnitName": "การตรวจพิสูจน์อาชญากรรมทางเพศและอาชญากรรมต่อเด็ก",
            "tmpSubjectUnitPre": "PH3210133/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 1,
            "countEightyPercent": 2,
            "count100Percent": 34,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3210",
            "UnitID": 14,
            "UnitName": "การเป็นพยานและการเขียนรายงานทางการแพทย์",
            "tmpSubjectUnitPre": "PH3210143/58"
        },
        {
            "countZeroPercent": 1,
            "countFiftyPercent": 2,
            "countEightyPercent": 0,
            "count100Percent": 36,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3210",
            "UnitID": 15,
            "UnitName": "จริยธรรมในวิชาชีพ",
            "tmpSubjectUnitPre": "PH3210153/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 0,
            "countEightyPercent": 0,
            "count100Percent": 2,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH2108",
            "UnitID": 1,
            "UnitName": "ปรัชญาและการบริหารกับการบริการสาธารณสุข",
            "tmpSubjectUnitPre": "PH210813/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 1,
            "countEightyPercent": 0,
            "count100Percent": 1,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH2108",
            "UnitID": 2,
            "UnitName": "แผนงานบริการสาธารณสุขระดับต้น",
            "tmpSubjectUnitPre": "PH210823/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 0,
            "countEightyPercent": 0,
            "count100Percent": 1,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH2108",
            "UnitID": 3,
            "UnitName": "การจัดองค์การ",
            "tmpSubjectUnitPre": "PH210833/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 0,
            "countEightyPercent": 0,
            "count100Percent": 1,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH2108",
            "UnitID": 4,
            "UnitName": "การบริหารงานบุคคล",
            "tmpSubjectUnitPre": "PH210843/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 0,
            "countEightyPercent": 0,
            "count100Percent": 1,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH2108",
            "UnitID": 5,
            "UnitName": "การอำนวยการ",
            "tmpSubjectUnitPre": "PH210853/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 0,
            "countEightyPercent": 0,
            "count100Percent": 1,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH2108",
            "UnitID": 6,
            "UnitName": "การควบคุมกำกับงาน",
            "tmpSubjectUnitPre": "PH210863/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 0,
            "countEightyPercent": 1,
            "count100Percent": 0,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH2108",
            "UnitID": 7,
            "UnitName": "การบริหารจัดการทรัพยากรบุคคล",
            "tmpSubjectUnitPre": "PH210873/58"
        }
    ];

    $scope.tempDataPrePost4 = [
        [
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 6,
                "CountEightyPercent": 2,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 1,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH210812/58",
                "LearnTypeCode": "Post-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 4,
                "CountEightyPercent": 3,
                "Count100Percent": 1,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 2,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH210822/58",
                "LearnTypeCode": "Post-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 6,
                "CountEightyPercent": 1,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 3,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH210832/58",
                "LearnTypeCode": "Post-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 5,
                "CountEightyPercent": 3,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 4,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH210842/58",
                "LearnTypeCode": "Post-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 7,
                "CountEightyPercent": 1,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 5,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH210852/58",
                "LearnTypeCode": "Post-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 5,
                "CountEightyPercent": 1,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 6,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH210862/58",
                "LearnTypeCode": "Post-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 5,
                "CountEightyPercent": 1,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 7,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH210872/58",
                "LearnTypeCode": "Post-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 4,
                "CountEightyPercent": 1,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 8,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH210882/58",
                "LearnTypeCode": "Post-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 4,
                "CountEightyPercent": 1,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 9,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH210892/58",
                "LearnTypeCode": "Post-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 3,
                "CountEightyPercent": 0,
                "Count100Percent": 2,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 10,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH2108102/58",
                "LearnTypeCode": "Post-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 3,
                "CountEightyPercent": 2,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 11,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH2108112/58",
                "LearnTypeCode": "Post-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 4,
                "CountEightyPercent": 1,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 12,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH2108122/58",
                "LearnTypeCode": "Post-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 4,
                "CountEightyPercent": 1,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 13,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH2108132/58",
                "LearnTypeCode": "Post-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 4,
                "CountEightyPercent": 1,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 14,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH2108142/58",
                "LearnTypeCode": "Post-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 4,
                "CountEightyPercent": 1,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 15,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH2108152/58",
                "LearnTypeCode": "Post-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 1,
                "CountFiftyPercent": 0,
                "CountEightyPercent": 0,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 3,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH210832/58",
                "LearnTypeCode": "Post-Test",
                "IsDone": "Not Done"
            },
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 10,
                "CountEightyPercent": 2,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 1,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH210812/58",
                "LearnTypeCode": "Pre-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 6,
                "CountEightyPercent": 3,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 2,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH210822/58",
                "LearnTypeCode": "Pre-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 6,
                "CountEightyPercent": 2,
                "Count100Percent": 1,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 3,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH210832/58",
                "LearnTypeCode": "Pre-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 6,
                "CountEightyPercent": 2,
                "Count100Percent": 1,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 4,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH210842/58",
                "LearnTypeCode": "Pre-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 7,
                "CountEightyPercent": 2,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 5,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH210852/58",
                "LearnTypeCode": "Pre-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 8,
                "CountEightyPercent": 0,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 6,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH210862/58",
                "LearnTypeCode": "Pre-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 6,
                "CountEightyPercent": 2,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 7,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH210872/58",
                "LearnTypeCode": "Pre-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 6,
                "CountEightyPercent": 1,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 8,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH210882/58",
                "LearnTypeCode": "Pre-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 5,
                "CountEightyPercent": 1,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 9,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH210892/58",
                "LearnTypeCode": "Pre-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 6,
                "CountEightyPercent": 0,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 10,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH2108102/58",
                "LearnTypeCode": "Pre-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 4,
                "CountEightyPercent": 2,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 11,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH2108112/58",
                "LearnTypeCode": "Pre-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 5,
                "CountEightyPercent": 1,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 12,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH2108122/58",
                "LearnTypeCode": "Pre-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 4,
                "CountEightyPercent": 1,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 13,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH2108132/58",
                "LearnTypeCode": "Pre-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 5,
                "CountEightyPercent": 0,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 14,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH2108142/58",
                "LearnTypeCode": "Pre-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 6,
                "CountEightyPercent": 0,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 15,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH2108152/58",
                "LearnTypeCode": "Pre-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 4,
                "CountFiftyPercent": 0,
                "CountEightyPercent": 0,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 1,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH210812/58",
                "LearnTypeCode": "Pre-Test",
                "IsDone": "Not Done"
            },
            {
                "CountZeroScore": 1,
                "CountFiftyPercent": 0,
                "CountEightyPercent": 0,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 14,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH2108142/58",
                "LearnTypeCode": "Pre-Test",
                "IsDone": "Not Done"
            },
            {
                "CountZeroScore": 1,
                "CountFiftyPercent": 0,
                "CountEightyPercent": 0,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 15,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH2108152/58",
                "LearnTypeCode": "Pre-Test",
                "IsDone": "Not Done"
            }
        ]
    ];

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

            $scope.periodCode = response[0].CURRENTLEARNPERIOD.replace("/","%2F");

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

    $scope.ddlPeriodChanged = function() {

        if($scope.ddlSubject.dataSource){
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

        if($scope.subjectCode){
            $scope.loadData();
        }else{
            $scope.chartArr = [];
        }

    };

    //------------------------------------------------
    //
    // Private Function
    //
    //------------------------------------------------

    $scope.loadData = function () {

        graphService.getGraphDataInClassPercentage($scope.tchCode, $scope.periodCode, $scope.subjectCode).then(function (dataStudy) {

            graphService.getGraphDataPretestPosttest($scope.tchCode, $scope.periodCode, $scope.subjectCode).then(function (dataPrePost) {

                $scope.genDynamicChart(dataStudy, dataPrePost);

            }, function (err) {
                if (err) {
                    console.log(err.message);
                }
            });
        }, function (err) {
            if (err) {
                console.log(err.message);
            }
        });

    };

    $scope.genDynamicChart = function (dataStudy, dataPrePost) {
        var arr = [];
        $scope.genDynamicStudyChart(dataStudy, arr);
        $scope.genDynamicPretestPosttestChart(dataPrePost, arr);

        $scope.chartArr = arr;
    };

    $scope.genDynamicStudyChart = function (data, resultArr) {
        var groupedArr = _.groupBy(data, 'SubjectCode');

        _.each(groupedArr, function(arr){
            var sortedArr = _.sortBy(arr, "UnitID");

            resultArr.push(
                {
                    studyOptions: $scope.genChartOption(sortedArr, sortedArr[0].SubjectCode),
                    subjectCode: sortedArr[0].SubjectCode
                }
            );
        });
    };

    $scope.getPeriod = function(){
        return $scope.periodCode.replace("%2F","/");
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
            series:[
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
                majorUnit: 10,
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
            }
        };
    };

    $scope.genDynamicPretestPosttestChart = function (data, resultArr) {
        //
        //group by subject
        var groupSubjectArr = _.groupBy(data, 'SubjectCode');
        _.each(groupSubjectArr, function(outerSubjectArr){
            //
            //iterator through Subject Group Object
            _.each(outerSubjectArr, function(innerSubjectArr){
                var arr = {
                    "Pre-Test":[],
                    "Post-Test":[]
                };
                //
                //group by LearnTypeCode >> Pretest / PostTest
                var groupPrePostArr = _.groupBy(innerSubjectArr, 'LearnTypeCode');
                //
                //iterator through Pretest Posttest Group Object
                _.each(groupPrePostArr, function(prePostArr){
                    //
                    //group by IsDone >> Done / Not Done
                    var groupedArr = _.groupBy(prePostArr, 'IsDone');
                    _.each(groupedArr["Not Done"], function(notDone){
                        //
                        //add 'Not Done' Key to 'Done' array for display in chart
                        var done = _.find(groupedArr["Done"], ["UnitID", notDone.UnitID]);
                        done.NotDone = notDone.CountZeroScore;
                    });
                    arr[prePostArr[0].LearnTypeCode] = _.concat(arr[prePostArr[0].LearnTypeCode], groupedArr["Done"])
                });

                //end onf subject loop here
                //create chart here
                var result = _.find(resultArr, ["subjectCode", $scope.subjectCode]);
                if(result){
                    result.preTestOptions = $scope.genPretestPosttestChartOption(arr["Pre-Test"], $scope.subjectCode);
                    result.postTestOptions = $scope.genPretestPosttestChartOption(arr["Post-Test"], $scope.subjectCode);
                }

            });
        });
    };

    $scope.genPretestPosttestChartOption = function (dataSource, subjectName) {
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
            series:[
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
                majorUnit: 10,
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