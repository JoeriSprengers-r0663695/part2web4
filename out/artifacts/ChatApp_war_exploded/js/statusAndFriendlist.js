var chgStatusRqst = new XMLHttpRequest();

//UserStatus functions
function changeStatus() //changes status based on what the user inputs on the website
{
    var newStatusValue = document.getElementById("newStatus").value;

    var information = "newStatus=" + encodeURIComponent(newStatusValue);


    chgStatusRqst.open("POST", "Controller?asyncAction=changeStatus", true);
    chgStatusRqst.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    chgStatusRqst.send(information);

    var currentStatus = document.getElementById("currStat");
    if (newStatusValue == "") {
        currentStatus.innerHTML = "online"
    } else {
        currentStatus.innerHTML = newStatusValue;
    }

}

function changeStatusWithStr(userStatus) //change status via the console if the user wants to
{
    var newStatusStr = userStatus.toString();
    var information = "newStatus=" + encodeURIComponent(newStatusStr);
    chgStatusRqst.open("POST", "Controller?asyncAction=changeStatus", true);
    chgStatusRqst.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    chgStatusRqst.send(information);

    console.log(chgStatusRqst)

    var currentStatus = document.getElementById("currStat");
    if (newStatusStr === "") {
        currentStatus.innerHTML = "online"
    } else {
        currentStatus.innerHTML = newStatusStr;
    }

}

function setOnline() //sets the user as online properly and sets the created cookie as true
{

    if (document.cookie.toString() === "loggedIn=true")
        return;
    else {
        changeStatusWithStr("online");

    }
}

function setOffline() {
    changeStatusWithStr("offline")
    deleteCookie("loggedIn")
}


function start() //for body onload
{

    setOnline();
    changeStatusWithStr("online");

}



