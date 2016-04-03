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
        //controller: "reportSubjectController",
        templateUrl: "app/components/report/subjectlist.html"
    });

    $routeProvider.when("/video/report/subject/teacher/:subjectCode/:periodCode", {
        controller: "reportTeacherBySubjectPeriodController",
        templateUrl: "app/components/report/teacherbysubject.html"
    });

    $routeProvider.when("/video/report/subject/unit/:subjectCode/:periodCode/:tchCode", {
        controller: "reportUnitBySubjectPeriodTchCodeController",
        templateUrl: "app/components/report/unit.html"
    });

    $routeProvider.when("/video/report/subject/topic/:subjectCode/:periodCode/:tchCode/:unitId", {
        controller: "reportTopicBySubjectPeriodTchCodeUnitController",
        templateUrl: "app/components/report/topic.html"
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