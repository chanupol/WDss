/**
 * Created by suphachaibootprom on 6/3/2016 AD.
 */

"use strict";


app.factory("commonModalService", function($http, $q) {

    function getModalNormal(templateUrl, controller){
        var modal = {
            animation: true,
            templateUrl: templateUrl,
            controller: controller,
            size: "lg",
            backdrop: "static"
        };
        return modal;
    }

    function getModalNormalWithResolve(templateUrl, controller, modalParam){
        var modal = {
            animation: true,
            templateUrl: templateUrl,
            controller: controller,
            size: "lg",
            backdrop: "static",
            resolve: modalParam
        };
        return modal;
    }


    return ({
        getModalNormal: getModalNormal,
        getModalNormalWithResolve: getModalNormalWithResolve

    });

    //--------------------------------------------------
    //
    //Private Function
    //
    //--------------------------------------------------


});