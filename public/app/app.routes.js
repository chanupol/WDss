/**
 * Created by Aem on 2/8/2016 AD.
 */

var routeAdmin = "admin";

app.config(function ($routeProvider) {
    //==================================================
    //
    //  System Page
    //
    //==================================================
   /* $routeProvider.when("/login", {
        controller: "loginController",
        templateUrl: "app/components/security/login.html"
    });*/

    $routeProvider.when("/video/report", {
        controller: "videolengthController",
        templateUrl: "app/components/video/list.html"
    });

    $routeProvider.when("/video/report/subject", {
        controller: "reportSubjectController",
        templateUrl: "app/components/report/subjectlist.html"
    });

    //==================================================
    //
    //  Admin Page
    //
    //==================================================


    //==================================================
    //
    //  Command Page
    //
    //==================================================


    //==================================================
    //
    //  Default Page
    //
    //==================================================
    $routeProvider.otherwise({redirectTo: "/video/report/subject"});
});