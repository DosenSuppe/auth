const express = require('express'); //Import the express dependency
const app = express();              //Instantiate an express app, the main work horse of this server
const port = 5000;                  //Save the port number where your server will be listening
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

//Idiomatic expression in express to route and respond to a client request
app.get('/', (req, res) => {        //get requests to the root ("/") will route here
    let method = req.query.method;
    console.log(method);
    
    if (method == "getGroup") {
        let searchPhrase = req.query.searchPhrase;
        var xmlHttp = new XMLHttpRequest();

        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                console.log("success");
                res.send(xmlHttp.responseText);
            } else {
                console.log("waiting " + xmlHttp.status);
            }
        }
        
        xmlHttp.open("GET", `https://groups.roblox.com/v1/groups/search?keyword=${searchPhrase}&prioritizeExactMatch=true&limit=10`, true); // true for asynchronous 
        xmlHttp.send(null);
        
    } else if (method == "getMembers") { // might wanna change to where this part get the entire member list before sending it off again
        let groupId = req.query.groupId;
        let nextPage = req.query.cursor;

        console.log(groupId + " : " + nextPage);
        
        var xmlHttp = new XMLHttpRequest();

        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                console.log("success");
                res.send(xmlHttp.responseText);
            } else {
                console.log("waiting " + xmlHttp.status);
            }
        }
        
        if (nextPage == "nil") {
            console.log("no page given");
            xmlHttp.open("GET", `https://groups.roblox.com/v1/groups/${groupId}/users?limit=100&sortOrder=Asc`, true); // true for asynchronous 
        } else {
            console.log("page given: " + nextPage);
            xmlHttp.open("GET", `https://groups.roblox.com/v1/groups/${groupId}/users?limit=100&cursor=${nextPage}&sortOrder=Asc`, true); // true for asynchronous 
        }
        xmlHttp.send(null);
        
    } else {
        res.sendStatus(504);
    }

    
});

app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`); 
});
