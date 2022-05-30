"use strict";
let storagge = document.querySelector(".form-select");
let nam = document.querySelector(".name");
let itemNo = document.querySelector(".roll");
let show = document.querySelector(".datas");
let storType = [localStorage, "Cookies", sessionStorage];
var lastLocation;
var lastRoll ;
storagge.value = '' 
nam.value = '' 
itemNo.value = '' 

// Function To display elements
let chekPage = JSON.parse(localStorage.getItem("user"));


if(!chekPage){
  window.location.href = "index.html"
}

function shower() {
  while (show.firstChild) {
    show.removeChild(show.firstChild);
  }
  for (let i of storType) {
    if (i != "Cookies") {
      showed(i);
    } else {
      if (document.cookie != "") {
        var daTa = document.cookie.split("=");
        var dataList = JSON.parse(daTa[1]);
        dataList.forEach(function (i) {
          let html = `
          <div class="data">
              <span class="flexy">
                <span>Item no:  <span class='numb'>${i.roll}</span></span>
                <span>Name : <span class='namy'>${i.name}</span></span>
              </span>
              <span class="flexy">
                <span>Storage : <span class='storay'>${i.stor}</span></span>
              </span>
              <span class="buttons">
                  <button class='editor'>Edit</button>
                  <button class='editor deletor'>Delete</button>
              </span>
            </div>        `;
          show.insertAdjacentHTML("beforeend", html);
        });
      }
    }
  }
}
function showed(i) {
  let list = i.getItem("data");
  if (list) {
    let lisst = JSON.parse(list);
    lisst.forEach(function (i) {
      let html = `
          <div class="data">
              <span class="flexy">
                <span>Item No  :  <span class='numb'>${i.roll}</span></span>
                <span>Name : <span class='namy'>${i.name}</span></span>
              </span>
              <span class="flexy">
                <span>Storage : <span class='storay'>${i.stor}</span></span>
              </span>
              <span class="buttons">
                  <button class='editor'>Edit</button>
                  <button class='editor deletor'>Delete</button>
              </span>
            </div>        `;
      show.insertAdjacentHTML("beforeend", html);
    });
  }
}
shower();

//  Function to store

function stored(storData) {
  if (
    storagge.value != "" &&
    nam.value != "" &&
    itemNo.value != ""
  ) {
    var obj = {};
    obj.name = nam.value;
    obj.roll = itemNo.value;
    obj.stor = storagge.value;
    if (storData.getItem("data") === null) {
      var studentData = [];
    } else {
      var studentData = JSON.parse(storData.getItem("data"));
    }
    var check = 0;
    studentData.forEach(function (i) {
      if (i.roll === obj.roll) {
        alert("you can't add same no of item");
        check = 1;
      }
    });
    if (check == 0) {
      studentData.push(obj);
      let stringer = JSON.stringify(studentData);
      storData.setItem("data", stringer);
      shower();
    }
    storagge.value = "";
    nam.value = "";
    itemNo.value = "";
  } else {
    alert("Please fill the details correctly");
  }
}
// when i click submit button
document.querySelector(".but").addEventListener("click", function () {
  let chance = document.querySelectorAll(".numb");
  var ans;
  if (chance) {
    chance.forEach((i) => {
      if (i.textContent == itemNo.value) {
        ans = true;
      }
    });
  } else {
    ans = false;
  }
  if (ans) {
    alert("you cant use a no item twice");
  } else {
    if (document.querySelector('.but').innerHTML == 'Edit'){
        alert('editing mode on')
        if (lastLocation == 'Cookies'){
            let age = document.cookie.split('=')
            let dataLis = JSON.parse(age[1])
            dataLis.forEach(i =>{
                if (i.roll == lastRoll){
                    let see = dataLis.indexOf(i)
                    dataLis.splice(see,1)
                }
            })
            let strr = JSON.stringify(dataLis);
            document.cookie = `data=${strr}`;
        }else{
            if(lastLocation == 'localStorage'){
                var locator = localStorage
            }else{
                var locator = sessionStorage
            }
            let dataLis = JSON.parse(locator.getItem('data'))
            dataLis.forEach(i =>{
                if (i.roll == lastRoll){
                    let see = dataLis.indexOf(i)
                    dataLis.splice(see,1)
                }
            })
            let strr = JSON.stringify(dataLis);
            locator.setItem('data',strr)
        }
        document.querySelector('.but').innerHTML='Submit'
    }
        if (storagge.value == "localStorage") {
            stored(localStorage);
          } else if (storagge.value == "sessionStorage" && !ans) {
            stored(sessionStorage);
          } else if (!ans) {
            if (
              storagge.value != "" &&
              nam.value != "" &&
              itemNo.value != ""
            ) {
              if (document.cookie) {
                var daTa = document.cookie.split("=");
                let dataList = JSON.parse(daTa[1]);
                let obj = {};
                obj.name = nam.value;
                obj.roll = itemNo.value;
                obj.stor = storagge.value;
                var check = 0;
                dataList.forEach(function (i) {
                  if (i.roll == obj.roll) {
                    alert("You cant same no of item");
                    check = 1;
                    nam.value = "";
                    itemNo.value = "";
                    storagge.value = "";
                  }
                });
                if (check == 0) {
                  dataList.push(obj);
                  let strr = JSON.stringify(dataList);
                  document.cookie = `data=${strr}`;
                  nam.value = "";
                  itemNo.value = "";
                  storagge.value = "";
                  shower();
                }
              } else {
                let dataList = [];
                let obj = {};
                obj.name = nam.value;
                obj.roll = itemNo.value;
                obj.stor = storagge.value;
                dataList.push(obj);
                let strr = JSON.stringify(dataList);
                document.cookie = `data=${strr}`;
                nam.value = "";
                itemNo.value = "";
                storagge.value = "";
                shower();
              }
            } else {
              alert("Please fill the form correctly");
            }
          }
    }
  });

