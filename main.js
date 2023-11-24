const express = require('express'); //Import the express dependency
const fileReader = require('fs');   //Import the file reader
const database = require("nedb");   //Import the datastore
const app = express();              //Instantiate an express app, the main work horse of this server
const port = 5000;                  //Save the port number where your server will be listening


//Idiomatic expression in express to route and respond to a client request
app.get('/', (req, res) => {        //get requests to the root ("/") will route here

    let source = req.query.source;
    let sourceType = req.query.sourceType;

    if (sourceType == "name") {
        const Http = new XMLHttpRequest();
        const url='https://groups.roblox.com/v1/groups/search?keyword=Arsenal%20Pro%20&prioritizeExactMatch=true&limit=10';
        Http.open("GET", url, true);
        Http.onreadystatechange = function()
        {
            if(Http.readyState == 4 && Http.status == 200) {
                console.log(Http.responseText);
            } else {
                alert("NEEE");
            }
        }
        Http.send(null);  
    } 
});

app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`); 
});

