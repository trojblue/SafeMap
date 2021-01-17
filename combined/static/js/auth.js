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

function readCookie(){
    //作废
        var cookie = document.cookie;
    console.log(cookie);

    // https://gist.github.com/rendro/525bbbf85e84fa9042c2#gistcomment-2784930
    //cookie的 hash-array
    var cookieArray = document.cookie
    .split(';')
    .reduce((res, c) => {
      const [key, val] = c.trim().split('=').map(decodeURIComponent)
      const allNumbers = str => /^\d+$/.test(str);
      try {
        return Object.assign(res, { [key]: allNumbers(val) ?  val : JSON.parse(val) })
      } catch (e) {
        return Object.assign(res, { [key]: val })
      }
    }, {});
    //读取cookie以后把
    console.log(cookieArray);
    console.log(cookieArray["grav-tabs-state"]["User"]);

    document.getElementById("loginButton");
    document.getElementById("signupButton");
}

function changeLoginStatus(){
    //code: 0, 100, 101
    //data: username / fail reason
    $.getJSON("http://localhost:3000/api/v1/username", function(data6) {
        let code = data6["code"];
        let data = data6["data"];
        console.log(code + ' ' + data);
        if (code == 0){ //success
            console.log("login success");
            document.getElementById("loginButton").remove();
            document.getElementById("signupButton").innerHTML = data;
            document.getElementById("signupButton").href = "#";
        }else {
            console.log("login fail");
        }
    });
}

//Auto-initialization
changeLoginStatus();