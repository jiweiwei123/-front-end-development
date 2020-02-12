(function ($) {
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]); return null;
    }
})(jQuery);

function compare(property){
    return function(a,b){
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
    }
}
let projectName=$.getUrlParam("projectName");
let isadmin=$.getUrlParam("isadmin");
function GetVersions() {
    let an=$('<p class="ves_pn" style="font-size:1.5em;"></p>').text(projectName);
    $('.ves_left').append(an);
    if (isadmin==='1'){
        let addbutton=$('<p  class="add-button admin1">上传新版</p>');
        addbutton.click(function(){
            location.href="./addapp.html"
        });

        $('.ves_left').append(addbutton);
    }
    let url = "http://117.78.27.178:8080/versions?projectName=" + projectName;
    $.get(url, function (data, status) {
        console.log(data)
        let data1 = $.parseJSON(data);
        console.log(data1,data1.nums,data1.versions);
        let num = data1.nums;
        let versionArry=data1.versions;
        versionArry.sort(compare('versionName'));
        console.log(versionArry);
        for(let i=num-1;i>=0;i--){
            let versionName=versionArry[i].versionName;
            let versionTime=versionArry[i].lastTime;
            let versionLogs=versionArry[i].log;
            let Name=$('<p></p>').text("版本号："+versionName);
            let Time=$('<p></p>').text("上传时间："+versionTime);
            let Log=$('<p></p>').text("更新日志："+versionLogs);
            let versiondiv=$('<div class="ves_div"></div>');
            versiondiv.append(Name);
            versiondiv.append(Time);
            versiondiv.append(Log);
            $('.ves_right').append(versiondiv);
            if(isadmin==="1"){
                let DELE=$('<a class="dele"></a>').text("删除");
                versiondiv.append(DELE);
                DELE.click(function(version1){
                    let Ture=confirm("是否删除");
                    if(Ture===true){ 
                    version1=versionName
                    DELEapp(version1);
                }else{
                    return;
                }
                });
    
                
            }
            let DLoad=$('<a class="dload"></a>').text("下载");
            versiondiv.append(DLoad);
            DLoad.click(function(){
               DLoadapp(versionName);
            })
           
          
        }
    })
}
function DELEapp(version1){
    let url="http:///117.78.27.178:8080/delete?projectName="+projectName+"&version="+version1;
    $.post(url,function(version1,status){
        console.log(version1); 
        alert(version1);
        $('.ves_right').empty();
        $('.ves_left').empty();
        GetVersions();

    })
}
function DLoadapp(version2){
    location.href="http://117.78.27.178:8080/download?projectName="+projectName+"&version="+version2;
}


*