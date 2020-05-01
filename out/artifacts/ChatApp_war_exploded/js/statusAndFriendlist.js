var chgStatusRqst = new XMLHttpRequest();
var addFriendRqst = new XMLHttpRequest();
var getFriendListRqst = new XMLHttpRequest();





getFriendListRecursive();
setTimeout(getOnlineRecursive,2000);
setTimeout(getOfflineRecursive,2000)

var newStatusB = document.getElementById("chgStatusB");
newStatusB.onclick = changeStatus;

var newStatusB = document.getElementById("chgStatusB");
newStatusB.onclick = changeStatus;

var addFriendB = document.getElementById("addFriendB");
addFriendB.onclick = addFriend;

var logoutB = document.getElementById("logoutbutton");
logoutB.onclick = setOffline;

window.onload = start;

/*

function onlinePersons() {

    getOnlineListRqst.open("GET", "Controller?asyncAction=getOnlineFriends", true)
    getOnlineListRqst.onreadystatechange = getOnlineStat();

    getOnlineListRqst.send();
}
*/

/*
function offlinePersons() {
    getOnlineListRqst.open("GET", "Controller?asyncAction=getOfflineFriends", true)
    getOnlineListRqst.onreadystatechange = getFriendListData;
    getOnlineListRqst.send();
}
*/

/*function getOnlineStat() {
    if (getOnlineListRqst.status == 200) {
        if (getOnlineListRqst.readyState == 4) {
            var onlineFriends = getOnlineListRqst.responseText;
            var onlineDiv = document.getElementById("online")
            var onlineP = onlineDiv.childNodes[0];
            if (onlineP == null) {
                onlineP = document.createElement('p');
                onlineP.id = "onlineT";
                var onlineT = document.createTextNode(onlineFriends);
                onlineP.appendChild(onlineT);
                onlineDiv.appendChild(onlineP);
            } else {
                var onlineT = document.createTextNode(onlineFriends);
                onlineP.removeChild(onlineP.childNodes[0]);
                onlineP.appendChild(onlineT);
            }
            setTimeout("getOnlineStat() ", 200);
        }

    }
}*/

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

//Friendlist functions
function addFriend() //adds friend
{
    var username1 = document.getElementById("mainUser").textContent;
    var username2 = document.getElementById("newFriend").value;
    if (username2 == "") {
        alert("Empty username!")
    } else {
        var information = "username1=" + encodeURIComponent(username1) +
            "&username2=" + encodeURIComponent(username2)

        addFriendRqst.open("POST", "Controller?asyncAction=addFriend", true);
        addFriendRqst.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        addFriendRqst.send(information);

        getFriendList();
    }
}


function getFriendList() {
    var currUsername = document.getElementById("mainUser").textContent;
    var information = "&username=" + encodeURIComponent(currUsername);
    getFriendListRqst.open("GET", "Controller?asyncAction=getFriends" + information, true)
    getFriendListRqst.onreadystatechange = getFriendListData;
    getFriendListRqst.send();
}


function getFriendListData() {
    if (getFriendListRqst.readyState == 4) {
        if (getFriendListRqst.status == 200) {
            var serverResponse = JSON.parse(getFriendListRqst.responseText);
            var friendList = serverResponse;
            var friendListTableBody = document.getElementById("friendList");
            while (friendListTableBody.firstChild) {
                friendListTableBody.removeChild(friendListTableBody.firstChild);
            }

            for (var i = 0; i < friendList.length; i++) {
                var username = friendList[i]["userId"];
                var status = friendList[i]["statusStr"];

                var friendListTableRow = document.createElement("tr");
                friendListTableRow.id = "tableRow" + i;

                var friendListTableDataUsername = document.createElement("td");
                friendListTableDataUsername.innerHTML = username;

                var friendListTableDataStatus = document.createElement("td");
                friendListTableDataStatus.innerHTML = status;



                friendListTableRow.appendChild(friendListTableDataUsername);
                friendListTableRow.appendChild(friendListTableDataStatus);

                friendListTableBody.appendChild(friendListTableRow);
            }
        }
    }
}





function getFriendListRecursive() {
    getFriendList();

    setTimeout(getFriendListRecursive, 5000);
}


function getOnlineRecursive() {

    setTimeout(getOnlineRecursive, 5000);
}
function getOfflineRecursive() {

    setTimeout(getOfflineRecursive, 5000);
}


