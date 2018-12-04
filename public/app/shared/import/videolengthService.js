/**
 * Created by chanupolphermpoon on 3/28/2016 AD.
 */
"use strict";

app.factory("videolengthService", function ($http, $q, handlerService) {

    var uriCyberUVdoData = urlPath + "get/cyberu/videodata/";
    var uriCyberUPeriodConfig = urlPath+"get/cyberu/periodconfig";
    var uri = urlPath + "video";


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

    /*function getVideoFromCyberU() {
        var request = $http.get(uriCyberU);
        return (request.then(handlerService.handlerSuccess, handlerService.handlerError));
    }*/

    function getVideoFromCyberU(importDate) {
        //var request = $http.get(uriCyberUVdoData+importDate);
        var request = $http.get(urlPath + "get/cyberu/videodata");
        return (request.then(handlerService.handlerSuccess, handlerService.handlerError));
    }

    function getPeriodCinfigFromCyberU() {
        var request = $http.get(uriCyberUPeriodConfig);
        return (request.then(handlerService.handlerSuccess, handlerService.handlerError));
    }

    function importVideoFromCyberU(vdoLengthData) {

        var request = $http.post(uri + "/import/new", vdoLengthData);
        return (request.then(handlerService.handlerSuccess, handlerService.handlerError));
    }

    //--------------------------------------------------------------------------------
    //
    // Add data
    //
    //--------------------------------------------------------------------------------

    return ({

        getVideoFromCyberU: getVideoFromCyberU,
        getPeriodCinfigFromCyberU:getPeriodCinfigFromCyberU,
        importVideoFromCyberU: importVideoFromCyberU

    });

});
