<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<jsp:include page="head.jsp">
    <jsp:param name="title" value="ChatApp" />
</jsp:include>
<jsp:include page="header.jsp">
    <jsp:param name="title" value="Chat" />
</jsp:include>
<body onload="start();">
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
    <div class="card col-sm-6 mb-5 p-2">
        <div class="card-body">
            <h2>Friends</h2>
            <h3>Add friend</h3>
            <p>Write the name of the friend you want to add:</p>
            <input type="text" name="Friend" id="newFriend" value="an555">
            <input type="button" class="btn btn-primary" id="addFriendB" value="Add this friend!">
            <div class="mt-5">
                <h3>Friendslist</h3>
                <input type="button" class="btn btn-primary" id="toggleFriendList" value="Show/Hide friendlist">
                <table class="table" id="tableFriendlist">
                    <thead>
                    <tr>
                        <th scope="col">Username</th>
                        <th scope="col">Status</th>
                    </tr>
                    </thead>
                    <tbody id="friendList">
                    </tbody>
                </table>
            </div>
        </div>
    </div>

</main>

<script type="text/javascript" src="js/statusAndFriendlist.js"></script>

<jsp:include page="footer.jsp">
    <jsp:param name="title" value="Home" />
</jsp:include>
</body>
</html>
