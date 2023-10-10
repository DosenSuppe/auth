const express = require('express'); //Import the express dependency
const fileReader = require('fs');   //Import the file reader
const database = require("nedb");   //Import the datastore
const app = express();              //Instantiate an express app, the main work horse of this server
const port = 5000;                  //Save the port number where your server will be listening

const authDatastore = new database({filename: "./db.txt", autoload: true});


//Idiomatic expression in express to route and respond to a client request
app.get('/', (req, res) => {        //get requests to the root ("/") will route here
    let verified = false;

    let registerNew = req.query.regNew || false;
    let gameId = req.query.gameId;
    let authKey = req.query.authKey;

    if (registerNew) {
        if (verify(authKey)) {
            authDatastore.insert({key: authKey
        }
                   
    } else {
        authDatastore.findOne({key: authKey}, function(err, doc) {
            if (doc !== null) {
                if (doc.id === null) {
                    // Set an existing field's value
                    authDatastore.update({ key: authKey }, { $set: { id: gameId } }, { multi: true }, function (err, numReplaced) { console.log("Replaced:", numReplaced, "entities!"});
                }
            }
        });
    }

    console.log(gameId, authKey);

    res.sendStatus((verified === false)? 403 : 200);
});

app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`); 
});

console.log("YESSSS");
