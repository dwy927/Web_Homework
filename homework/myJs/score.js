/**
 * Created by dwy on 2017/1/5.
 */


var tmp = "";
var week = {"1":"周一","2":"周二","3":"周三","4":"周四","5":"周五"};
var time = {"1":"第一节8：00-8：50","2":"第二节9：00-9：50","3":"第三节10：10-11：00","4":"第四节11：10-12：00","5":"第五节13：30-14：20","6":"第六节14：30-15：20","7":"第七节15：30-16：20","8":"第八节16：30-17：20"};
var stu_id ="";
function callTable() {
    $('#example1').Tabledit({
        url: '../myPHP/score_setting.php',
        buttons: {
            confirm: {
                class: 'btn btn-sm btn-default',
                html: 'Are you sure?'
            }
        },
        restoreButton: false,
        deleteButton: false,
        columns: {
            identifier: [0, 'id',],
            editable: [[4, 'score']]
        },
        onSuccess: function(data, textStatus, jqXHR) {
            if(data.action=="edit"){
                console.log('success!');
            }else if(data.action=="delete"){
                console.log('Delete Success!');
                $('#mytdbody').empty();
                $('#mytdbody2').empty();
            }
            FetchData();
            //RePaint
            console.log(data);
            console.log(textStatus);
            console.log(jqXHR);
        }
    });
}
function FetchData() {
    var data_arr={"stu_id":stu_id};
    $.get("../myPHP/course_fetch.php",$.param(data_arr,true),function(data) {
        console.info(data);
        $('#mytdbody').empty();
        $('#mytdbody2').empty();
        if (data.msg == "SUCCESS") {
            $.each(data.data, function(key,value) {
                $('#mytdbody').append(
                    "<tr id="+value[0]+"> " +
                    "<td><span class='tabledit-span tabledit-identifier'>"+value[0]+"</span><inputclass='tabledit-input tabledit-identifier' type='hidden' name='id' value="+value[0]+" disabled='' /></td> " +
                    "<td class=''><span class='tabledit-span'>"+value[1]+"</span><input class='tabledit-input form-control input-sm' type='text' name='name' value="+value[1]+" style='display: none;' disabled='' /></td> " +
                    "<td class=''><span class='tabledit-span'>"+week[value[2]]+"</span><input class='tabledit-input form-control input-sm'type='text' name='week' value="+value[2]+" style='display: none;' disabled='' /></td> " +
                    "<td class=''><span class='tabledit-span'>"+time[value[3]]+"</span><input class='tabledit-input form-control input-sm'type='text' name='time' value="+value[3]+" style='display: none;' disabled='' /></td>" +
                    "<td class='tabledit-view-mode'><span class='tabledit-span'>"+value[4]+"</span><input class='tabledit-input form-control input-sm'type='text' name='score' value="+value[4]+" style='display: none;' disabled='' /></td> " +
                    "</tr>"
                );
                $('#mytdbody2').append(
                    "<tr id="+value[0]+"> " +
                    "<td><span class='tabledit-span tabledit-identifier'>"+value[0]+"</span><inputclass='tabledit-input tabledit-identifier' type='hidden' name='id' value="+value[0]+" disabled='' /></td> " +
                    "<td class='tabledit-view-mode col-Course'><span class='tabledit-span'>"+value[1]+"</span><input class='tabledit-input form-control input-sm' type='text' name='name' value="+value[1]+" style='display: none;' disabled='' /></td> " +
                    "<td class='tabledit-view-mode col-Week'><span class='tabledit-span'>"+week[value[2]]+"</span><input class='tabledit-input form-control input-sm'type='text' name='week' value="+value[2]+" style='display: none;' disabled='' /></td> " +
                    "<td class='tabledit-view-mode col-Time'><span class='tabledit-span'>"+time[value[3]]+"</span><input class='tabledit-input form-control input-sm'type='text' name='time' value="+value[3]+" style='display: none;' disabled='' /></td>" +
                    "<td class='tabledit-view-mode col-Score'><span class='tabledit-span'>"+value[4]+"</span><input class='tabledit-input form-control input-sm'type='text' name='score' value="+value[4]+" style='display: none;' disabled='' /></td> " +
                    "</tr>"
                );
                var course_id = (parseInt(value[3])-1)*5 + parseInt(value[2]);
                changeCourseTable(course_id,value[1]);
            });
            callTable();
        }
    });
}

