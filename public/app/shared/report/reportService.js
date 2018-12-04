/**
 * Created by chanupolphermpoon on 4/1/2016 AD.
 */

"use strict";

app.factory("reportService", function ($http, $q, $rootScope, localStorageService, handlerService) {
    var uri = serverApiUrl + "report";
    var securityUri = serverApiUrl + "security";

    //--------------------------------------------------------------------------------
    //
    // Model
    //
    //--------------------------------------------------------------------------------


    //--------------------------------------------------------------------------------
    //
    // Get data
    //
    //--------------------------------------------------------------------------------

    //--------------------------------------------------------------------------------
    //
    // Period data
    //
    //--------------------------------------------------------------------------------
    function getPeriod() {
        var request = $http.get(uri + "/subject/period/list");
        return (request.then(handlerService.handlerSuccess, handlerService.handlerError));
    }

    function getCurrentPeriod() {
        var request = $http.get(uri + "/period/currentperiod");
        return (request.then(handlerService.handlerSuccess, handlerService.handlerError));
    }

    function getCurrentPeriodDs() {
        return new kendo.data.DataSource({
            batch: true,
            transport: {
                read: {
                    url: uri + "/period/currentperiod",
                    dataType: "json"
                }
            },
            pageSize: 20,
            schema: {
                model: {
                    id: "CURRENTLEARNPERIOD",
                    fields: {
                        Period: {type: "string"}
                    }
                }
            }
        });
    }

    function getPeriodDs() {
        return new kendo.data.DataSource({
            batch: true,
            transport: {
                read: {
                    url: uri + "/subject/period/list",
                    dataType: "json"
                }
            },
            pageSize: 1000,
            schema: {
                model: {
                    id: "Period",
                    fields: {
                        Period: {type: "string"}
                    }
                }
            }
        });
    }


    //--------------------------------------------------------------------------------
    //
    // Subject data
    //
    //--------------------------------------------------------------------------------
    function getSubjectAll() {
        var request = $http.get(uri + "/subject/list");
        return (request.then(handlerService.handlerSuccess, handlerService.handlerError));
    }

    function getSubjectAllDs() {
        return new kendo.data.DataSource({
            //batch: true,
            transport: {
                read: {
                    url: uri + "/subject/list/" + localStorageService.get("RoleId") + "/" + localStorageService.get("UserName"),
                    dataType: "json"
                }
            },
            /* group: {
             field: "PERCENTAGE",
             //dir: "desc"
             },*/
            //serverPaging: true,
            schema: {
                model: {
                    id: "PERIODCODE",
                    fields: {
                        FACULTYNAME: {type: "string"},
                        DEGREECODE: {type: "string"},
                        DEGREENAME: {type: "string"},
                        PERIODCODE: {type: "string"},
                        SUBJECTCODE: {type: "string"},
                        SUBJECTNAME: {type: "string"},
                        IMPORTDATE: {type: "string"},
                        PERCENTAGE: {type: "number"},
                        TCHCODE: {type: "string"},
                        TCHNAME: {type: "string"},

                    }
                }
            },

            pageSize: 20,
            /*group: {
             field: "PERCENTAGE", aggregates: [
             { field: "PERCENTAGE", aggregate: "count" }
             ]
             },*/

            /* serverPaging: true,
             serverFiltering: true,
             serverSorting: true*/
            sort: ({field: "FACULTYNAME", dir: "asc"}, {field: "SUBJECTCODE", dir: "asc"}),

        });
    }


    function getSubjectListByPeriodCode(periodcode) {
        var request = $http.get(uri + "/subject/list/" + periodcode);
        return (request.then(handlerService.handlerSuccess, handlerService.handlerError));
    }

    function getSubjectListByPeriodCodeDs(periodcode) {

        console.log(uri + "/subject/list/" + periodcode + "/" + localStorageService.get("Token") + "/" + localStorageService.get("RoleId") + "/" + localStorageService.get("UserName"))

        return new kendo.data.DataSource({
            batch: true,
            transport: {
                read: {
                    url: uri + "/subject/list/" + periodcode + "/"
                    + localStorageService.get("Token")
                    + "/" + localStorageService.get("RoleId") + "/" + localStorageService.get("UserName"),
                    dataType: "json"
                }
            },
            pageSize: 20,
            schema: {
                model: {
                    id: "PERIODCODE",
                    fields: {
                        FACULTYNAME: {type: "string"},
                        DEGREECODE: {type: "string"},
                        DEGREENAME: {type: "string"},
                        PERIODCODE: {type: "string"},
                        SUBJECTCODE: {type: "string"},
                        SUBJECTNAME: {type: "string"},
                        IMPORTDATE: {type: "string"},
                        PERCENTAGE: {type: "number"},
                        TCHCODE: {type: "string"},
                        TCHNAME: {type: "string"},


                    }
                }
            },
            /* group: {
             field: "PERCENTAGE", aggregates: [
             { field: "PERCENTAGE", aggregate: "count" }
             ]
             },*/
            sort: ({field: "FACULTYNAME", dir: "asc"}, {field: "SUBJECTCODE", dir: "asc"})
        });
    }


    //--------------------------------------------------------------------------------
    //
    // Teacher data
    //
    //--------------------------------------------------------------------------------
    function getTeacherBySubjectPeriod(subjectCode, periodCode) {
        var request = $http.get(uri + "/subject/teacher/list/" + subjectCode + "/" + periodCode);
        return (request.then(handlerService.handlerSuccess, handlerService.handlerError));
    }

    function getTeacherBySubjectPeriodDs(subjectCode, period) {

        return new kendo.data.DataSource({
            batch: true,
            transport: {
                read: {
                    url: uri + "/subject/teacher/list/" + subjectCode + "/" + period + "/" + localStorageService.get("Token")
                    + "/" + localStorageService.get("RoleId") + "/" + localStorageService.get("UserName"),
                    dataType: "json"
                }
            },
            pageSize: 20,
            schema: {
                model: {
                    id: "TCHCODE",
                    fields: {
                        FACULTYNAME: {type: "string"},
                        PERIODCODE: {type: "string"},
                        DEGREECODE: {type: "string"},
                        DEGREENAME: {type: "string"},
                        TCHCODE: {type: "string"},
                        TCHNAME: {type: "string"},
                        SUBJECTCODE: {type: "string"},
                        SUBJECTNAME: {type: "string"},
                        IMPORTDATE: {type: "string"}

                    }
                }
            }
        });
    }

    function getTeacherBySubject(subjectCode) {
        var request = $http.get(uri + "/subject/teacher/" + subjectCode);
        return (request.then(handlerService.handlerSuccess, handlerService.handlerError));
    }

    function getTeacherBySubjectDs(subjectCode) {
        return new kendo.data.DataSource({
            batch: true,
            transport: {
                read: {
                    url: uri + "/subject/teacher/" + subjectCode,
                    dataType: "json"
                }
            },

            schema: {
                model: {
                    id: "TCHCODE",
                    fields: {
                        FACULTYNAME: {type: "string"},
                        PERIODCODE: {type: "string"},
                        DEGREECODE: {type: "string"},
                        DEGREENAME: {type: "string"},
                        TCHCODE: {type: "string"},
                        TCHNAME: {type: "string"},
                        SUBJECTCODE: {type: "string"},
                        SUBJECTNAME: {type: "string"},
                        IMPORTDATE: {type: "string"}

                    }
                }
            },
            pageSize: 20,

        });
    }

    function getTeacherBySubjectWithPeriod(subjectCode, periodCode) {
        var request = $http.get(uri + "/subject/teacher/period/" + subjectCode + "/" + periodCode);
        return (request.then(handlerService.handlerSuccess, handlerService.handlerError));
    }

    function getTeacherBySubjectWithPeriodDs(subjectCode, periodCode) {
        return new kendo.data.DataSource({
            batch: true,
            transport: {
                read: {
                    url: uri + "/subject/teacher/period/" + subjectCode + "/" + periodCode,
                    dataType: "json"
                }
            },

            schema: {
                model: {
                    id: "TCHCODE",
                    fields: {
                        FACULTYNAME: {type: "string"},
                        PERIODCODE: {type: "string"},
                        DEGREECODE: {type: "string"},
                        DEGREENAME: {type: "string"},
                        TCHCODE: {type: "string"},
                        TCHNAME: {type: "string"},
                        SUBJECTCODE: {type: "string"},
                        SUBJECTNAME: {type: "string"},
                        IMPORTDATE: {type: "string"}

                    }
                }
            },
            pageSize: 20,

        });
    }


    //--------------------------------------------------------------------------------
    //
    // Unit data
    //
    //--------------------------------------------------------------------------------
    function getUnitBySubjectPeriodTeacher(subjectCode, periodCode, tchCode) {
        var request = $http.get(uri + "/subject/unit/list/" + subjectCode + "/" + periodCode + "/" + tchCode);
        return (request.then(handlerService.handlerSuccess, handlerService.handlerError));
    }

    function getUnitBySubjectPeriodTeacherDs(subjectCode, periodCode, tchCode) {
        return new kendo.data.DataSource({
            batch: true,
            transport: {
                read: {
                    url: uri + "/subject/unit/list/" + subjectCode + "/" + periodCode + "/" + tchCode,
                    dataType: "json"
                }
            },
            pageSize: 20,
            schema: {
                model: {
                    id: "SUBJECTCODE",
                    fields: {
                        FACULTYNAME: {type: "string"},
                        PERIODCODE: {type: "string"},
                        DEGREECODE: {type: "string"},
                        DEGREENAME: {type: "string"},
                        TCHCODE: {type: "string"},
                        TCHNAME: {type: "string"},
                        SUBJECTCODE: {type: "string"},
                        SUBJECTNAME: {type: "string"},
                        UNITID: {type: "string"},
                        UNITNAME: {type: "string"},
                        TOTALVIDEOINMINUTE: {type: "number"},
                        TotalVDOInMinuteForPercentage: {type: "number"},
                        TotalVDODeficitInMinute: {type: "number"},
                        StandardTotalVideoInMinute: {type: "number"},
                        Percentage: {type: "number"},
                        IMPORTDATE: {type: "string"},
                        TCHFORCOURSEOUTLINEUNIT: {type: "string"},
                        TCHFORTAPEUNIT: {type: "string"},
                        TCHFORCOURSEOUTLINETOPIC: {type: "string"},
                        TCHFORTAPETOPIC: {type: "string"}

                    }
                }
            },
            aggregate: [
                {field: "TOTALVIDEOINMINUTE", aggregate: "sum"},
                {field: "TotalVDODeficitInMinute", aggregate: "sum"},
                {field: "StandardTotalVideoInMinute", aggregate: "sum"}
            ]
        });
    }


    function getUnitBySubjectTeacher(subjectCode, tchCode) {
        var request = $http.get(uri + "/subject/unit/" + subjectCode + "/" + tchCode);
        return (request.then(handlerService.handlerSuccess, handlerService.handlerError));
    }

    function getUnitBySubjectTeacherDs(subjectCode, tchCode) {
        return new kendo.data.DataSource({
            batch: true,
            transport: {
                read: {
                    url: uri + "/subject/unit/" + subjectCode + "/" + tchCode,
                    dataType: "json"
                }
            },
            pageSize: 20,
            schema: {
                model: {
                    id: "SUBJECTCODE",
                    fields: {
                        FACULTYNAME: {type: "string"},
                        PERIODCODE: {type: "string"},
                        DEGREECODE: {type: "string"},
                        DEGREENAME: {type: "string"},
                        TCHCODE: {type: "string"},
                        TCHNAME: {type: "string"},
                        SUBJECTCODE: {type: "string"},
                        SUBJECTNAME: {type: "string"},
                        UNITID: {type: "string"},
                        UNITNAME: {type: "string"},
                        TOTALVIDEOINMINUTE: {type: "number"},
                        TotalVDOInMinuteForPercentage: {type: "number"},
                        TotalVDODeficitInMinute: {type: "number"},
                        StandardTotalVideoInMinute: {type: "number"},
                        Percentage: {type: "number"},
                        IMPORTDATE: {type: "string"},
                        TCHFORCOURSEOUTLINEUNIT: {type: "string"},
                        TCHFORTAPEUNIT: {type: "string"},
                        TCHFORCOURSEOUTLINETOPIC: {type: "string"},
                        TCHFORTAPETOPIC: {type: "string"}


                    }
                }
            },
            aggregate: [
                {field: "TOTALVIDEOINMINUTE", aggregate: "sum"},
                {field: "TotalVDODeficitInMinute", aggregate: "sum"},
                {field: "StandardTotalVideoInMinute", aggregate: "sum"}
            ]
        });
    }


    //--------------------------------------------------------------------------------
    //
    // Topic data
    //
    //--------------------------------------------------------------------------------
    function getTopicBySubjectPeriodTeacherUnit(subjectCode, periodCode, tchCode, unitId) {
        var request = $http.get(uri + "/subject/topic/list/" + subjectCode + "/" + periodCode + "/" + tchCode + "/" + unitId);
        return (request.then(handlerService.handlerSuccess, handlerService.handlerError));
    }

    function getTopicBySubjectPeriodTeacherUnitDs(subjectCode, periodCode, tchCode, unitId) {
        return new kendo.data.DataSource({
            batch: true,
            transport: {
                read: {
                    url: uri + "/subject/topic/list/" + subjectCode + "/" + periodCode + "/" + tchCode + "/" + unitId,
                    dataType: "json"
                }
            },
            pageSize: 20,
            schema: {
                model: {
                    id: "TOPICNO",
                    fields: {
                        FACULTYNAME: {type: "string"},
                        PERIODCODE: {type: "string"},
                        DEGREECODE: {type: "string"},
                        DEGREENAME: {type: "string"},
                        TCHCODE: {type: "string"},
                        TCHNAME: {type: "string"},
                        SUBJECTCODE: {type: "string"},
                        SUBJECTNAME: {type: "string"},
                        UNITID: {type: "string"},
                        UNITNAME: {type: "string"},
                        TOPICNO: {type: "number"},
                        TOPICNAME: {type: "string"},
                        TotalVideoInMinute: {type: "number"},
                        PERCENTAGE: {type: "number"},
                        IMPORTDATE: {type: "string"},
                        TCHFORCOURSEOUTLINEUNIT: {type: "string"},
                        TCHFORTAPEUNIT: {type: "string"},
                        TCHFORCOURSEOUTLINETOPIC: {type: "string"},
                        TCHFORTAPETOPIC: {type: "string"}

                    }
                }
            }
            ,
            aggregate: [
                {field: "TotalVideoInMinute", aggregate: "sum"}
            ]
        });
    }


    function getTopicBySubjectTeacherUnit(subjectCode, tchCode, unitId) {
        var request = $http.get(uri + "/subject/topic/" + subjectCode + "/" + tchCode + "/" + unitId);
        return (request.then(handlerService.handlerSuccess, handlerService.handlerError));
    }

    function getTopicBySubjectTeacherUnitDs(subjectCode, tchCode, unitId) {
        return new kendo.data.DataSource({
            batch: true,
            transport: {
                read: {
                    url: uri + "/subject/topic/" + subjectCode + "/" + +tchCode + "/" + unitId,
                    dataType: "json"
                }
            },
            pageSize: 20,
            schema: {
                model: {
                    id: "TOPICNO",
                    fields: {
                        FACULTYNAME: {type: "string"},
                        PERIODCODE: {type: "string"},
                        DEGREECODE: {type: "string"},
                        DEGREENAME: {type: "string"},
                        TCHCODE: {type: "string"},
                        TCHNAME: {type: "string"},
                        SUBJECTCODE: {type: "string"},
                        SUBJECTNAME: {type: "string"},
                        UNITID: {type: "string"},
                        UNITNAME: {type: "string"},
                        TOPICNO: {type: "number"},
                        TOPICNAME: {type: "string"},
                        TotalVideoInMinute: {type: "number"},
                        PERCENTAGE: {type: "number"},
                        IMPORTDATE: {type: "string"},
                        TCHFORCOURSEOUTLINEUNIT: {type: "string"},
                        TCHFORTAPEUNIT: {type: "string"},
                        TCHFORCOURSEOUTLINETOPIC: {type: "string"},
                        TCHFORTAPETOPIC: {type: "string"}

                    }
                }
            }
            ,
            aggregate: [
                {field: "TotalVideoInMinute", aggregate: "sum"}
            ]
        });
    }


    // Get ZERO VDO
    function getZeroVdoDataDs() {
        return new kendo.data.DataSource({
            batch: true,
            transport: {
                read: {
                    url: uri + "/subject/zerovdo",
                    dataType: "json"
                }
            },
            group: {
                field: "FACULTYNAME", aggregates: [
                    {field: "FACULTYNAME", aggregate: "count"},
                ]
            },
            pageSize: 20,
            schema: {
                model: {
                    id: "RN",
                    fields: {
                        FACULTYNAME: {type: "string"},
                        PERIODCODE: {type: "string"},
                        SUBJECTGROUPCODE: {type: "string"},
                        SUBJECTCODE: {type: "string"},
                        SUBJECTNAME: {type: "string"},
                        IMPORTDATE: {type: "string"},
                        TotalVideoInMinute: {type: "number"},
                        TotalVDOInMinuteForPercentage: {type: "number"},
                        TOTALVDODEFICITINMINUTE: {type: "number"},
                        STANDARDTOTALVIDEOINMINUTE: {type: "number"},
                        PERCENTAGE: {type: "number"},
                        TCHCODE: {type: "string"},
                        TCHNAME: {type: "string"},
                        COURSEOUTLINEOPENTCHCODE: {type: "string"},
                        COURSEOUTLINEOPENTCHNAME: {type: "string"},
                        DEGREECODE: {type: "string"},
                        DEGREENAME: {type: "string"},
                        RN: {type: "number"},

                    }
                }
            }
        });
    }


    //Summary Percent Report
    function getEightyPercentDs() {
        return new kendo.data.DataSource({
            transport: {
                read: {
                    url: uri +"/subject/zerovdo",
                    dataType: "json"
                }
            },
            sort: {
                field: "SUBJECTCODE",
                dir: "asc"
            }
        });
    }

    function getEightyPercent() {
        var request = $http.get(uri + "/subject/zerovdo");
        return (request.then(handlerService.handlerSuccess, handlerService.handlerError));
    }

    function getDataForChart(subjectCode, tchCode, period) {
        var request = $http.get(uri + "/subject/zerovdo/period/teachercode/" + tchCode + "/" + period);
        return (request.then(handlerService.handlerSuccess, handlerService.handlerError));
    }

    //--------------------------------------------------------------------------------
    //
    // Add data
    //
    //--------------------------------------------------------------------------------

    return ({
        getPeriod: getPeriod,
        getPeriodDs: getPeriodDs,
        getCurrentPeriod: getCurrentPeriod,
        getCurrentPeriodDs: getCurrentPeriodDs,
        getSubjectAll: getSubjectAll,
        getSubjectAllDs: getSubjectAllDs,
        getSubjectListByPeriodCode: getSubjectListByPeriodCode,
        getSubjectListByPeriodCodeDs: getSubjectListByPeriodCodeDs,
        getTeacherBySubjectPeriod: getTeacherBySubjectPeriod,
        getTeacherBySubjectPeriodDs: getTeacherBySubjectPeriodDs,
        getTeacherBySubject: getTeacherBySubject,
        getTeacherBySubjectDs: getTeacherBySubjectDs,
        getUnitBySubjectPeriodTeacher: getUnitBySubjectPeriodTeacher,
        getUnitBySubjectPeriodTeacherDs: getUnitBySubjectPeriodTeacherDs,
        getUnitBySubjectTeacher: getUnitBySubjectTeacher,
        getUnitBySubjectTeacherDs: getUnitBySubjectTeacherDs,
        getTopicBySubjectPeriodTeacherUnit: getTopicBySubjectPeriodTeacherUnit,
        getTopicBySubjectPeriodTeacherUnitDs: getTopicBySubjectPeriodTeacherUnitDs,
        getTopicBySubjectTeacherUnit: getTopicBySubjectTeacherUnit,
        getTopicBySubjectTeacherUnitDs: getTopicBySubjectTeacherUnitDs,

        getTeacherBySubjectWithPeriod: getTeacherBySubjectWithPeriod,
        getTeacherBySubjectWithPeriodDs: getTeacherBySubjectWithPeriodDs,


        getZeroVdoDataDs: getZeroVdoDataDs,

        getEightyPercentDs: getEightyPercentDs,
        getEightyPercent: getEightyPercent,
        getDataForChart: getDataForChart

    });
});