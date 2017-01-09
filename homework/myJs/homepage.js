/**
 * Created by dwy on 2017/1/4.
 */
var stu_id ="";
function getUserInfo(stu_id) {
    $.get("../myPHP/stu_fetch.php",{'stu_id':stu_id},function (data) {
        console.info(data);
        var ret_name = data['username'];
        var ret_email = data['email'];
        var ret_class = data['class'];
        var ret_photo = data['photoPath'];
        $(".user-image").each(function () {
            $(this).attr("src", ret_photo);
        });
        $(".user-name").each(function () {
            $(this).text(ret_name);
        });
        $(".user-class").each(function () {
            $(this).text(ret_class);
        });
        $(".user-id").each(function () {
            $(this).text(stu_id);
        });
        $(".user-email").each(function () {
            $(this).text(ret_email);
        });
    });
}

function stu_setting() {
    var formData = new FormData($( "#myForm" )[0]);
    formData.append("stu_id",stu_id);
    $.ajax({
        url: "../myPHP/stu_setting.php",
        type: "POST",
        data:formData,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        error:function (data) {
        },
        success: function(data) {
            getUserInfo(data);
        }
    });
    return false;
}

$(document).ready(function(){
    stu_id = $.cookie("stu_id");
    if(stu_id){
        $(".visitor_hide").show();
        $(".visitor_show").hide();
        getUserInfo(stu_id);
        $("#signin").text("Sign out");
        $("#signin").click(function () {
            $.cookie('stu_id','', { expires: -1 });
            stu_id="";
        })
    }else{
        $(".visitor_hide").hide();
        $(".visitor_show").show();
        stu_id = "0"
        getUserInfo(stu_id);
    }
})
