/**
 * Created by chanupolphermpoon on 4/4/2016 AD.
 */
"use strict";

var Boom = require("boom");
var TeacherModel = require("../../models/import/teacher");

var teacherModel = new TeacherModel();

function TeacherController() {

}



TeacherController.prototype.GetTeacherFromCyberU =function (request, reply) {
    
    teacherModel.GetTeacherFromCyberU(function (err,result) {
        if(err){
            reply(Boom.internal('Insert Error'));
        }else {
            reply(result);
        }
    });

};






module.exports = TeacherController;