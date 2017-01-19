/**
 * Created by suphachaibootprom on 1/18/2017 AD.
 */

"use strict";

app.factory("graphService", function ($http, $q, $rootScope, localStorageService, handlerService) {
    var uri = serverApiUrl + "graph";
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

    function getTeacher(roleId, userName) {
        var request = $http.get(uri + "/tch/list/" + roleId + "/" + userName);
        return (request.then(handlerService.handlerSuccess, handlerService.handlerError));
    }

    function getSubjectInTeacherWithPeriod(tchCode, periodCode) {
        var request = $http.get(uri + "/tch/subjects/list/" + tchCode + "/" + periodCode);
        return (request.then(handlerService.handlerSuccess, handlerService.handlerError));
    }

    function getGraphDataInClassPercentage(tchCode, periodCode, subjectCode) {
        var request = $http.get(uri + "/tch/period/subjects/list/" + tchCode + "/" + periodCode + "/" + subjectCode);
        return (request.then(handlerService.handlerSuccess, handlerService.handlerError));
    }

    function getGraphDataPretestPosttest(tchCode, periodCode, subjectCode) {
        var request = $http.get(uri + "/tch/period/pretestposttest/list/" + tchCode + "/" + periodCode + "/" + subjectCode);
        return (request.then(handlerService.handlerSuccess, handlerService.handlerError));
    }

    function getTeacherDs(roleId, userName) {
        return new kendo.data.DataSource({
            batch: true,
            transport: {
                read: {
                    url: uri + "/tch/list/" + roleId + "/" + userName,
                    dataType: "json"
                }
            },
            pageSize: 1000,
            schema: {
                model: {
                    id: "TCHCODE",
                    fields: {
                        TCHCODE: {type: "string"}
                    }
                }
            }
        });
    }

    function getSubjectInTeacherWithPeriodDs(tchCode, periodCode) {
        return new kendo.data.DataSource({
            batch: true,
            transport: {
                read: {
                    url: uri + "/tch/subjects/list/" + tchCode + "/" + periodCode,
                    dataType: "json"
                }
            },
            pageSize: 1000,
            schema: {
                model: {
                    id: "TCHCODE",
                    fields: {
                        TCHCODE: {type: "string"}
                    }
                }
            }
        });
    }


    //--------------------------------------------------------------------------------
    //
    // Add data
    //
    //--------------------------------------------------------------------------------

    return ({
        getTeacher: getTeacher,
        getTeacherDs: getTeacherDs,
        getSubjectInTeacherWithPeriod: getSubjectInTeacherWithPeriod,
        getSubjectInTeacherWithPeriodDs: getSubjectInTeacherWithPeriodDs,
        getGraphDataInClassPercentage: getGraphDataInClassPercentage,
        getGraphDataPretestPosttest: getGraphDataPretestPosttest

    });
});