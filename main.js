const express = require('express'); //Import the express dependency
const fileReader = require('fs');   //Import the file reader
const database = require("nedb");   //Import the datastore
const app = express();              //Instantiate an express app, the main work horse of this server
const port = 5000;                  //Save the port number where your server will be listening

const authDatastore = new database({filename: "./db.txt", autoload: true});

function verifyHash(inputString) {
    return inputString;
}

function verify(inputString) {
    let hash = verifyHash(inputString);
    return (hash != null)? true : false;
}

//Idiomatic expression in express to route and respond to a client request
app.get('/', (req, res) => {        //get requests to the root ("/") will route here
    let verified = false;

    let registerNew = req.query.regNew || false;
    let gameId = req.query.gameId;
    let authKey = req.query.authKey;

    let dump = req.query.dump || false;

    if (dump) {
        console.log("dumping Data of datastore");
    }

    if (registerNew) {
        if (verify(authKey)) {
            authDatastore.insert({key: authKey, id: null}, function(err, newDoc) { console.log("newDoc:", newDoc); });
        }
                   
    } else {
        authDatastore.findOne({key: verifyHash(authKey)}, function(err, doc) {
            if (doc != null) {
                if (doc.id == null) {
                    // Set an existing field's value
                    authDatastore.update({ key: verifyHash(authKey) }, { $set: { id: gameId } }, { multi: true }, function (err, numReplaced) { console.log("Replaced:", numReplaced, "entities!"});
                
                } else {
                    if (doc.id == gameId && doc.key == verifyHash(authKey)) {
                        verified = true;
                    }
                }
            }
        });
    }

    console.log(gameId, authKey, registerNew, dump);

    res.sendStatus((verified === false)? 403 : 200);
});

app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`); 
});

