/**
 * Created by Aem on 3/12/2016 AD.
 */
"use strict";

app.factory("handlerService", function($http, $q, $location) {
    //--------------------------------------------------------------------------------
    //
    // Handler
    //
    //--------------------------------------------------------------------------------

    //
    // Error Handler
    function handlerError(response) {
        if (!angular.isObject(response.data) || !response.data.error) {
            var error = {
                statusCode: 520,
                error: "Unknown Error",
                message: "An unknown error occurred."
            };

            return ($q.reject(error));
        }

        if (response.data.message == undefined || response.data.message == null) {
            response.data.message = response.data.error;
        }

        return ($q.reject(response.data));
    }

    //
    // Success Handler
    function handlerSuccess(response) {
        return (response.data);
    }

    return ({
        handlerError: handlerError,
        handlerSuccess: handlerSuccess
    });
});