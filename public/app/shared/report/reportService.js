/**
 * Created by chanupolphermpoon on 4/1/2016 AD.
 */

"use strict";

app.factory("reportService", function ($http, $q, handlerService) {
    var uri = serverApiUrl + "report";

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


    function getSubjectAll() {
        var request = $http.get(uri + "/subject/list");
        return (request.then(handlerService.handlerSuccess, handlerService.handlerError));
    }

    function getSubjectAllDs() {
        return new kendo.data.DataSource({
            batch: true,
            transport: {
                read: {
                    url: uri + "/subject/list",
                    dataType: "json"
                }
            },
            pageSize: 20,
            schema: {
                model: {
                    id: "PERIODCODE",
                    fields: {
                        FACULTYNAME: {type: "string"},
                        PERIODCODE: {type: "string"},
                        SUBJECTCODE: {type: "string"},
                        SUBJECTNAME: {type: "string"},
                        IMPORTDATE: {type: "string"},
                        Percentage: {type: "number"}
                    }
                }
            }
        });
    }

    function getPeriod() {
        var request = $http.get(uri + "/subject/period/list");
        return (request.then(handlerService.handlerSuccess, handlerService.handlerError));
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
            pageSize: 20,
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
    // Add data
    //
    //--------------------------------------------------------------------------------

    return ({
        getSubjectAll: getSubjectAll,
        getSubjectAllDs: getSubjectAllDs,
        getPeriod:getPeriod,
        getPeriodDs:getPeriodDs
    });
});