/**
 * Created by Aem on 2/8/2016 AD.
 */
"use strict";

app.directive("onFinishRender", function($timeout) {
    return {
        restrict: "A",
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit(attr.broadcasteventname ? attr.broadcasteventname : "ngRepeatFinished");
                });
            }
        }
    }
});