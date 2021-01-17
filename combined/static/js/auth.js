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
    var cookie = document.cookie;
    console.log(cookie);

    // https://gist.github.com/rendro/525bbbf85e84fa9042c2#gistcomment-2784930
    var changedCookie = document.cookie
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
    console.log(changedCookie);
    console.log(changedCookie["grav-tabs-state"]["tab-content.options.advanced.features"]);

//     if (cookie.length > 0) {
//         c_start = document.cookie.indexOf(c_name + "=");
//     if (c_start != -1) {
//         c_start = c_start + c_name.length + 1;
//         c_end = document.cookie.indexOf(";", c_start);
//         if (c_end == -1) {
//             c_end = document.cookie.length;
//         }
//         return unescape(document.cookie.substring(c_start, c_end));
//             }
//         }
// return "";
//     document.getElementById("loginButton");
//     document.getElementById("signupButton");
}

//Auto-initialization
changeLoginStatus();