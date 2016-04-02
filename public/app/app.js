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
var urlPath = "http://localhost:8009/api/";
var cyberuApiPath ="http://western-cyberu.net:81/api/";

var serverUrl = "http://localhost:8009";
var serverApiUrl = serverUrl + "/api/";