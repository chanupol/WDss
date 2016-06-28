/**
 * Created by suphachaibootprom on 5/7/2016 AD.
 */

"use strict";

app.factory("commonStatusService", function($http, $q) {

    function getDdlStatus(){
        var dict = genStatusArrValThai();

        var ddl = {
            dataSource: dict,
            dataTextField: "value",
            dataValueField: "key",
            dataBound:function(e){
                this.select(0)
            }
        };
        return ddl;
    }
    
    
    
    function getDdlStatusFirstNull(){
        var dict = genStatusArrValThai();

        dict.unshift({
            key:   "",
            value: "ทั้งหมด"
        });

        var ddl = {
                dataSource: dict,
                dataTextField: "value",
                dataValueField: "key",
                dataBound:function(e){
                    this.select(1)
                }
            };
        return ddl;
    }

    function getDdlStatusValEng(){
        var dict = genStatusArrValEng();

        var ddl = {
            dataSource: dict,
            dataTextField: "value",
            dataValueField: "key",
            dataBound:function(e){
                this.select(0)
            }
        };
        return ddl;
    }



    function getDdlStatusFirstNullValEng(){
        var dict = genStatusArrValEng();

        dict.unshift({
            key:   "",
            value: "ทั้งหมด"
        });

        var ddl = {
            dataSource: dict,
            dataTextField: "value",
            dataValueField: "key",
            dataBound:function(e){
                this.select(1)
            }
        };
        return ddl;
    }
    
    return ({
        getDdlStatusFirstNull: getDdlStatusFirstNull,
        getDdlStatus: getDdlStatus,
        getDdlStatusFirstNullValEng: getDdlStatusFirstNullValEng,
        getDdlStatusValEng: getDdlStatusValEng,
    });

    //--------------------------------------------------
    //
    //Private Function
    //
    //--------------------------------------------------

    function genStatusArrValThai() {
        var dict = [{
                key:   "ใช้งาน",
                value: "ใช้งาน"
            },
            {
                key:   "ไม่ใช้งาน",
                value: "ไม่ใช้งาน"
            }
        ];
        return dict;
    }
    
    function genStatusArrValEng() {
        var dict = [{
            key:   "InUse",
            value: "ใช้งาน"
        },
            {
                key:   "NotUse",
                value: "ไม่ใช้งาน"
            }
        ];
        return dict;
    }

});