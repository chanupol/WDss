/**
 * Created by Aem on 2/8/2016 AD.
 */
"use strict";

app.factory("notificationService", function() {
    return ({
        options: {
            position: {
                pinned: true,
                top: 30,
                right: 30
            },
            stacking: "down",
            width: "30em",
            //autoHideAfter: 0,
            templates: [
                {
                    type: "info",
                    template: "<div class='alert alert-dismissable'>" +
                    "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>" +
                    "<h4><i class='icon fa fa-info'></i> ข้อมูล!</h4>" +
                    "#= message #" +
                    "</div>"
                }, {
                    type: "success",
                    template: "<div class='alert alert-dismissable'>" +
                    "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>" +
                    "<h4><i class='icon fa fa-check'></i> เสร็จสมบูรณ์!</h4>" +
                    "#= message #" +
                    "</div>"
                }, {
                    type: "warning",
                    template: "<div class='alert alert-dismissable'>" +
                    "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>" +
                    "<h4><i class='icon fa fa-warning'></i> คำเตือน!</h4>" +
                    "#= message #" +
                    "</div>"
                },
                {
                    type: "error",
                    template: "<div class='alert alert-dismissable'>" +
                    "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>" +
                    "<h4><i class='icon fa fa-ban'></i> เกิดข้อผิดพลาด!</h4>" +
                    "#= message #" +
                    "</div>"
                }
            ]
        }
    });
});
