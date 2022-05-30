//email validate
//email validate
// const isUserLoggedIn = checkCookie();
// if(isUserLoggedIn == true){
//     window.location.href = "../../Todo/index.html"
// }else{
//     alert("suerkldajlda") 
// }
let name = localStorage.getItem("name")?localStorage.getItem("name"):"";
if(name != ""){
  alert("Please visit todo Home Page");
  setTimeout(function(){
    window.location.href = "todoPage/todo.html";
  },2000);

};



const isEmail = (emailVal) => {
    var atSymbol = emailVal.indexOf("@");
    if (atSymbol < 1) return false;
    var dot = emailVal.lastIndexOf('.');
    if (dot <= atSymbol + 2) return false;
    if (dot === emailVal.length - 1) return false;
    return true;
}


function userLogin() {

    let loginUserName, loginUserPass, loginUserEmail;
    loginUserName = document.getElementById("loginUsername").value;
    loginUserPass = document.getElementById("loginPassword").value;


    let user_records = new Array();
    user_records = JSON.parse(localStorage.getItem("users")) ? JSON.parse(localStorage.getItem("users")) : []
    if (user_records.some((v) => {
        return v.username == loginUserName && v.password == loginUserPass || v.email == loginUserName && v.password == loginUserPass;
    })) {
        let current_User = user_records.filter((v)=>{
            return loginUserName && v.password == loginUserPass 
            || v.email == loginUserName && v.password == loginUserPass})[0];
            localStorage.setItem("name",current_User.username);
            localStorage.setItem("email",current_User.email)
        swal(`Good Job`, "You Have Login Successfully, Welcome to Home Page", "success");
        localStorage.setItem(
            "user", 
            true)
        setTimeout(function () {
            window.location.href = "/todoPage/todo.html"
        }, 5000);
    }
    else if (user_records.some((v) => {
        return v.username == "" && v.password == "" || v.email == "" && v.password == "";
    })) {
        alert("Please Enter a username or password")
    }
    else if (user_records.some((v) => {
        return v.email == loginUserName && v.password != loginUserPass;
    })) {
        alert("Password is Incorrect ");
    }
    else if (user_records.some((v) => {
        return v.email != loginUserName;
    })) {
        alert("Email is not Registered ");
    }
    else if (user_records.some((v) => {
        return v.username != loginUserName;
    })) {
        alert("user is not Registered ");
    }
    else {
        alert('Account is not registered');
    }

}


// ######################################################################
// function setCookie(cname,cvalue,exdays) {
//     const d = new Date();
//     d.setTime(d.getTime() + (exdays*60*1000));
//     let expires = "expires=" + d.toUTCString();
//     document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
// }
  
// function getCookie(cname) {
//     let name = cname + "=";
//     let decodedCookie = decodeURIComponent(document.cookie);
//     let ca = decodedCookie.split(';');
//     for(let i = 0; i < ca.length; i++) {
//         let c = ca[i];
//         while (c.charAt(0) == ' ') {
//         c = c.substring(1);
//         }
//         if (c.indexOf(name) == 0) {
//             console.log(c.substring(name.length, c.length));
//             return c.substring(name.length, c.length);
//         }
//     }
//     return "";
// }

// function checkCookie() {
//     let user = getCookie("username");
//     if (user != "") {
//         alert("Welcome again " + user);
//     } else {
//         user = prompt("Please enter your name:","");
//         if (user != "" && user != null) {
//             setCookie("username", user, 1);
//         }
//     }
// }


