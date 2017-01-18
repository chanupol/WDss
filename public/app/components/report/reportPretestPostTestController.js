/**
 * Created by suphachaibootprom on 1/17/2017 AD.
 */
//----------------------------------------
//
// Graph Report Percent Of Subject
//
//----------------------------------------
app.controller('reportPretestPostTestForAdminController', function ($scope, $routeParams, $location, reportService, localStorageService) {

    $scope.roleId = localStorageService.get("RoleId");
    //------------------------------------------------
    //
    // KendoUi Configurations
    //
    //------------------------------------------------

    $scope.$on('$viewContentLoaded', function (event) {

        //if role is Admin or คณะบดี
        if($scope.roleId == "1" || $scope.roleId == "5"){
            $scope.genGrdTeacher();
        }else{
            //
            //redirect to graph page
            // $location.path('/subject/graph/' + $scope.getTchCode());

        }
    });

    $scope.$on('$destroy', function () {

    });

    //------------------------------------------------
    //
    // Page Function
    //
    //------------------------------------------------

    //------------------------------------------------
    //
    // Private Function
    //
    //------------------------------------------------

    $scope.genGrdTeacher = function () {

        $scope.grdTeacherOptions = {
            //dataSource: reportService.getTeacherBySubjectDs($routeParams.subjectCode),
            // dataSource: reportService.getTeacherBySubjectWithPeriodDs($routeParams.subjectCode, $routeParams.periodCode),
            dataSource: reportService.getTeacherBySubjectWithPeriodDs("PH2108", "2%2F58"),
            height: 500,
            sortable: true,
            scrollable: true,
            resizable: true,
            filterable: {
                extra: false,
                operators: {
                    string: {
                        startswith: "Starts with",
                        contains: "contains"
                    }
                }
            },
            pageable: {
                buttonCount: 5,
                refresh: true,
                messages: {
                    morePages: "More pages"
                }
            },
            columns: [
                {
                    field: "FACULTYNAME",
                    title: "คณะ",
                    width: 250,
                    headerAttributes: {style: "text-align:center"},
                    attributes: {"class": "text-center"}
                },
                {
                    field: "TCHCODE",
                    title: "รหัสอาจารย์ผู้สอน",
                    width: 255,
                    headerAttributes: {style: "text-align:center"},
                    attributes: {"class": "text-center"},
                    template: "<a href='\\#/admin/subject/pretestposttest/#=TCHCODE#/#=TCHNAME#'> #=TCHCODE#</a>"
                },
                {
                    field: "TCHNAME",
                    title: "ชื่ออาจารย์ผู้สอน",
                    width: 255,
                    headerAttributes: {style: "text-align:center"},
                    attributes: {"class": "text-center"},
                    template: "<a href='\\#/admin/subject/pretestposttest/#=TCHCODE#/#=TCHNAME#'> #=TCHNAME#</a>"
                },
                {
                    field: "DEGREENAME",
                    title: "ระดับ",
                    width: 120,
                    headerAttributes: {style: "text-align:center"},
                    attributes: {"class": "text-center"}
                }
            ]
        };

    };

    $scope.getTchCode = function () {
        return localStorageService.get("UserName");
    };

});

