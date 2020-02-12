


function upload() {
    var path = document.getElementById("app").value;
    if ($.trim(path) == "") {
        alert("请选择要上传的文件");
        return;
    }
    console.log("test");
    let projectName = $('#PN').val();
    let version = $('#VE').val();
    let log = $('#LOG').val();
    let url = "http://117.78.27.178:8080/add?projectName=" + projectName + "&version=" + version + "&log=" + log;
    $.ajaxFileUpload({
        url: url, //这里是服务器处理的代码
        type: 'post',
        secureuri: false, //一般设置为false
        fileElementId: 'app', // 上传文件的id、name属性名
        dataType: 'json', //返回值类型，一般设置为json、application/json
        data: {}, //传递参数到服务器
        function(data,status) {
            console.log(data);
        }
    });
}


$(document).ready(function(){
    $('#addfile').on('change',function(){
        var filePath=$('#addfile').val();
        console.log(filePath);
            if(filePath.indexOf("apk")!=-1 || filePath.indexOf("apk")!=-1){
           $(".fileerrorTip1").html("").hide();
           var arr=filePath.split('\\');
           var fileName=arr[arr.length-1];
           $(".showFileName1").html(fileName);
        }   else{
           $(".showFileName1").html("");
           $(".fileerrorTip1").html("只支持上传apk格式文件!").show();
           return false 
            };
    });
})
