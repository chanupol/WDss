/**
 * Created by chanupolphermpoon on 3/28/2016 AD.
 */
'use strict';

var Joi = require("joi");
var VideoController = require("../../controllers/video/video");
var Nipple = require('nipple');
exports.register = function (server, options, next) {

    //
    // Setup the controllers
    var videoController = new VideoController();

    //
    // Binds all methods
    // when declaring handlers
    server.bind(videoController);

    /*var getNasaData = function(opts, next) {

     var url = 'http://western-cyberu.net:81/api/report/courseoutlineall/courseoutlinerptlist/';
     Nipple.get(url, function (err, res, payload) {
     console.log("Getting data...")
     if (err) {
     next(err);
     } else {
     next(null, JSON.parse(payload));
     }
     });
     };*/

    /*  server.method('getNasaData', getNasaData, {
     generateKey: function(opts) {
     return JSON.stringify(opts);
     }
     });*/
    //
    // Declare routes
    server.route([
        {
            method: 'GET',
            path: '/api/get/cyberu/videodata/{importDate}',
            config: {
                handler: videoController.GetVDOFromCyberU,
                validate: {
                    params: {
                        importDate: Joi.optional()
                    }
                }
            }

            /*handler: function(request, reply) {
             Nipple.get('http://western-cyberu.net:81/api/report/courseoutlineall/courseoutlinerptlist/', function (err, res, payload) {
             //reply(err || JSON.parse(payload));
             //console.log(JSON.parse(payload));

             reply('ok');
             });
             /!*  server.methods.getNasaData(request.query, function(error, result) {
             reply(error || result);
             });*!/
             }*/
        },
        {
            method: 'GET',
            path: '/api/get/cyberu/periodconfig',
            handler: videoController.GetPeriodConfigFromCyberU,

        },
        {
            method: "POST",
            path: "/api/video/import/new",
            config: {
                handler: videoController.ImportVDOFromCyberU,
                validate: {
                    payload: {
                        facultyId: Joi.optional(),
                        facultyName: Joi.optional(),
                        isTeacherSpecialText: Joi.optional(),
                        degreeCode: Joi.optional(),//.string().max(5),
                        degreeName: Joi.optional(),//string().max(100),
                        subjectGroupCode: Joi.optional(),//.string().max(5),
                        subjectGroupName: Joi.optional(),//string().max(100),
                        periodCode: Joi.optional(),//string().max(255),
                        subjectCode: Joi.optional(),//string().max(10),
                        subjectName: Joi.optional(),//string().max(100),
                        subjectNameEng: Joi.optional(),//string().max(100),
                        subjectDesc: Joi.optional(),//string().allow('').max(1000),
                        creditDesc: Joi.optional(),//string().max(10),
                        creditCalGrade: Joi.optional(),//number().integer(),
                        creditCalPrice: Joi.optional(),//number().integer(),
                        tchCode: Joi.optional(),//string().alphanum().max(10),
                        tchName: Joi.optional(),//string().max(300),
                        isTeacherSpecial: Joi.optional(),//optional(),
                        isTeacherActive: Joi.optional(),
                        totalPoint: Joi.optional(),//number().precision(2),
                        rtmpStreamIntro: Joi.optional(),//string().max(150),
                        setCode: Joi.optional(),//string().max(12),
                        setDesc: Joi.optional(),//string().max(250),
                        vdoSetTotalVdoLength: Joi.optional(),//number().integer(),
                        unitId: Joi.optional(),//number().integer(),
                        unitName: Joi.optional(),//string().max(200),
                        vdoUnitTotalVdoLength: Joi.optional(),//number().integer(),
                        unitTotalVideoInMinute: Joi.optional(),
                        unitTotalVideoInMinuteForPercentage: Joi.optional(),
                        unitTotalVideoDeficitInMinute: Joi.optional(),
                        unitStandardTotalVideoInMinute: Joi.optional(),
                        unitPercentage: Joi.optional(),
                        topicNo: Joi.optional(),//number().integer(),
                        topicName: Joi.optional(),//string().max(200),
                        totalTopicVdoLengthInMinute: Joi.optional(),//number().precision(2),
                        rtmpStream: Joi.optional(),//string().max(150)
                        importDate:new Date()
                    }
                }
            }
        }
    ]);

    next();
};

exports.register.attributes = {
    name: "routes-video",
    version: "1.0.0"
};
