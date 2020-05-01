
var webSocket;

var backB = document.getElementById("backB")
backB.onclick = closeSocket;
//wanneer er op deze knop gedrukt wordt activeer deze functie

var sendB = document.getElementById("postCommentB")
//Zoek deze id in de jsp pagina

sendB.onclick = send;
//wanneer er op deze knop gedrukt wordt activeer deze functie

window.onload = openSocket;
//bij het opstarten, voer deze functie uit





function openSocket() {
    webSocket = new WebSocket("ws://localhost:8080/comment");
    //er staat een websocket op poort 8080
    webSocket.onopen = function (event) {
        // Wanneer deze pagina geopend wordt vorr deze functie uit
    };

    webSocket.onmessage = function (event) {
        writeResponse(event.data);
        // Wanneer er op deze pagina data wordt bevestigd voer deze functie uit
    };

    webSocket.onclose = function (event) {

    };
}

function send()
{
    var comment =  {};

    comment.name = document.getElementById('name' ).value;
    // haal de waardes op van deze id's

    comment.comment = document.getElementById('comment' ).value;

    comment.rating = document.getElementById( 'rating').value;

    webSocket.send(JSON.stringify(comment));
    //stuur die als een string op in json opbject
}

function closeSocket()
{
    webSocket.close();
    //sluit de websocjet
}

function writeResponse(text)
{

    //ontvangt het json object en gaat deze uiteindelijk kopêlen aan een html element en die dan tonen op de webpagina
    var result = JSON.parse(text);

    var commentSection = document.getElementById("commentSection");
    var commentDiv = document.createElement("div");
    var anonName = document.createTextNode("Username: " +result.name );
    var comment = document.createTextNode(( " (" + " Geeft als rating  " + result.rating + "/10) : " + result.comment));

    var elementComment = document.createElement("p");
    var elementName = document.createElement("p");

    commentDiv.id = "card";

    elementName.appendChild(anonName);
    elementComment.appendChild(comment);
    commentDiv.appendChild(anonName);
    commentDiv.appendChild(elementComment);
    commentSection.appendChild(commentDiv);

}
