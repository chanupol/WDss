/**
 * Created by chanupolphermpoon on 3/28/2016 AD.
 */
"use strict";

var Boom = require("boom");
var VideoLengthModel = require("../../models/video/video");

var videoModel = new VideoLengthModel();

function VideoController() {

}



VideoController.prototype.GetVDOFromCyberU =function (request, reply) {
    var importDate = request.params.importDate;
    videoModel.GetVDOFromCyberU(importDate,function (err,result) {
        if(err){
            reply(Boom.internal('Insert Error'));
        }else {
            reply(result);
        }
    });
    
};

VideoController.prototype.GetPeriodConfigFromCyberU =function (request,reply) {

}


VideoController.prototype.ImportVDOFromCyberU = function (request, reply) {
    videoModel.ImportVDOFromCyberU(request,function (err, result) {
        if(err){
            reply(Boom.internal('Insert Error'));
        }else {
            reply(result);
        }
    });
};






module.exports = VideoController;