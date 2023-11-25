const express = require('express'); //Import the express dependency
const fileReader = require('fs');   //Import the file reader
const database = require("nedb");   //Import the datastore
const app = express();              //Instantiate an express app, the main work horse of this server
const port = 5000;                  //Save the port number where your server will be listening
const XMLHttpRequest = require("xmlhttprequest");

//Idiomatic expression in express to route and respond to a client request
app.get('/', (req, res) => {        //get requests to the root ("/") will route here

    let groupName = req.query.groupId;

    var xmlHttp = XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            console.log(xmlHttp.responseText);
            res.send("<script>alert('success');</script>");
            res.sendStatus(200);
        } else {
            res.send("<script>alert('failed');</script>");
            res.sendStatus(504);
        }
    }
    
    xmlHttp.open("GET", `https://groups.roblox.com/v1/groups/search?keyword=${groupName}&prioritizeExactMatch=true&limit=10`, true); // true for asynchronous 
    xmlHttp.send(null);
});

app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`); 
});
