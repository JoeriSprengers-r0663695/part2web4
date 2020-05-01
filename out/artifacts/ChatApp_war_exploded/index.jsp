<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html>
<jsp:include page="head.jsp">
	<jsp:param name="title" value="Home" />
</jsp:include>
<body>
	<jsp:include page="header.jsp">
		<jsp:param name="title" value="Home" />
	</jsp:include>
	<main>
<c:if test="${errors.size()>0 }">
	<div class="danger">
		<ul>
			<c:forEach var="error" items="${errors }">
				<li>${error }</li>
			</c:forEach>
		</ul>
	</div>
</c:if> <c:choose>
	<c:when test="${user!=null}">
		<p>Welcome ${user.getFirstName()}!</p>
		<form method="post" action="Controller?action=LogOut">
			<div class="card col-sm-10 mb-5 p-2">
				<h3><a href="Controller?action=Chat">chat</a></h3>
			</div>
			<p>
				<input type="submit" id="logoutbutton" value="Log Out">
			</p>
		</form>
	</c:when>
	<c:otherwise>
		<form method="post" action="Controller?action=LogIn">
			<p>
				<label for="email">Your email </label>
				<input type="text" id="email" name="email" value="jan123">
			</p>
			<p>
				<label for="password">Your password</label>
				<input type="password" id="password" name="password" value="t">
			</p>
			<p>
				<input type="submit" id="loginbutton" value="Log in">
			</p>
		</form>
	</c:otherwise>
</c:choose>




		<div class="card col-sm-10 mb-5 p-2">
			<h3>Blog posts</h3>
			<div class="list-group">
				<a href="Controller?action=GetComment&commentNmbr=1" class="list-group-item list-group-item-action">Was het een interessante projectweek?</a>
				<a href="Controller?action=GetComment&commentNmbr=2" class="list-group-item list-group-item-action">Wat ben je van plan om te doen vandaag?</a>
				<a href="Controller?action=GetComment&commentNmbr=3" class="list-group-item list-group-item-action">Naar welke muziek ben je momenteel aan het luisteren?</a>
				<a href="Controller?action=GetComment&commentNmbr=4" class="list-group-item list-group-item-action">Wat zijn de examenvragen voor het vak Web4?</a>
				<a href="Controller?action=GetComment&commentNmbr=5" class="list-group-item list-group-item-action">Wat ga je doen na u studies?</a>
				<a href="Controller?action=GetComment&commentNmbr=6" class="list-group-item list-group-item-action">Wat ga je doen na u studies?</a>
				<a href="Controller?action=GetComment&commentNmbr=7" class="list-group-item list-group-item-action">Wat ga je doen na u studies?</a>
			</div>
		</div>

	</main>
	<script type="text/javascript" src="js/blog.js"></script>

	<jsp:include page="footer.jsp">
		<jsp:param name="title" value="Home" />
	</jsp:include>
</body>
</html>
