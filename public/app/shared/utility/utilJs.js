/**
 * Created by suphachaibootprom on 5/10/2016 AD.
 */


function selectOneCheckBoxRow(obj) {
    //when select check box also select kendo grid
    var checked = obj.checked;
    var row = $(obj).closest("tr");

    if (checked) {
        //-select the row
        row.addClass("k-state-selected");
    } else {
        //-remove selection
        row.removeClass("k-state-selected");
    }
    isRowSelected();
}

function selectOneKendoRow(entityGrid, grdId) {
    //when select kendo row grid also select check box
    var selecter;
    if(grdId.id == undefined){
        selecter = "#"+grdId+" .checkbox-row";
    }else{
        selecter = "#"+grdId.id+" .checkbox-row";
    }
    // console.dir($(selecter));
    $(selecter).prop("checked", false);
    var rows = entityGrid.select();

    rows.each(function (index, row) {

        $(row).find('input[type="checkbox"]').prop('checked', true);

    });
    isRowSelected();
}

function selectAllCheckBoxRows(obj, grdId) {
    var idGrid = "#" + grdId.id + " tbody tr";
    var idCheckBox = "#" + grdId.id + " tbody input:checkbox";
    $(idCheckBox).prop("checked", obj.checked);

    if (obj.checked) {
        //-select the row
        $(idGrid).addClass("k-state-selected");
    } else {
        //-remove selection
        $(idGrid).removeClass("k-state-selected");
    }
    isRowSelected();
}


function arrToObject(arr) {
    var rv = {};
    for (var i = 0; i < arr.length; ++i)
        rv[i] = arr[i];
    return rv;
}

function isRowSelected(){
    var n = $( "input:checked" ).length;
    if(n > 0){
        $("#btnDelete").prop('disabled', false);
    }else{
        $("#btnDelete").prop('disabled', true);
    }

}