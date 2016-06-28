/**
 * Created by chanupolphermpoon on 6/24/2016 AD.
 */

'use strict';

app.controller('anotherTeacherFacultyController', function ($scope, $location, notificationService, anotherTeacherFacultyService, commonStatusService) {

    $scope.notificationCenterOptions = notificationService.options;

    //------------------------//
    // MAPP all dropdown list //
    //------------------------//
    $scope.ddlStatusOptions = commonStatusService.getDdlStatusFirstNull();

    //------------------------//
    // GET data grid          //
    //------------------------//

    $scope.grdAnotherTeacherFacOptions = {
        dataSource: anotherTeacherFacultyService.getAnotherTeacherFacultyListDs(),
        height: 500,
        sortable: true,
        scrollable: true,
        //selectable: "multiple, row",
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
                field: "TCHCODE",
                title: "รหัสอาจารย์",
                width: 80,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"}
            },
            {
                field: "TCHNAME",
                title: "ชื่ออาจารย์",
                width: 120,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"}
            },
            {
                field: "SUBJECTCODE",
                title: "รหัสวิชา",
                width: 80,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"}
            },
            {
                field: "SUBJECTNAME",
                title: "ชื่อวิชา",
                width: 80,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"}
            },
            {
                field: "FACULTYNAME",
                title: "คณะที่มีการสอน",
                width: 180,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"}
            },
            {
                field: "STATUS",
                title: "สถานะ",
                width: 70,
                headerAttributes: {style: "text-align:center"},
                attributes: {"class": "text-center"},
            }
        ]
    };


    //------------------------------------------------------------------------------------------------
//
//
// Private AngularJs functions
//
//
//------------------------------------------------------------------------------------------------

    //------------------------//
    // CREATE function        //
    //------------------------//

    $scope.redirectToCreate = function () {
        $location.path('/admin/teacher/another/faculty/create');
    };


});


//--------------------------------------------------------------------------------
//
// CREATE & UPDATE Controller
//
//--------------------------------------------------------------------------------

app.controller("editAnotherTeacherFacultyController", function ($scope, $location, $routeParams, $uibModal, notificationService, anotherTeacherFacultyService, commonStatusService) {

    console.log('editAnotherTeacherFacultyController ==>');
    //----------------------------
    // INI Section
    //----------------------------
    $scope.notificationCenterOptions = notificationService.options;

    $scope.pageMode = BLANK;

    $scope.tchCode = BLANK;
    $scope.subjectCode = BLANK;
    $scope.facultyName = BLANK;
    $scope.status = STRINUSEEN;


    //------------------------//
    // MAPP all dropdown list //
    //------------------------//
    $scope.ddlStatusOptions = commonStatusService.getDdlStatusValEng();


    console.dir($routeParams.tchCode);
    if ($routeParams.tchCode == undefined) {
        //----------------------------------------------
        //
        // Create Section
        //
        //----------------------------------------------
        $scope.pageMode = MODECREATE;
    } else {
        //----------------------------------------------
        //
        // UPDATE Section
        //
        //----------------------------------------------
        $scope.pageMode = MODEUPDATE;

        //find data
        /* console.log($routeParams.universityGroupId);
         universityGroupService.getUniversityGroup($routeParams.universityGroupId).then(function (result) {
         console.log(result);
         if (result != undefined) {
         $scope.universityGroupId = result[0].ID;
         $scope.code = result[0].CODE;
         $scope.nameThai = result[0].NAMETHAI;
         $scope.nameEng = result[0].NAMEENG;
         $scope.initialNameThai = result[0].INITIALNAMETHAI;
         $scope.initialNameEng = result[0].INITIALNAMEENG;

         $("#ddlStatus").data('kendoDropDownList').text(result[0].STATUS);

         }
         }, function (err) {
         console.log(err);
         });*/

    }
    console.dir("page mode : " + $scope.pageMode);


    $scope.save = function () {

        if ($scope.pageMode == MODECREATE) {
            create();
        } else {
            //update();
        }

    };

    $scope.cancel = function () {
        $scope.tchCode = BLANK;
        $scope.subjectCode = BLANK;
        $scope.facultyName = BLANK;

        $location.path('/admin/teacher/another/faculty/list');
    };


    //-------------------------------------------------
    //
    // Private Function
    //
    //-------------------------------------------------

    function create() {
        if (confirm(CONFSAVEMSGTH)) {

            var objAnotherTchFac = {
                tchCode: $scope.tchCode,
                subjectCode: $scope.subjectCode,
                facultyName: $scope.facultyName,
                status: $scope.status
            };

            anotherTeacherFacultyService.addAnotherTeacherFaculty(objAnotherTchFac).then(function (result) {
                console.log(result);
                $scope.notificationCenter.success({
                    message: STRSAVESUCCESSTH //"Save success."
                });
                $location.path('/admin/teacher/another/faculty/list');
            }, function (err) {
                console.log(err);
                $scope.notificationCenter.error({
                    message: err.message
                });
            });
        }
    }

});
