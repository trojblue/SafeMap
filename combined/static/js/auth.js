function SubmitSignup() {
    var username = document.getElementById("signup-email").value;
    var password = document.getElementById("signup-passwd2").value;

    // 没有验证两次密码相同;

    $.ajax({
    type: "GET",
    url: "myapi.php",
    dataType: 'json',
    data:{
        data: '{"name": "' + username + '", "passwd" : "' + password + '"}',
    }
    });
}


function SubmitLogin() {

    var username = document.getElementById("email-input").value;
    var password = document.getElementById("password-input").value;

    $.ajax({
    type: "GET",
    url: "myapi.php",
    dataType: 'json',
    data:{
        data: '{"name": "' + username + '", "passwd" : "' + password + '"}',
    }
    });
}

function changeLoginStatus(){
    document.getElementById("loginButton")
}

//Auto-initialization
changeLoginStatus();