// Edit and Delete
document.querySelectorAll(".editor").forEach((i) => {
  let par = i.parentElement;
  let paren = par.parentElement;
  let clasList = i.classList;
  i.addEventListener("click", function () {
    var storar = paren.querySelector(".storay").textContent;
    var eds;
    let objs;
    let roller = paren.querySelector(".numb");
    // var editData = JSON.parse(localStorage.getItem("data"));
    if (storar == "localStorage") {
      var editData = JSON.parse(localStorage.getItem("data"));
    } else if (storar == "sessionStorage") {
      var editData = JSON.parse(sessionStorage.getItem("data"));
    } else {
      var daTa = document.cookie.split("=");
      var editData = JSON.parse(daTa[1]);
    }
    editData.forEach(function (inst) {
      if (inst.roll == roller.textContent) {
        eds = editData.indexOf(inst);
        objs = inst;
      }
    });
    // editData.splice(eds, 1);
    // paren.remove();
    if (clasList.length == 1) {
      storagge.value = objs.stor;
      nam.value = objs.name;
      itemNo.value = objs.roll;
      document.querySelector('.but').innerHTML = 'Save'
      lastLocation = storagge.value
      lastRoll = itemNo.value
    } else{
    editData.splice(eds, 1);
    paren.remove()
    // window.top.location = window.top.location
    }
    // localStorage.setItem("data", JSON.stringify(editData));
    if (storar == "localStorage") {
      localStorage.setItem("data", JSON.stringify(editData));
    } else if (storar == "sessionStorage") {
      sessionStorage.setItem("data", JSON.stringify(editData));
    } else {
      let strr = JSON.stringify(editData);
      document.cookie = `data=${strr}`;
    }
  });
});



// let UserNameTodo = ;
// logout function

let local = localStorage.getItem("name");
document.getElementById("UserNameTodo").innerHTML = local;

let name = localStorage.getItem("name")?localStorage.getItem("name"):"";
if(name === ""){
  alert("u need to Login Frist");
  window.location.href = "/index.html";

}
function Logout(){
  localStorage.removeItem("name");
  localStorage.removeItem("email");
  window.location.href = "/index.html"
}


// timer function

const startingMinutes = 10;
let time = startingMinutes * 60;

const countdownEl = document.getElementById("timeLogout");


function updateCountDown() {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  if(seconds === 0){
    Logout()
  }
  countdownEl.innerHTML = `${minutes}:${seconds}`;
  if(time === 0){
    Logout();
  }
  time--;
}
setInterval(updateCountDown, 1000);