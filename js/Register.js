const form = document.getElementById('form');
const firstname = document.getElementById('firstname');
const dateofbirth = document.getElementById('dateofbirth');
const lastname = document.getElementById('lastname');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const cpassword = document.getElementById('cpassword');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (validate()) {
        saveData();
        document.getElementById('form').value = ""
        document.getElementById('firstname').value = ""
        document.getElementById('dateofbirth').value = ""
        document.getElementById('lastname').value = ""
        document.getElementById('username').value = ""
        document.getElementById('email').value = ""
        document.getElementById('password').value = ""
        document.getElementById('cpassword').value = ""


    }
})



function dbval(){
    let db= document.getElementById("dateofbirth")
    console.log(db.value);
}
dbval();



//email validate
const isEmail = (emailVal) => {
    var atSymbol = emailVal.indexOf("@");
    if (atSymbol < 1) return false;
    var dot = emailVal.lastIndexOf('.');
    if (dot <= atSymbol + 2) return false;
    if (dot === emailVal.length - 1) return false;
    return true;
}

// //email validate
// const dateOfBirth = () => {
//     let currentYear = new Date().getFullYear();
//     console.log(currentYear);
//     const dateofbirth = document.getElementById('dateofbirth');
//     console.log(dateofbirth.value);
// }
// dateOfBirth()


//Strong password validate

const strongPassword = (passwordVal) => {
    if (passwordVal.match(/[a-z]/g) && passwordVal.match(
        /[A-Z]/g) && passwordVal.match(
            /[0-9]/g) && passwordVal.match(
                /[^a-zA-Z\d]/g) && passwordVal.length >= 8)
        return true;
    else
        return false
}

//const isUSer = (usernameVal) => {
//var num = usernameVal;
// if (num == Number) return false;

//}

const saveData = () => {

    let user_records = new Array();
    user_records = JSON.parse(localStorage.getItem("users")) ?
        JSON.parse(localStorage.getItem("users")) : [];

    if (user_records.some((e) => {
        return e.username == username.value
    })) {
        alert("Sorry username alredy exists")
    }
    else if (user_records.some((e) => { return e.email == email.value })) {
        alert("Sorry email is already exist")
    }
    else {
        user_records.push({
            "firstname": firstname.value,
            "lastname": lastname.value,
            "username": username.value,
            "dateofbirth": dateofbirth.value,
            "email": email.value,
            "password": password.value,
        })
        localStorage.setItem("users", JSON.stringify(user_records));
        swal("Good job!", "You are Registered Successfully .. Go for Login", "success");
        setTimeout(function () {
            window.location.href = "../index.html"
        }, 5000);
    }
}


const validate = () => {
    const firstnameVal = firstname.value.trim();
    const lastnameVal = lastname.value.trim();
    const usernameVal = username.value.trim();
    const emailVal = email.value.trim();
    const passwordVal = password.value.trim();
    const cpasswordVal = cpassword.value.trim();
    const dateofbirthVal = dateofbirth.value.trim();

    // return false
    if (firstnameVal === "") {
        setErrorMsg(firstname, "firstname cannot be blank");
        return false;
    } else if (firstnameVal.length <= 2) {
        setErrorMsg(firstname, "firstname min 3 char");
        return false;
    }
    else {
        setSuccessMsg(firstname);
    }

    //lastName validate
    if (lastnameVal === "") {
        setErrorMsg(lastname, "Lastname cannot be blank");
        return false;

    } else if (lastnameVal.length <= 2) {
        setErrorMsg(lastname, "Lastname min 3 char");
        return false;

    }
    else {
        setSuccessMsg(lastname);
    }
    // validate username
    if (usernameVal === "") {
        setErrorMsg(username, "username cannot be blank");
        return false;
    } else if (usernameVal.length <= 2) {
        setErrorMsg(username, "username min 3 char"); 
        return false;
    }
    else {
        setSuccessMsg(username);
    }
    // validate DateofBirth
    if (dateofbirthVal === "") {
        setErrorMsg(dateofbirth, "Date of Birth cannot be blank");
        return false;
    }else if(new Date().getFullYear() - parseInt(dateofbirthVal.split("-")[0]) <= 18){
        setErrorMsg(dateofbirth, "you are not Eligible");
        return false;
    }
    else {
        setSuccessMsg(dateofbirth);
    }

    // validate Emaiemail
    if (emailVal === "") {
        setErrorMsg(email, "Email cannot be blank");
        return false;
    } else if (!isEmail(emailVal)) {
        setErrorMsg(email, "Not a valid Email");
        return false;
    } else {
        setSuccessMsg(email);
    }

    // validate password
    if (passwordVal === "") {
        setErrorMsg(password, "password cannot be blank");
        return false;
    } else if (!strongPassword(passwordVal)) {
        setErrorMsg(password, "Password is not strong");
        return false;
    }
    else {
        setSuccessMsg(password);
    }

    // validate repassword
    if (cpasswordVal === "") {
        setErrorMsg(cpassword, "password cannot be blank");
        return false;
    } else if (passwordVal !== cpasswordVal) {
        setErrorMsg(cpassword, "Password is not matched");
        return false
    } else {
        setSuccessMsg(cpassword);
    }
    return true;
}

function setErrorMsg(input, errormsgs) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = "form-controls error"
    small.innerText = errormsgs;

}

function setSuccessMsg(input) {
    const formControl = input.parentElement;
    formControl.className = "form-controls success"
}