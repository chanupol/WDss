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
        dataSource: reportService.getSubjectListByPeriodCodeDs('2%2F58'),
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
                width: 255,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"}
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
                field: null,
                title: "ชื่อวิชา",
                width: "250px",
                template: "<a href='\\#/import/report/subject/teacher/#=SUBJECTCODE#/{{returnPeriod()}}'> #= SUBJECTCODE #-#=SUBJECTNAME#</a>"
                //template: "<span> #= SUBJECTCODE #-#=SUBJECTNAME#</span>"
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
                field: "Percentage",
                title: "เปอร์เซ็น",
                width: 150,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                template: "<a href='\\#/import/report/subject/unit/#=SUBJECTCODE#/{{returnPeriod()}}/#=TCHCODE#'><div kendo-progress-bar='progressBar' k-min='0'  k-max='100' k-value='#:kendo.toString(Percentage, 'n2')#' style='width: 100%;'></div></a>",
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
                template: "<span>#= TCHCODE #-#=TCHNAME#</span>"
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
                width: 255,
                headerAttributes: {style: "text-align:center"},
                //attributes: {"class": "text-center"},
                template: "<a href='\\#/import/report/subject/topic/#=SUBJECTCODE#/{{returnPeriod()}}/#=TCHCODE#/#=UNITID#'> #= UNITID #-#=UNITNAME#</a>"
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
            {
                field: "Percentage",
                title: "เปอร์เซ็น",
                width: 150,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                template: "<div kendo-progress-bar='progressBar' k-min='0'  k-max='100' k-value='#:kendo.toString(Percentage, 'n2')#' style='width: 100%;'></div>",
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
                width: 255,
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

            }, {
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
                width: 255,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"}
            }, {
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
                hidden: true,
            }, {
                field: "SUBJECTNAME",
                title: "ชื่อวิชา",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                hidden: true,
            },
            {
                field: null,
                title: "ชื่อวิชา",
                width: "250px",
                template: " <a href='\\#/import/report/subject/list/teacher/#=SUBJECTCODE#'> #= SUBJECTCODE #-#=SUBJECTNAME#</a>"
                //template: "<span>#= SUBJECTCODE #-#=SUBJECTNAME#</span>"

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
                field: "Percentage",
                title: "เปอร์เซ็น",
                width: 150,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                //template: "<a href='\\#/import/report/subject/list/teacher/#=SUBJECTCODE#'><div kendo-progress-bar='progressBar' k-min='0'  k-max='100' k-value='#:kendo.toString(Percentage, 'n2')#' style='width: 100%;'></div></a>",
                template: "<a href='\\#/import/report/subject/list/unit/#=SUBJECTCODE#/#=TCHCODE#'><div kendo-progress-bar='progressBar' k-min='0'  k-max='100' k-value='#:kendo.toString(Percentage, 'n2')#' style='width: 100%;'></div></a>",
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
    //console.log("periodCode " + $routeParams.periodCode);

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
                template: "<span>#= TCHCODE #-#=TCHNAME#</span>"
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
                template: "<a href='\\#/import/report/subject/list/topic/#=SUBJECTCODE#/#=TCHCODE#/#=UNITID#'> #= UNITID #-#=UNITNAME#</a>"
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
            {
                field: "Percentage",
                title: "เปอร์เซ็น",
                width: 150,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
                template: "<div kendo-progress-bar='progressBar' k-min='0'  k-max='100' k-value='#:kendo.toString(Percentage, 'n2')#' style='width: 100%;'></div>",
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
                width: 255,
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

            }, {
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
