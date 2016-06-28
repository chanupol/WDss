/**
 * Created by chanupolphermpoon on 6/24/2016 AD.
 */
"use strict";


var Boom = require("boom");
var AnotherTeacherFacultyModel = require("../../models/teacher/anotherteacherfaculty");
var anotherTeacherFacultyModel = new AnotherTeacherFacultyModel();

function AnotherTeacherFacultyController() {

}

//--------------------------------------------------------------------------------
//
// Get section
//
//--------------------------------------------------------------------------------

AnotherTeacherFacultyController.prototype.getAnotherTeacherFacultyList = function (request, reply) {

    anotherTeacherFacultyModel.getAnotherTeacherFacultyList(function (err, result) {
        if (err) {
            reply(Boom.internal("Cannot get Another Teacher Who Teach In Faculty List information", err));
        } else {
            reply(result);
        }
    });

};


//--------------------------------------------------------------------------------
//
// Insert section
//
//--------------------------------------------------------------------------------

AnotherTeacherFacultyController.prototype.CreateNewAnotherTeacherFaculty = function (request, reply) {

    var objAnotherTchFaculty = request.payload;
    anotherTeacherFacultyModel.createNewAnotherTeacherFacultyList(objAnotherTchFaculty,function (err, result) {
        if (err) {
            reply(Boom.internal("Cannot create Another Teacher Who Teach In Faculty List information", err));
        } else {
            reply(result);
        }
    });

};



//--------------------------------------------------------------------------------
//
// Update section
//
//--------------------------------------------------------------------------------

AnotherTeacherFacultyController.prototype.UpdateStatusAnotherTeacherFaculty = function (request, reply) {

    var objAnotherTchFaculty = request.payload;
    anotherTeacherFacultyModel.updateStatusAnotherTeacherFacultyList(objAnotherTchFaculty,function (err, result) {
        if (err) {
            reply(Boom.internal("Cannot create Another Teacher Who Teach In Faculty List information", err));
        } else {
            reply(result);
        }
    });

};


module.exports = AnotherTeacherFacultyController;