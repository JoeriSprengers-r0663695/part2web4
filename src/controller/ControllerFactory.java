package controller;

import domain.PersonService;

public class ControllerFactory {
	
    public RequestHandler getController(String key, PersonService model) {
        return createHandler(key, model);
    }
    
	private RequestHandler createHandler(String handlerName, PersonService model) {
		RequestHandler handler = null;
		try {
			System.out.println("a");

			Class<?> handlerClass = Class.forName("controller."+ handlerName);
			System.out.println("b");

			Object handlerObject = handlerClass.newInstance();
			handler = (RequestHandler) handlerObject;
	    	handler.setModel(model);
		} catch (Exception e) {
			System.out.println("c");
			throw new RuntimeException("Deze pagina bestaat niet!!!!");
		}
		return handler;
	}


}
