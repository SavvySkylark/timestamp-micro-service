// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/:timestamp", function (req, res) {
  var timestampString = req.params.timestamp;
  var datetime;
  var resBody = {
    unix: null,
    natural: null
  }
  
  var milliSecs = Date.parse(timestampString);
  
  if (isNaN(milliSecs)) {
    res.end(JSON.stringify(resBody));
  } else {
    datetime = new Date(milliSecs);
    resBody.unix = datetime.valueOf();
    resBody.natural = datetime.toDateString();
  }
  res.end(JSON.stringify(resBody));
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

