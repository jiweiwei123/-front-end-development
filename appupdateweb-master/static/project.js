(function ($) {
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]); return null;
    }
})(jQuery);
let isadmin=$.getUrlParam('isadmin')
let allprojects=[];
let colors =["rgb(75, 207, 250)",'rgb(155, 89, 182)','rgb(255, 94, 87)','rgb(11, 232, 129)','rgb(255, 192, 72)','rgb(87, 95, 207)'];
// let colors1=['rgb(15, 188, 249)','rgb(245, 59, 87)','rgb(0, 216, 214)','rgb(5, 196, 107)','rgb(255, 168, 1)','rgb(60, 64, 198)'];
function GetProjects1() {
    $.get('http://117.78.27.178:8080/projects',function (data,status) {
        console.log("data:",data,"nums",data.nums,"pro:",data.projects,"status",status);
        let nums=data.nums;
        let projects=data.projects;
        allprojects=projects;
        if (isadmin === '0') {
            for (let i=0;i<projects.length;i++) {
                let projectText = projects[i].projectName;
                let projectNew = projects[i].new;
                let Text = $('<p id="nameid"></p>').text(projectText);
                let New = $('<p id="news"></p>').text("最新版本:" + projectNew);
                let projectDiv = $('<div class="hvr-border-fade"></div>');
                projectDiv.click(function () {
                    location.href="./versions1.html?projectName="+projectText+"&isadmin="+isadmin;
                });
                projectDiv.append(Text);
                // projectDiv.append($('<br>'))
                projectDiv.append(New);
                $('.projects').append(projectDiv);
            }
        }
        else {
                let projectTian=$('<div id="addbutton"></div>').text('添加新产品');
                projectTian.click(function() {
                    location.href = './addapp.html';});
                $('.projects').append(projectTian);
            for (let i = 0; i < projects.length; i++) {
                    let projectText = projects[i].projectName;
                    let projectNew = projects[i].new;
                    let Text = $('<p id="nameid"></p>').text(projectText);
                    let New = $('<p id="news"></p>').text("最新版本:" + projectNew);
                    let projectDiv = $('<div class="hvr-border-fade"></div>');
                    projectDiv.click(function () {
                        location.href="./versions1.html?projectName="+projectText+"&isadmin="+isadmin;
                    });
                    projectDiv.append(Text);
                    // projectDiv.append($('<br>'))
                    projectDiv.append(New);
                    $('.projects').append(projectDiv)
                    }
            }
        $(".projects div").each(function () {
            let randomNum=Math.floor(Math.random()*6);
            let shader="0 0 0 45px "+colors[randomNum]+" inset";
            let shader1="inset 0 0 0 10px "+colors[randomNum]+", 0 0 1px rgba(0, 0, 0, 0)";
            $(this).css('box-shadow',shader);
            $(this).mouseover(function () {
                $(this).css('box-shadow',shader1);
            });
            $(this).mouseout(function () {
                $(this).css('box-shadow',shader);
            })
        })
    },"json")
}

/**
 * @return {number}
 */
function Search1(){
    let inputtext= $("#input").val();
    for (let i=0;i<allprojects.length;i++){
        if (inputtext===allprojects[i].projectName){
            $("#aProjects").empty();
            let projectDiv=$('<div class="hvr-border-fade"></div>');
            let href="./versions1.html?projectName="+inputtext+"&isadmin="+isadmin;
            projectDiv.click(function () {
                location.href=href;
            });

            let a = $('<p id="nameid"></p>').text(inputtext);
            projectDiv.append(a);
            let shader1="0 0 0 45px transparent inset";
            projectDiv.mouseover(function () {
                projectDiv.css('box-shadow',shader1);
            });
            projectDiv.mouseout(function () {
                projectDiv.css('box-shadow',"inset 0 0 0 10px #2098D1, 0 0 1px rgba(0, 0, 0, 0)");
            });
            projectDiv.addClass('topIn')
            let app = $('<p id="news"></p>').text("最新版本：" + allprojects[i].new)
            projectDiv.append(app);
            $("#aProjects").append(projectDiv);
            return 1;
        }
    }
    alert("搜索的产品不存在！");
    $("#aProjects").empty();
    GetProjects1();
    return 0;
}

