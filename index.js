const express = require('express');
const app = express();


const { reqLogger } = require('./middleware/logEvents');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
const { handleDateAPI } = require('./middleware/dateAPI');

app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

app.use(reqLogger);

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:unixtime", handleDateAPI);
app.get("/api", handleDateAPI);

// Listen on port set in environment variable or default to 3000
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
