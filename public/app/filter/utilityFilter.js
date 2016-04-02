/**
 * Created by Aem on 3/22/2016 AD.
 */
"use strict";

app.filter('sumIfByProperty', function () {
    return function (data, conditionProperty, conditionValue, sumProperty) {
        if (typeof (data) === 'undefined' || typeof (conditionProperty) === 'undefined' || typeof (conditionValue) === 'undefined' || typeof (sumProperty) === 'undefined') {
            return 0;
        }

        var sum = 0;

        var resultData = data.filter(function (obj) {
            return obj[conditionProperty] == conditionValue && typeof (obj[sumProperty]) !== 'undefined' && obj[sumProperty] != null;
        });

        for (var i = 0; i < resultData.length; i++) {
            sum = sum + parseInt(resultData[i][sumProperty]);
        }

        return sum;
    }
});

app.filter('avgIfByProperty', function () {
    return function (data, conditionProperty, conditionValue, avgProperty) {
        if (typeof (data) === 'undefined' || typeof (conditionProperty) === 'undefined' || typeof (conditionValue) === 'undefined' || typeof (avgProperty) === 'undefined') {
            return 0;
        }

        var sum = 0;

        var resultData = data.filter(function (obj) {
            return obj[conditionProperty] == conditionValue && typeof (obj[avgProperty]) !== 'undefined' && obj[avgProperty] != null;
        });

        for (var i = 0; i < resultData.length; i++) {
            sum = sum + parseInt(resultData[i][avgProperty]);
        }

        return sum / resultData.length;
    }
});