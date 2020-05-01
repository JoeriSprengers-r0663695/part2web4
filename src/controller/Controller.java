package controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import domain.Person;
import domain.PersonService;
import domain.UserStatus;

@WebServlet("/Controller")
public class Controller extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	private PersonService model = new PersonService();
	private ControllerFactory controllerFactory = new ControllerFactory();

	public Controller() {
		super();
	}

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		processRequest(request, response);
	}

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		processRequest(request, response);
	}

	protected void processRequest(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {  if (request.getParameter("asyncAction") == null)
	{
		String action = request.getParameter("action");
		String destination = "index.jsp";
		if (action != null)
		{
			RequestHandler handler;

			try
			{
				handler = controllerFactory.getController(action, model);
				destination = handler.handleRequest(request, response);
			}
			catch (NotAuthorizedException exc)
			{
				List<String> errors = new ArrayList<String>();
				errors.add(exc.getMessage());
				request.setAttribute("errors", errors);
				destination = "index.jsp";
			}
		}
		RequestDispatcher view = request.getRequestDispatcher(destination);
		view.forward(request, response);
	}
	else
	{
		handelRequest(request, response);
	}

	}

	public void handelRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		String action = request.getParameter("asyncAction");

		if (action != null)
			switch (action)
			{
				case "changeStatus":
					changeStatus(request, response);
					break;
				case "getUserStatus":
					getStatus(request, response);
					break;
				case "getUser":
					getUser(request, response);
					break;
				case "getAllUsers":
					getAllUser(request, response);
					break;
				case "getFriends":
					getFriends(request, response);
					break;
				case "addFriend":
					addFriend(request, response);
					break;
			}
	}

	public String toJSON(Object object) throws JsonProcessingException
	{
		ObjectMapper mapper = new ObjectMapper();
		return mapper.writeValueAsString(object);
	}

	private void addFriend(HttpServletRequest request, HttpServletResponse response)
	{
		String username1 = request.getParameter("username1").trim();
		String username2 = request.getParameter("username2").trim();
		if(!username1.equals(username2))
		{
			if (!(username1 == null || username2 == null) ||
					!(username1.isEmpty() || username2.isEmpty()))
			{
				if (model.getPersonExists(username2)
						&& !model.getPerson(username1).friendInFriendListAlreadyExists(username2))
				{
					model.addPersonToFriend(username1, model.getPerson(username2));
					model.addPersonToFriend(username2, model.getPerson(username1));
				}
			}
		}
	}

	private void getFriends(HttpServletRequest request, HttpServletResponse response) throws IOException
	{
		if (request.getParameter("username") != null)
		{
			List<Person> friendList = model.getFriendsList(request.getParameter("username"));
			String friendJson = this.toJSON(friendList);
			response.setContentType("application/json");
			response.getWriter().write(friendJson);
		}
	}


	private void getUser(HttpServletRequest request, HttpServletResponse response) throws IOException
	{
		String userId = request.getParameter("username");
		if (!(model.getPerson(userId) == null) || !userId.isEmpty())
		{
			String userJSON = this.toJSON(model.getPerson(userId));
			response.setContentType("application/json");
			response.getWriter().write(userJSON);
		}
	}

	private void getAllUser(HttpServletRequest request, HttpServletResponse response) throws IOException
	{
		String userJSON = this.toJSON(model.getPersons());
		response.setContentType("application/json");
		response.getWriter().write(userJSON);
	}

	private void getStatus(HttpServletRequest request, HttpServletResponse response) throws IOException
	{
		if (request.getParameter("username") != null)
		{
			UserStatus userStatusT = model.getPerson(request.getParameter("username")).getUserStatus();
			String statusJSON = this.toJSON(userStatusT);
			response.setContentType("application/json");
			response.getWriter().write(statusJSON);
		}
		else
		{
			Person person = (Person) request.getSession().getAttribute("user");
			UserStatus userStatus = model.getPerson(person.getUserId()).getUserStatus();
			String statusJSON = this.toJSON(userStatus);
			response.setContentType("application/json");
			response.getWriter().write(statusJSON);
		}

	}

	private void changeStatus(HttpServletRequest request, HttpServletResponse response)
	{
		if (request.getParameter("username") != null)
		{
			UserStatus newStatus = UserStatus.strToStatus(request.getParameter("newStatus"));
			model.getPerson(request.getParameter("username")).setUserStatus(newStatus);
		}
		else
		{
			Person person = (Person) request.getSession().getAttribute("user");
			UserStatus newStatus = UserStatus.strToStatus(request.getParameter("newStatus"));
			model.getPerson(person.getUserId()).setUserStatus(newStatus);
		}
	}

}