function QueryData(key,value){
    var tes = {[key]:value};
    tes['stu_id']=stu_id;
    console.info(tes);
    $.get("../myPHP/course_query.php",$.param(tes,true),function(data) {
        $('#mytdbody2').empty();
        if (data.msg == "SUCCESS") {
            $.each(data.data, function(key,value) {
                $('#mytdbody2').append(
                    "<tr id="+value[0]+"> " +
                    "<td><span class='tabledit-span tabledit-identifier'>"+value[0]+"</span><inputclass='tabledit-input tabledit-identifier' type='hidden' name='id' value="+value[0]+" disabled='' /></td>" +
                    "<td class='tabledit-view-mode col-Course'><span class='tabledit-span'>"+value[1]+"</span><input class='form-control input-sm' type='text' name='name' value="+value[1]+" style='display: none;' disabled='' /></td> " +
                    "<td class='tabledit-view-mode col-Week'><span class='tabledit-span'>"+week[value[2]]+"</span><input class='tabledit-input form-control input-sm'type='text' name='sex' value="+value[2]+" style='display: none;' disabled='' /></td> " +
                    "<td class='tabledit-view-mode col-Time'><span class='tabledit-span'>"+time[value[3]]+"</span><input class='tabledit-input form-control input-sm'type='text' name='age' value="+value[3]+" style='display: none;' disabled='' /></td>" +
                    "<td class='tabledit-view-mode col-Score'><span class='tabledit-span'>"+value[4]+"</span><input class='tabledit-input form-control input-sm'type='text' name='phone' value="+value[4]+" style='display: none;' disabled='' /></td> " +
                    "</tr>"
                );
            });
            $(tmp).css("background-color","#FFFFBB");
            callTable();
        }else{
        }
    });
}
function changeCourseTable(course_id,course_name){
    var id="#class-"+course_id;
    $(id).text(course_name);
    $(id).css("text-align","center");
    $(id).css("vertical-align","middle");


}

$(document).ready(function() {
    stu_id = $.cookie("stu_id");
    if(!stu_id){
        stu_id="0";
    }
    var choose = "";
    var parseChoose = {"Course":"course_name","Time":"course_time","Week":"course_week","Score":"course_score"};
    $('#mydropdown').on('shown.bs.dropdown', function () {
        $('[name="my_list"]').each(function () {
            $(this).on('click',function () {
                choose=$(this).text();
                $('#myinput').attr("placeholder",choose)
                $(tmp).css("background-color","");
                tmp = ".col-"+choose;
                $(tmp).css("background-color","#FFFFBB");
            });
        });
    });

    $("#myaddrow").click(function () {
        var v = document.getElementById("mytdbody").innerHTML;
        var tableditTableName = '#example1';
        if (v == "" || v == null || !v) {
            $('#mytdbody').append(
                "<tr > " +
                "<td><span class='tabledit-span tabledit-identifier'></span><input class='tabledit-input tabledit-identifier' type='hidden' name='id' disabled='' /></td> " +
                "<td ><span class='tabledit-span'></span><input class='tabledit-input form-control input-sm' type='text' name='name' style='display: none;' disabled='' value=''/></td> " +
                "<td ><span class='tabledit-span'></span><input class='tabledit-input form-control input-sm'type='text' name='week' style='display: none;' disabled='' value=''/></td>" +
                "<td ><span class='tabledit-span'></span><input class='tabledit-input form-control input-sm'type='text' name='time' style='display: none;' disabled='' value=''/></td>" +
                "<td class='tabledit-view-mode'><span class='tabledit-span'></span><input class='tabledit-input form-control input-sm'type='text' name='score' style='display: none;' disabled='' value=''/></td>" +
                "</tr>"
            );
            callTable();
        } else {
            var clone = $("table tr:last").clone();
            $(".tabledit-span", clone).text("");
            $(".tabledit-input", clone).val("");
            clone.appendTo("#example1");
        }
    });

    FetchData();

    $("#myGoQuery").click(function () {
        var inputvalue=$("#myinput").val();
        if(choose==""){
            alert("Please choose a query type!!");
        }else if(inputvalue==""){
            alert("Please enter a query!!");
        }else{
            var teString = parseChoose[choose];
            QueryData(teString,inputvalue);
        }
    });

    $("#showAll").click(function () {
        FetchData();
        $(tmp).css("background-color","");
    });
});
