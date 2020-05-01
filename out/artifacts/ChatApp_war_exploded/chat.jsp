<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<jsp:include page="head.jsp">
    <jsp:param name="title" value="ChatApp" />
</jsp:include>
<body onload="getChatOffline();getOnlineRecursive();" class="bg-secondary" >
<jsp:include page="header.jsp">
    <jsp:param name="title" value="Chat" />
</jsp:include>
<link rel="stylesheet" type="text/css" href="css/chatCss.css">
<main>
    <div class="container">
        <h2>Welcome <span id="mainUser">${user.getUserId()}</span>!</h2>
        <p>Als ${user.getFirstName()} ${user.getLastName()}</p>

        <div class="card col-sm-10 mb-5 p-2">
            <div class="card-body">
               <p>Current Status: <span id="currStat"> </span></p>

                <p>Change Status:
                    <input type="text" name="userStatus" id="newStatus" list="userStats">
                    <datalist id="userStats">
                        <option value="online">
                        <option value="offline">
                        <option value="away">
                    </datalist>
                    </select>
                </p>

                <input class="btn btn-primary" type="button" id="chgStatusB" value="Change Status"/>

                <form method="post" action="Controller?action=LogOut">
                    <input class="btn btn-primary" type="submit" id="logoutbutton" value="Log Out">
                </form>
                <form method="post" action="Controller?action=Home">
                    <input class="btn btn-primary" type="submit" id="index" value="Home">
                </form>

            </div>
        </div>
    </div>
</main>

<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<script type="text/javascript" src="js/countOnline.js"></script>
<script type="text/javascript" src="js/statusAndFriendlist.js"></script>

<jsp:include page="footer.jsp">
    <jsp:param name="title" value="Home" />
</jsp:include>
</body>
</html>
