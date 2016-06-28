/**
 * Created by chanupolphermpoon on 6/24/2016 AD.
 */

'use strict';

app.factory('anotherTeacherFacultyService', function ($http, $q, handlerService) {

    var uri = serverApiUrl + "anotherteacherfaculty";

    function getAnotherTeacherFacultyList() {
        var request = $http.get(uri + "/list");
        return (request.then(handlerService.handlerSuccess, handlerService.handlerError));
    };

    function getAnotherTeacherFacultyListDs() {

        return new kendo.data.DataSource({
            batch: true,
            transport: {
                read: {
                    url: uri + "/list",
                    dataType: "json"
                }
            },
            pageSize: 20,
            schema: {
                model: {
                    id: "TCHCODE",
                    fields: {
                        TCHCODE: {type: "string"},
                        TCHNAME: {type: "string"},
                        SUBJECTCODE: {type: "string"},
                        SUBJECTNAME: {type: "string"},
                        FACULTYNAME: {type: "string"},
                        STATUS: {type: "string"}
                    }
                }
            }
        });
    };


    //--------------------------------------------------------------------------------
    //
    // Add data
    //
    //--------------------------------------------------------------------------------

    function addAnotherTeacherFaculty(objAnotherTchFac) {
        var request = $http.post(uri + "/new", objAnotherTchFac);
        return (request.then(handlerService.handlerSuccess, handlerService.handlerError));
    }


    return ({
        getAnotherTeacherFacultyList: getAnotherTeacherFacultyList,
        getAnotherTeacherFacultyListDs: getAnotherTeacherFacultyListDs,
        addAnotherTeacherFaculty: addAnotherTeacherFaculty
    });

});