// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require('body-parser');
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
const server = app.listen(port, listening);
function listening() {
  console.log('server running');
  console.log(`running on localhost: ${port}`);
}

// GET Request with 'gdata' route to return projectData object
app.get('/gdata', function (req, res) {
  res.send(projectData);
});
// POST Request with 'pdata' route to add data to projectData object
app.post('/pdata', function (req, res) {
  // console.log(req.body);
  let newData = req.body;
  projectData.temperature = newData.temperature;
  projectData.date = newData.date;
  projectData.userResponse = newData.userResponse;
});
