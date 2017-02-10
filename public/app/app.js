/**
 * Created by Aem on 2/8/2016 AD.
 */
var app = angular.module("WesternDss", ["ngRoute", "ngTouch", "kendo.directives", "ui.bootstrap", "LocalStorageModule"]);

app.config(function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('WTUDSS');
    localStorageServiceProvider.setStorageType('sessionStorage');
});

//--------------------------------------------------------------------------------
//
// Global Variable
//
//--------------------------------------------------------------------------------

/*var urlPath = "http://113.53.249.28:8000/api/";
var cyberuApiPath ="http://western-cyberu.net:81/api/";

var serverUrl = "http://113.53.249.28:8000";
var serverApiUrl = serverUrl + "/api/";*/


var urlPath = "http://0.0.0.0:8000/api/";
var cyberuApiPath ="http://western-cyberu.net:81/api/";

var serverUrl = "http://0.0.0.0:8000";
var serverApiUrl = serverUrl + "/api/";


var cyberUUrl = "http://27.254.43.145:8008";
var cyberUApiUrl = cyberUUrl + "/api/"