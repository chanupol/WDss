/**
 * Created by chanupolphermpoon on 4/4/2016 AD.
 */
"use strict";

app.factory("teacherService", function ($http, $q, handlerService) {

    var uriCyberUTeacgerData = urlPath + "get/cyberu/teacherdata/";

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

    function getTeacherFromCyberU() {
        var request = $http.get(uriCyberUTeacgerData );
        return (request.then(handlerService.handlerSuccess, handlerService.handlerError));
    }


    //--------------------------------------------------------------------------------
    //
    // Add data
    //
    //--------------------------------------------------------------------------------

    return ({

        getTeacherFromCyberU: getTeacherFromCyberU,


    });

});