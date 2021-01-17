// Setup empty JS object to act as endpoint for all routes
var projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
const server = app.listen(port,function(){console.log(`the server is running on localhost: ${port}`)});



/*GET and POST routes*/

//returns projectData to the client
app.get('/all',function(req,res){

    res.send(projectData);    

});

// gets the data from the API from the client side and pushes it into our
// object endpoint here on the server side.
app.post('/addData',function(req,res){

    let AllData = req.body;

    // inserts data into our endpoint (projectData).
    projectData['temp']=AllData.temp;
    projectData['date']=AllData.date;
    projectData['feeling']=AllData.feeling;

    res.send(projectData);
});