app.controller('reportPretestPostTestController', function ($scope, $routeParams, $location, reportService, localStorageService) {

    $scope.dataArr = [];
    $scope.periodCode = "";
    $scope.tchCode = $routeParams.tchCode;
    $scope.roleId = localStorageService.get("RoleId");

    //if role is 5=Admin or 1=คณะบดี
    if($scope.roleId === 1 || $scope.roleId === 5){
        $scope.isAdmin = true;
        $scope.tchName = $routeParams.tchFullName;
    }else{
        //
        //hide link
        $scope.isAdmin = false;
        $scope.tchName = localStorageService.get("tchFullName");
    }

    $scope.tempData1 = [
        {
            "CountZeroScore": 0,
            "CountFiftyPercent": 10,
            "CountEightyPercent": 2,
            "Count100Percent": 0,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH2108",
            "UnitID": 1,
            "ExpectScore": 20,
            "tmpSubjectUnitPre": "PH210812/58",
            "LearnTypeCode": "Pre-Test",
            "IsDone": "Done"
        },
        {
            "CountZeroScore": 4,
            "CountFiftyPercent": 0,
            "CountEightyPercent": 0,
            "Count100Percent": 0,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH2108",
            "UnitID": 1,
            "ExpectScore": 20,
            "tmpSubjectUnitPre": "PH210812/58",
            "LearnTypeCode": "Pre-Test",
            "IsDone": "Not Done"
        },
        {
            "CountZeroScore": 0,
            "CountFiftyPercent": 6,
            "CountEightyPercent": 2,
            "Count100Percent": 0,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH2108",
            "UnitID": 1,
            "ExpectScore": 20,
            "tmpSubjectUnitPre": "PH210812/58",
            "LearnTypeCode": "Post-Test",
            "IsDone": "Done"
        },
        {
            "CountZeroScore": 0,
            "CountFiftyPercent": 4,
            "CountEightyPercent": 3,
            "Count100Percent": 1,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH2108",
            "UnitID": 2,
            "ExpectScore": 20,
            "tmpSubjectUnitPre": "PH210822/58",
            "LearnTypeCode": "Post-Test",
            "IsDone": "Done"
        },
        {
            "CountZeroScore": 0,
            "CountFiftyPercent": 6,
            "CountEightyPercent": 3,
            "Count100Percent": 0,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH2108",
            "UnitID": 2,
            "ExpectScore": 20,
            "tmpSubjectUnitPre": "PH210822/58",
            "LearnTypeCode": "Pre-Test",
            "IsDone": "Done"
        },
        {
            "CountZeroScore": 0,
            "CountFiftyPercent": 6,
            "CountEightyPercent": 1,
            "Count100Percent": 0,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH2108",
            "UnitID": 3,
            "ExpectScore": 20,
            "tmpSubjectUnitPre": "PH210832/58",
            "LearnTypeCode": "Post-Test",
            "IsDone": "Done"
        },
        {
            "CountZeroScore": 1,
            "CountFiftyPercent": 0,
            "CountEightyPercent": 0,
            "Count100Percent": 0,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH2108",
            "UnitID": 3,
            "ExpectScore": 20,
            "tmpSubjectUnitPre": "PH210832/58",
            "LearnTypeCode": "Post-Test",
            "IsDone": "Not Done"
        },
        {
            "CountZeroScore": 0,
            "CountFiftyPercent": 6,
            "CountEightyPercent": 2,
            "Count100Percent": 1,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH2108",
            "UnitID": 3,
            "ExpectScore": 20,
            "tmpSubjectUnitPre": "PH210832/58",
            "LearnTypeCode": "Pre-Test",
            "IsDone": "Done"
        },
        {
            "CountZeroScore": 0,
            "CountFiftyPercent": 5,
            "CountEightyPercent": 3,
            "Count100Percent": 0,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH2108",
            "UnitID": 4,
            "ExpectScore": 20,
            "tmpSubjectUnitPre": "PH210842/58",
            "LearnTypeCode": "Post-Test",
            "IsDone": "Done"
        },
        {
            "CountZeroScore": 0,
            "CountFiftyPercent": 6,
            "CountEightyPercent": 2,
            "Count100Percent": 1,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH2108",
            "UnitID": 4,
            "ExpectScore": 20,
            "tmpSubjectUnitPre": "PH210842/58",
            "LearnTypeCode": "Pre-Test",
            "IsDone": "Done"
        },
        {
            "CountZeroScore": 0,
            "CountFiftyPercent": 7,
            "CountEightyPercent": 2,
            "Count100Percent": 0,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH2108",
            "UnitID": 5,
            "ExpectScore": 20,
            "tmpSubjectUnitPre": "PH210852/58",
            "LearnTypeCode": "Pre-Test",
            "IsDone": "Done"
        },
        {
            "CountZeroScore": 0,
            "CountFiftyPercent": 7,
            "CountEightyPercent": 1,
            "Count100Percent": 0,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH2108",
            "UnitID": 5,
            "ExpectScore": 20,
            "tmpSubjectUnitPre": "PH210852/58",
            "LearnTypeCode": "Post-Test",
            "IsDone": "Done"
        },
        {
            "CountZeroScore": 0,
            "CountFiftyPercent": 8,
            "CountEightyPercent": 0,
            "Count100Percent": 0,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH2108",
            "UnitID": 6,
            "ExpectScore": 20,
            "tmpSubjectUnitPre": "PH210862/58",
            "LearnTypeCode": "Pre-Test",
            "IsDone": "Done"
        },
        {
            "CountZeroScore": 0,
            "CountFiftyPercent": 5,
            "CountEightyPercent": 1,
            "Count100Percent": 0,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH2108",
            "UnitID": 6,
            "ExpectScore": 20,
            "tmpSubjectUnitPre": "PH210862/58",
            "LearnTypeCode": "Post-Test",
            "IsDone": "Done"
        },
        {
            "CountZeroScore": 0,
            "CountFiftyPercent": 6,
            "CountEightyPercent": 2,
            "Count100Percent": 0,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH2108",
            "UnitID": 7,
            "ExpectScore": 20,
            "tmpSubjectUnitPre": "PH210872/58",
            "LearnTypeCode": "Pre-Test",
            "IsDone": "Done"
        },
        {
            "CountZeroScore": 0,
            "CountFiftyPercent": 5,
            "CountEightyPercent": 1,
            "Count100Percent": 0,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH2108",
            "UnitID": 7,
            "ExpectScore": 20,
            "tmpSubjectUnitPre": "PH210872/58",
            "LearnTypeCode": "Post-Test",
            "IsDone": "Done"
        },
        {
            "CountZeroScore": 0,
            "CountFiftyPercent": 6,
            "CountEightyPercent": 1,
            "Count100Percent": 0,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH2108",
            "UnitID": 8,
            "ExpectScore": 20,
            "tmpSubjectUnitPre": "PH210882/58",
            "LearnTypeCode": "Pre-Test",
            "IsDone": "Done"
        },
        {
            "CountZeroScore": 0,
            "CountFiftyPercent": 4,
            "CountEightyPercent": 1,
            "Count100Percent": 0,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH2108",
            "UnitID": 8,
            "ExpectScore": 20,
            "tmpSubjectUnitPre": "PH210882/58",
            "LearnTypeCode": "Post-Test",
            "IsDone": "Done"
        },
        {
            "CountZeroScore": 0,
            "CountFiftyPercent": 5,
            "CountEightyPercent": 1,
            "Count100Percent": 0,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH2108",
            "UnitID": 9,
            "ExpectScore": 20,
            "tmpSubjectUnitPre": "PH210892/58",
            "LearnTypeCode": "Pre-Test",
            "IsDone": "Done"
        },
        {
            "CountZeroScore": 0,
            "CountFiftyPercent": 4,
            "CountEightyPercent": 1,
            "Count100Percent": 0,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH2108",
            "UnitID": 9,
            "ExpectScore": 20,
            "tmpSubjectUnitPre": "PH210892/58",
            "LearnTypeCode": "Post-Test",
            "IsDone": "Done"
        },
        {
            "CountZeroScore": 0,
            "CountFiftyPercent": 6,
            "CountEightyPercent": 0,
            "Count100Percent": 0,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH2108",
            "UnitID": 10,
            "ExpectScore": 20,
            "tmpSubjectUnitPre": "PH2108102/58",
            "LearnTypeCode": "Pre-Test",
            "IsDone": "Done"
        },
        {
            "CountZeroScore": 0,
            "CountFiftyPercent": 3,
            "CountEightyPercent": 0,
            "Count100Percent": 2,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH2108",
            "UnitID": 10,
            "ExpectScore": 20,
            "tmpSubjectUnitPre": "PH2108102/58",
            "LearnTypeCode": "Post-Test",
            "IsDone": "Done"
        },
        {
            "CountZeroScore": 0,
            "CountFiftyPercent": 4,
            "CountEightyPercent": 2,
            "Count100Percent": 0,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH2108",
            "UnitID": 11,
            "ExpectScore": 20,
            "tmpSubjectUnitPre": "PH2108112/58",
            "LearnTypeCode": "Pre-Test",
            "IsDone": "Done"
        },
        {
            "CountZeroScore": 0,
            "CountFiftyPercent": 3,
            "CountEightyPercent": 2,
            "Count100Percent": 0,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH2108",
            "UnitID": 11,
            "ExpectScore": 20,
            "tmpSubjectUnitPre": "PH2108112/58",
            "LearnTypeCode": "Post-Test",
            "IsDone": "Done"
        },
        {
            "CountZeroScore": 0,
            "CountFiftyPercent": 5,
            "CountEightyPercent": 1,
            "Count100Percent": 0,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH2108",
            "UnitID": 12,
            "ExpectScore": 20,
            "tmpSubjectUnitPre": "PH2108122/58",
            "LearnTypeCode": "Pre-Test",
            "IsDone": "Done"
        },
        {
            "CountZeroScore": 0,
            "CountFiftyPercent": 4,
            "CountEightyPercent": 1,
            "Count100Percent": 0,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH2108",
            "UnitID": 12,
            "ExpectScore": 20,
            "tmpSubjectUnitPre": "PH2108122/58",
            "LearnTypeCode": "Post-Test",
            "IsDone": "Done"
        },
        {
            "CountZeroScore": 0,
            "CountFiftyPercent": 4,
            "CountEightyPercent": 1,
            "Count100Percent": 0,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH2108",
            "UnitID": 13,
            "ExpectScore": 20,
            "tmpSubjectUnitPre": "PH2108132/58",
            "LearnTypeCode": "Pre-Test",
            "IsDone": "Done"
        },
        {
            "CountZeroScore": 0,
            "CountFiftyPercent": 4,
            "CountEightyPercent": 1,
            "Count100Percent": 0,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH2108",
            "UnitID": 13,
            "ExpectScore": 20,
            "tmpSubjectUnitPre": "PH2108132/58",
            "LearnTypeCode": "Post-Test",
            "IsDone": "Done"
        },
        {
            "CountZeroScore": 0,
            "CountFiftyPercent": 5,
            "CountEightyPercent": 0,
            "Count100Percent": 0,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH2108",
            "UnitID": 14,
            "ExpectScore": 20,
            "tmpSubjectUnitPre": "PH2108142/58",
            "LearnTypeCode": "Pre-Test",
            "IsDone": "Done"
        },
        {
            "CountZeroScore": 1,
            "CountFiftyPercent": 0,
            "CountEightyPercent": 0,
            "Count100Percent": 0,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH2108",
            "UnitID": 14,
            "ExpectScore": 20,
            "tmpSubjectUnitPre": "PH2108142/58",
            "LearnTypeCode": "Pre-Test",
            "IsDone": "Not Done"
        },
        {
            "CountZeroScore": 0,
            "CountFiftyPercent": 4,
            "CountEightyPercent": 1,
            "Count100Percent": 0,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH2108",
            "UnitID": 14,
            "ExpectScore": 20,
            "tmpSubjectUnitPre": "PH2108142/58",
            "LearnTypeCode": "Post-Test",
            "IsDone": "Done"
        },
        {
            "CountZeroScore": 1,
            "CountFiftyPercent": 0,
            "CountEightyPercent": 0,
            "Count100Percent": 0,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH2108",
            "UnitID": 15,
            "ExpectScore": 20,
            "tmpSubjectUnitPre": "PH2108152/58",
            "LearnTypeCode": "Pre-Test",
            "IsDone": "Not Done"
        },
        {
            "CountZeroScore": 0,
            "CountFiftyPercent": 4,
            "CountEightyPercent": 1,
            "Count100Percent": 0,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH2108",
            "UnitID": 15,
            "ExpectScore": 20,
            "tmpSubjectUnitPre": "PH2108152/58",
            "LearnTypeCode": "Post-Test",
            "IsDone": "Done"
        },
        {
            "CountZeroScore": 0,
            "CountFiftyPercent": 6,
            "CountEightyPercent": 0,
            "Count100Percent": 0,
            "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH2108",
            "UnitID": 15,
            "ExpectScore": 20,
            "tmpSubjectUnitPre": "PH2108152/58",
            "LearnTypeCode": "Pre-Test",
            "IsDone": "Done"
        }
    ];

    $scope.tempData2 = [
        {
            "countZeroPercent": 1,
            "countFiftyPercent": 2,
            "countEightyPercent": 3,
            "count100Percent": 47,
            "Theacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3111",
            "UnitID": 1,
            "UnitName": "แนวคิดเกี่ยวกับการจัดการเชิงกลยุทธ์ในการพัฒนาระบบสุขภาพ",
            "tmpSubjectUnitPre": "PH311113/58"
        },
        {
            "countZeroPercent": 1,
            "countFiftyPercent": 2,
            "countEightyPercent": 1,
            "count100Percent": 45,
            "Theacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3111",
            "UnitID": 2,
            "UnitName": "กระบวนการจัดทำกลยุทธ์",
            "tmpSubjectUnitPre": "PH311123/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 2,
            "countEightyPercent": 1,
            "count100Percent": 44,
            "Theacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3111",
            "UnitID": 3,
            "UnitName": "หลักการและเทคนิคการวิเคราะห์เชิงกลยุทธ์",
            "tmpSubjectUnitPre": "PH311133/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 3,
            "countEightyPercent": 1,
            "count100Percent": 41,
            "Theacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3111",
            "UnitID": 4,
            "UnitName": "กระบวนการวางแผนกลยุทธ์ด้านสุขภาพ",
            "tmpSubjectUnitPre": "PH311143/58"
        },
        {
            "countZeroPercent": 2,
            "countFiftyPercent": 1,
            "countEightyPercent": 0,
            "count100Percent": 42,
            "Theacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3111",
            "UnitID": 5,
            "UnitName": "การนำกลยุทธ์ไปสู่การปฏิบัติ",
            "tmpSubjectUnitPre": "PH311153/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 0,
            "countEightyPercent": 0,
            "count100Percent": 42,
            "Theacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3111",
            "UnitID": 6,
            "UnitName": "การประเมินและควบคุมกลยุทธ์",
            "tmpSubjectUnitPre": "PH311163/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 1,
            "countEightyPercent": 0,
            "count100Percent": 41,
            "Theacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3111",
            "UnitID": 7,
            "UnitName": "การประสานงานกับประสิทธิภาพการบริหารงานในทางกลยุทธ์",
            "tmpSubjectUnitPre": "PH311173/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 0,
            "countEightyPercent": 1,
            "count100Percent": 41,
            "Theacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3111",
            "UnitID": 8,
            "UnitName": "การบริหารเชิงกลยุทธ์",
            "tmpSubjectUnitPre": "PH311183/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 1,
            "countEightyPercent": 1,
            "count100Percent": 40,
            "Theacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3111",
            "UnitID": 9,
            "UnitName": "แนวคิดเกี่ยวกับกระบวนทัศน์ในการพัฒนาระบบสุขภาพ",
            "tmpSubjectUnitPre": "PH311193/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 0,
            "countEightyPercent": 1,
            "count100Percent": 40,
            "Theacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3111",
            "UnitID": 10,
            "UnitName": "กลยุทธ์การสร้างองค์กรแห่งการเรียนรู้",
            "tmpSubjectUnitPre": "PH3111103/58"
        },
        {
            "countZeroPercent": 1,
            "countFiftyPercent": 0,
            "countEightyPercent": 0,
            "count100Percent": 41,
            "Theacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3111",
            "UnitID": 11,
            "UnitName": "กลยุทธ์การวิจัยและพัฒนา",
            "tmpSubjectUnitPre": "PH3111113/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 1,
            "countEightyPercent": 0,
            "count100Percent": 41,
            "Theacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3111",
            "UnitID": 12,
            "UnitName": "กลยุทธ์การนำเทคโนโลยีและพัฒนาเทคโนโลยีสารสนเทศมาใช้ในโรงพยาบาล",
            "tmpSubjectUnitPre": "PH3111123/58"
        },
        {
            "countZeroPercent": 1,
            "countFiftyPercent": 0,
            "countEightyPercent": 1,
            "count100Percent": 40,
            "Theacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3111",
            "UnitID": 13,
            "UnitName": "การจัดการเชิงกลยุทธ์โรงพยาบาลในประเทศและต่างประเทศ",
            "tmpSubjectUnitPre": "PH3111133/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 1,
            "countEightyPercent": 0,
            "count100Percent": 41,
            "Theacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3111",
            "UnitID": 14,
            "UnitName": "แนวโน้มการจัดการเชิงกลยุทธ์ในการพัฒนาสุขภาพในอนาคต",
            "tmpSubjectUnitPre": "PH3111143/58"
        },
        {
            "countZeroPercent": 1,
            "countFiftyPercent": 0,
            "countEightyPercent": 1,
            "count100Percent": 41,
            "Theacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3111",
            "UnitID": 15,
            "UnitName": "กลยุทธ์ทางการสาธารณสุข",
            "tmpSubjectUnitPre": "PH3111153/58"
        }
    ];

    $scope.tempData3 = [
        {
            "countZeroPercent": 3,
            "countFiftyPercent": 4,
            "countEightyPercent": 2,
            "count100Percent": 45,
            "Theacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3210",
            "UnitID": 1,
            "UnitName": "ความรู้เบื้องต้นเกี่ยวกับกฎหมาย",
            "tmpSubjectUnitPre": "PH321013/58"
        },
        {
            "countZeroPercent": 1,
            "countFiftyPercent": 7,
            "countEightyPercent": 2,
            "count100Percent": 44,
            "Theacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3210",
            "UnitID": 2,
            "UnitName": "กฎหมายเกี่ยวกับบุคลากรและสถานบริการสาธารณสุข",
            "tmpSubjectUnitPre": "PH321023/58"
        },
        {
            "countZeroPercent": 1,
            "countFiftyPercent": 4,
            "countEightyPercent": 2,
            "count100Percent": 43,
            "Theacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3210",
            "UnitID": 3,
            "UnitName": "กฎหมายเกี่ยวกับการสาธารณสุข การป้องกันและควบคุมโรค และคุ้มครองสุขภาพอนามัย",
            "tmpSubjectUnitPre": "PH321033/58"
        },
        {
            "countZeroPercent": 1,
            "countFiftyPercent": 3,
            "countEightyPercent": 0,
            "count100Percent": 43,
            "Theacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3210",
            "UnitID": 4,
            "UnitName": "กฎหมายเกี่ยวกับยา วัตถุออกฤทธิ์ต่อจิตประสาท ยาเสพติดให้โทษ และเครื่องมือแพทย์",
            "tmpSubjectUnitPre": "PH321043/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 3,
            "countEightyPercent": 0,
            "count100Percent": 42,
            "Theacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3210",
            "UnitID": 5,
            "UnitName": "กฎหมายเกี่ยวกับอาหาร เครื่องสำอางและวัตถุอันตราย",
            "tmpSubjectUnitPre": "PH321053/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 3,
            "countEightyPercent": 1,
            "count100Percent": 41,
            "Theacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3210",
            "UnitID": 6,
            "UnitName": "กฎหมายเกี่ยวกับอาชีวอนามัยและความปลอดภัย",
            "tmpSubjectUnitPre": "PH321063/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 4,
            "countEightyPercent": 1,
            "count100Percent": 39,
            "Theacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3210",
            "UnitID": 7,
            "UnitName": "กฎหมายเกี่ยวกับสิ่งแวดล้อม (๑)",
            "tmpSubjectUnitPre": "PH321073/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 3,
            "countEightyPercent": 1,
            "count100Percent": 38,
            "Theacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3210",
            "UnitID": 8,
            "UnitName": "กฎหมายเกี่ยวกับสิ่งแวดล้อม (๒)",
            "tmpSubjectUnitPre": "PH321083/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 3,
            "countEightyPercent": 0,
            "count100Percent": 38,
            "Theacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3210",
            "UnitID": 9,
            "UnitName": "ความรู้ทั่วไปเกี่ยวกับนิติเวชศาสตร์",
            "tmpSubjectUnitPre": "PH321093/58"
        },
        {
            "countZeroPercent": 1,
            "countFiftyPercent": 3,
            "countEightyPercent": 0,
            "count100Percent": 37,
            "Theacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3210",
            "UnitID": 10,
            "UnitName": "การตายและการเปลี่ยนแปลงหลังตาย",
            "tmpSubjectUnitPre": "PH3210103/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 1,
            "countEightyPercent": 0,
            "count100Percent": 37,
            "Theacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3210",
            "UnitID": 11,
            "UnitName": "การพิสูจน์บุคคล",
            "tmpSubjectUnitPre": "PH3210113/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 2,
            "countEightyPercent": 4,
            "count100Percent": 33,
            "Theacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3210",
            "UnitID": 12,
            "UnitName": "การพิสูจน์เหตุและพฤติกรรมการตาย",
            "tmpSubjectUnitPre": "PH3210123/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 1,
            "countEightyPercent": 0,
            "count100Percent": 36,
            "Theacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3210",
            "UnitID": 13,
            "UnitName": "การตรวจพิสูจน์อาชญากรรมทางเพศและอาชญากรรมต่อเด็ก",
            "tmpSubjectUnitPre": "PH3210133/58"
        },
        {
            "countZeroPercent": 0,
            "countFiftyPercent": 1,
            "countEightyPercent": 2,
            "count100Percent": 34,
            "Theacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3210",
            "UnitID": 14,
            "UnitName": "การเป็นพยานและการเขียนรายงานทางการแพทย์",
            "tmpSubjectUnitPre": "PH3210143/58"
        },
        {
            "countZeroPercent": 1,
            "countFiftyPercent": 2,
            "countEightyPercent": 0,
            "count100Percent": 36,
            "Theacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
            "SubjectCode": "PH3210",
            "UnitID": 15,
            "UnitName": "จริยธรรมในวิชาชีพ",
            "tmpSubjectUnitPre": "PH3210153/58"
        }

    ];

    $scope.tempDataPrePost4 = [
        [
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 6,
                "CountEightyPercent": 2,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 1,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH210812/58",
                "LearnTypeCode": "Post-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 4,
                "CountEightyPercent": 3,
                "Count100Percent": 1,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 2,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH210822/58",
                "LearnTypeCode": "Post-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 6,
                "CountEightyPercent": 1,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 3,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH210832/58",
                "LearnTypeCode": "Post-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 5,
                "CountEightyPercent": 3,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 4,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH210842/58",
                "LearnTypeCode": "Post-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 7,
                "CountEightyPercent": 1,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 5,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH210852/58",
                "LearnTypeCode": "Post-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 5,
                "CountEightyPercent": 1,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 6,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH210862/58",
                "LearnTypeCode": "Post-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 5,
                "CountEightyPercent": 1,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 7,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH210872/58",
                "LearnTypeCode": "Post-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 4,
                "CountEightyPercent": 1,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 8,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH210882/58",
                "LearnTypeCode": "Post-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 4,
                "CountEightyPercent": 1,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 9,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH210892/58",
                "LearnTypeCode": "Post-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 3,
                "CountEightyPercent": 0,
                "Count100Percent": 2,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 10,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH2108102/58",
                "LearnTypeCode": "Post-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 3,
                "CountEightyPercent": 2,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 11,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH2108112/58",
                "LearnTypeCode": "Post-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 4,
                "CountEightyPercent": 1,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 12,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH2108122/58",
                "LearnTypeCode": "Post-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 4,
                "CountEightyPercent": 1,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 13,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH2108132/58",
                "LearnTypeCode": "Post-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 4,
                "CountEightyPercent": 1,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 14,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH2108142/58",
                "LearnTypeCode": "Post-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 4,
                "CountEightyPercent": 1,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 15,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH2108152/58",
                "LearnTypeCode": "Post-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 1,
                "CountFiftyPercent": 0,
                "CountEightyPercent": 0,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 3,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH210832/58",
                "LearnTypeCode": "Post-Test",
                "IsDone": "Not Done"
            },
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 10,
                "CountEightyPercent": 2,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 1,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH210812/58",
                "LearnTypeCode": "Pre-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 6,
                "CountEightyPercent": 3,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 2,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH210822/58",
                "LearnTypeCode": "Pre-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 6,
                "CountEightyPercent": 2,
                "Count100Percent": 1,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 3,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH210832/58",
                "LearnTypeCode": "Pre-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 6,
                "CountEightyPercent": 2,
                "Count100Percent": 1,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 4,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH210842/58",
                "LearnTypeCode": "Pre-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 7,
                "CountEightyPercent": 2,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 5,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH210852/58",
                "LearnTypeCode": "Pre-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 8,
                "CountEightyPercent": 0,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 6,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH210862/58",
                "LearnTypeCode": "Pre-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 6,
                "CountEightyPercent": 2,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 7,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH210872/58",
                "LearnTypeCode": "Pre-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 6,
                "CountEightyPercent": 1,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 8,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH210882/58",
                "LearnTypeCode": "Pre-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 5,
                "CountEightyPercent": 1,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 9,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH210892/58",
                "LearnTypeCode": "Pre-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 6,
                "CountEightyPercent": 0,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 10,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH2108102/58",
                "LearnTypeCode": "Pre-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 4,
                "CountEightyPercent": 2,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 11,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH2108112/58",
                "LearnTypeCode": "Pre-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 5,
                "CountEightyPercent": 1,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 12,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH2108122/58",
                "LearnTypeCode": "Pre-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 4,
                "CountEightyPercent": 1,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 13,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH2108132/58",
                "LearnTypeCode": "Pre-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 5,
                "CountEightyPercent": 0,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 14,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH2108142/58",
                "LearnTypeCode": "Pre-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 0,
                "CountFiftyPercent": 6,
                "CountEightyPercent": 0,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 15,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH2108152/58",
                "LearnTypeCode": "Pre-Test",
                "IsDone": "Done"
            },
            {
                "CountZeroScore": 4,
                "CountFiftyPercent": 0,
                "CountEightyPercent": 0,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 1,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH210812/58",
                "LearnTypeCode": "Pre-Test",
                "IsDone": "Not Done"
            },
            {
                "CountZeroScore": 1,
                "CountFiftyPercent": 0,
                "CountEightyPercent": 0,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 14,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH2108142/58",
                "LearnTypeCode": "Pre-Test",
                "IsDone": "Not Done"
            },
            {
                "CountZeroScore": 1,
                "CountFiftyPercent": 0,
                "CountEightyPercent": 0,
                "Count100Percent": 0,
                "Teacher": "5589000022 อาจารย์ กิตติศักดิ์ หลวงพันเทา",
                "SubjectCode": "PH2108",
                "UnitID": 15,
                "ExpectScore": 20,
                "tmpSubjectUnitPre": "PH2108152/58",
                "LearnTypeCode": "Pre-Test",
                "IsDone": "Not Done"
            }
        ]
    ];

    //------------------------------------------------
    //
    // KendoUi Configurations
    //
    //------------------------------------------------

    $scope.ddlPeriodCodeOptions = {
        dataSource: reportService.getPeriodDs(),
        dataTextField: "Period",
        dataValueField: "PeriodValue"
    };

    $scope.$on('$viewContentLoaded', function (event) {
        // Get Current Period
        reportService.getCurrentPeriod().then(function (response) {

            $scope.periodCode = response[0].CURRENTLEARNPERIOD.replace("/","%2F");

            $("#ddlPeriodCode").data('kendoDropDownList').value($scope.periodCode);

        }, function (err) {
            if (err) {
                console.log("getCurrentPeriod err " + err.message);
            }
        });

    });

    $scope.$on('$destroy', function () {

    });

    //------------------------------------------------
    //
    // Page Function
    //
    //------------------------------------------------

    $scope.ddlPeriodChanged = function() {

        if($scope.periodCode === "1%2F59"){
            $scope.genDynamicPretestPosttestChart($scope.tempData4);
        }else if($scope.periodCode === "1%2F58"){
            $scope.genDynamicPretestPosttestChart($scope.tempData1);
        }else if($scope.periodCode === "2%2F58"){
            $scope.genDynamicPretestPosttestChart($scope.tempData2);
        }else if($scope.periodCode === "3%2F58"){
            $scope.genDynamicPretestPosttestChart($scope.tempData3);
        }

        //
        //if user is not teacher get from selected item


        // reportService.getDataForChart($scope.tchCode, $scope.getPeriod()).then(function (result) {
        //     if (result) {
        //         $scope.genDynamicChart(result);
        //     }
        // }, function (err) {
        //     console.dir(err.message);
        // });


    };

    //------------------------------------------------
    //
    // Private Function
    //
    //------------------------------------------------

    $scope.genDynamicPretestPosttestChart = function (data) {
        kendo.ui.progress($(document.body), true);
        $scope.chartArr = [];
        var arr = {
            "Pre-Test":[],
            "Post-Test":[]
        };
        //
        //group by subject
        var groupSubjectArr = _.groupBy(data, 'SubjectCode');
        _.each(groupSubjectArr, function(outerSubjectArr){
            //
            //iterator through Subject Group Object
            _.each(outerSubjectArr, function(innerSubjectArr){
                var arr = {
                    "Pre-Test":[],
                    "Post-Test":[]
                };
                //
                //group by LearnTypeCode >> Pretest / PostTest
                var groupPrePostArr = _.groupBy(innerSubjectArr, 'LearnTypeCode');
                //
                //iterator through Pretest Posttest Group Object
                _.each(groupPrePostArr, function(prePostArr){
                    //
                    //group by IsDone >> Done / Not Done
                    var groupedArr = _.groupBy(prePostArr, 'IsDone');
                    _.each(groupedArr["Not Done"], function(notDone){
                        //
                        //add 'Not Done' Key to 'Done' array for display in chart
                        var done = _.find(groupedArr["Done"], ["UnitID", notDone.UnitID]);
                        done.NotDone = notDone.CountZeroScore;
                    });
                    arr[prePostArr[0].LearnTypeCode] = _.concat(arr[prePostArr[0].LearnTypeCode], groupedArr["Done"])
                });

                //end onf subject loop here
                //create chart here
                $scope.chartArr.push(
                    {
                        preTestOptions: $scope.genPretestPosttestChartOption(arr["Pre-Test"], arr["Pre-Test"][0].SubjectCode),
                        postTestOptions: $scope.genPretestPosttestChartOption(arr["Post-Test"], arr["Post-Test"][0].SubjectCode),
                        subjectCode: arr["Pre-Test"][0].SubjectCode
                    }
                );
            });
        });

        kendo.ui.progress($(document.body), false);
    };


    $scope.genPretestPosttestChartOption = function (dataSource, subjectName) {
        return {
            // $scope.samepleChartOptions = {
            // title: {
            //     //
            //     //teacher name
            //     text: "จำนวนนักเรียนที่เข้าเรียนในรายวิชา: " + subjectName
            // },
            dataSource: dataSource,
            legend: {
                position: "top",
                item: {
                    visual: createLegendItem
                }
            },
            seriesDefaults: {
                type: "column",
                // stack: true,
                highlight: {
                    toggle: function (e) {
                        // Don't create a highlight overlay,
                        // we'll modify the existing visual instead
                        e.preventDefault();

                        var visual = e.visual;
                        var opacity = e.show ? 0.8 : 1;

                        visual.opacity(opacity);
                    }
                },
                visual: function (e) {
                    return createColumn(e.rect, e.options.color);
                }
            },
            series:[
                //
                //percent range
                {
                    field: "NotDone",
                    name: "ไม่ได้ทำ",
                    color: "#5f5f5f"
                },
                {
                    field: "CountZeroScore",
                    name: "0 Percent",
                    color: "#d92800"
                },
                {
                    field: "CountFiftyPercent",
                    name: "1-50 Percent",
                    color: "#65c4e0"
                },
                {
                    field: "CountEightyPercent",
                    name: "51-80 Percent",
                    color: "#428bca"
                },
                {
                    field: "Count100Percent",
                    name: "81-100 Percent",
                    color: "#1045ca"
                }

            ],
            panes: [{
                clip: false
            }],
            chartArea: {
                height: 300
            },
            categoryAxis: {
                //
                //Unit
                field: "UnitID",
                // field: "UnitName",
                // labels: {
                //     rotation: -45
                // },
                majorGridLines: {
                    visible: false
                },
                title: {
                    text: "หน่วยเรียน"
                }
            },
            valueAxis: {
                labels: {
                    template: "#: value# คน"
                },
                majorUnit: 10,
                line: {
                    visible: false
                },
                title: {
                    text: "จำนวนนิสิต"
                }
            },
            tooltip: {
                visible: true,
                template: "#: value# คน"
            }
        };
    };


    $scope.getPeriod = function(){
        return $scope.periodCode.replace("%2F","/");
    };

    var drawing = kendo.drawing;

    var geometry = kendo.geometry;

    function createColumn(rect, color) {
        var origin = rect.origin;
        var center = rect.center();
        var bottomRight = rect.bottomRight();
        var radiusX = rect.width() / 2;
        var radiusY = radiusX / 3;
        var gradient = new drawing.LinearGradient({
            stops: [{
                offset: 0,
                color: color
            }, {
                offset: 0.5,
                color: color,
                opacity: 0.9
            }, {
                offset: 0.5,
                color: color,
                opacity: 0.9
            }, {
                offset: 1,
                color: color
            }]
        });

        var path = new drawing.Path({
            fill: gradient,
            stroke: {
                color: "none"
            }
        }).moveTo(origin.x, origin.y)
            .lineTo(origin.x, bottomRight.y)
            .arc(180, 0, radiusX, radiusY, true)
            .lineTo(bottomRight.x, origin.y)
            .arc(0, 180, radiusX, radiusY);

        var topArcGeometry = new geometry.Arc([center.x, origin.y], {
            startAngle: 0,
            endAngle: 360,
            radiusX: radiusX,
            radiusY: radiusY
        });

        var topArc = new drawing.Arc(topArcGeometry, {
            fill: {
                color: color
            },
            stroke: {
                color: "#ebebeb"
            }
        });
        var group = new drawing.Group();
        group.append(path, topArc);
        return group;
    }

    function createLegendItem(e) {
        var color = e.options.markers.background;
        var labelColor = e.options.labels.color;
        var rect = new geometry.Rect([0, 0], [120, 50]);
        var layout = new drawing.Layout(rect, {
            spacing: 5,
            alignItems: "center"
        });

        var overlay = drawing.Path.fromRect(rect, {
            fill: {
                color: "#fff",
                opacity: 0
            },
            stroke: {
                color: "none"
            },
            cursor: "pointer"
        });

        var column = createColumn(new geometry.Rect([0, 0], [15, 10]), color);
        var label = new drawing.Text(e.series.name, [0, 0], {
            fill: {
                color: labelColor
            }
        })

        layout.append(column, label);
        layout.reflow();

        var group = new drawing.Group().append(layout, overlay);

        return group;
    }


});