function checkAdmin() {
    //todo:后端验证
    let name = prompt("请输入管理员密码：", "");
    if (name!=="123456"){
        alert("密码错误！")
    }else{
        window.location.href="project.html?isadmin=1";

    }
}
