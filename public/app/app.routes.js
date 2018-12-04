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
    $routeProvider.when("/main", {
        controller: "mainController",
        templateUrl: "app/components/main/main.html"
    });
    $routeProvider.when("/login", {
        controller: "loginController",
        templateUrl: "app/components/security/login.html"
    });

    //==================================================
    //
    //  Admin Page
    //
    //==================================================
    $routeProvider.when("/" + routeAdmin, {
        controller: "userController",
        templateUrl: "app/components/admin/user.html"
    });

    //==================================================
    //  Admin Page
    //      - Another Teacher Faculty Page
    //
    //==================================================
    $routeProvider.when("/" + routeAdmin + "/teacher/another/faculty/list", {
        controller: "anotherTeacherFacultyController",
        templateUrl: "app/components/admin/anothertchfac.html"
    });

    $routeProvider.when("/" + routeAdmin + "/teacher/another/faculty/create", {
        controller: "anotherTeacherFacultyController",
        templateUrl: "app/components/admin/anothertchfacedit.html"
    });

    $routeProvider.when("/" + routeAdmin + "/teacher/another/faculty/update/:tchCode/:subjectCode/:facultyName", {
        controller: "anotherTeacherFacultyController",
        templateUrl: "app/components/admin/anothertchfacedit.html"
    });

    $routeProvider.when("/" + routeAdmin + "/subject/graph/:tchCode/:tchFullName", {
        controller: "graphReportPercentOfSubjectController",
        templateUrl: "app/components/report/graph.html"
    });

    $routeProvider.when("/" + routeAdmin + "/subject/graphadmin", {
        controller: "graphReportPercentOfSubjectForAdminController",
        templateUrl: "app/components/report/chooseTeacherForGraph.html"
    });

    //------ student

    $routeProvider.when("/" + routeAdmin + "/student/graphstudent", {
        controller: "graphStudentController",
        templateUrl: "app/components/student/graphStudent.html"
    });

    $routeProvider.when("/" + routeAdmin + "/student/graphstudentgroupbygraduate", {
        controller: "graphStudentGroupByGraduateController",
        templateUrl: "app/components/student/graphStudentgroupbygraduate.html"
    });


    $routeProvider.when("/" + routeAdmin + "/student/graphstudentcomparegroupbydivision", {
        controller: "graphStudentCompareGroupByDivisionController",
        templateUrl: "app/components/student/graphStudentgroupbycomparedivision.html"
    });


    //------ teacher
    $routeProvider.when("/" + routeAdmin + "/teacher/graphteacher", {
        controller: "graphTeacherController",
        templateUrl: "app/components/teacher/graphTeacher.html"
    });


    //==================================================
    //
    //  Report Page
    //
    //==================================================
    $routeProvider.when("/notauth", {
        controller: "notauthController",
        templateUrl: "app/components/notauth/notauth.html"
    });

    $routeProvider.when("/import", {
        //controller: "videolengthController",
        templateUrl: "app/components/import/import.html"
    });

    $routeProvider.when("/import/report/subject", {
        //controller: "reportSubjectController",
        templateUrl: "app/components/report/subjectlist.html"
    });

    $routeProvider.when("/import/report/subject/teacher/:subjectCode/:periodCode", {
        controller: "reportTeacherBySubjectPeriodController",
        templateUrl: "app/components/report/teacherbysubjectperiod.html"
    });


    $routeProvider.when("/import/report/subject/list/teacher/:subjectCode", {
        controller: "reportTeacherBySubjectAPeriodController",
        templateUrl: "app/components/report/teacherbysubject.html"
    });


    $routeProvider.when("/import/report/subject/list/teacher/period/:subjectCode/:periodCode", {
        controller: "reportTeacherBySubjectAPeriodController",
        templateUrl: "app/components/report/teacherbysubject.html"
    });


    $routeProvider.when("/import/report/subject/unit/:subjectCode/:periodCode/:tchCode", {
        controller: "reportUnitBySubjectPeriodTchCodeController",
        templateUrl: "app/components/report/unit.html"
    });

    $routeProvider.when("/import/report/subject/list/unit/:subjectCode/:tchCode", {
        controller: "reportUnitBySubjectTchCodeController",
        templateUrl: "app/components/report/unit.html"
    });

    $routeProvider.when("/import/report/subject/topic/:subjectCode/:periodCode/:tchCode/:unitId", {
        controller: "reportTopicBySubjectPeriodTchCodeUnitController",
        templateUrl: "app/components/report/topic.html"
    });

    $routeProvider.when("/import/report/subject/list/topic/:subjectCode/:tchCode/:unitId", {
        controller: "reportTopicBySubjectTchCodeUnitController",
        templateUrl: "app/components/report/topic.html"
    });


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
    $routeProvider.otherwise({redirectTo: "/login"});
    //$routeProvider.otherwise({redirectTo: "/import/report/subject"});
});