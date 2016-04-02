/**
 * Created by Aem on 11/17/2015 AD.
 */
"use strict";

app.factory("utilityService", function($http, $q) {
    function convertDateTimeToDateString(dateTimeData) {
        var date = dateTimeData.getDate();
        var month = dateTimeData.getMonth() + 1;
        var year = dateTimeData.getFullYear();

        return month + "/" + date + "/" + year;
    }

    function convertDateTimeToTimeString(dateTimeData) {
        var hours = dateTimeData.getHours();
        var minutes = dateTimeData.getMinutes();
        var seconds = dateTimeData.getSeconds();
        var milliseconds = dateTimeData.getMilliseconds();

        return hours + ":" + minutes + ":" + seconds;
    }

    return ({
        convertDateTimeToDateString: convertDateTimeToDateString,
        convertDateTimeToTimeString: convertDateTimeToTimeString
    });
});