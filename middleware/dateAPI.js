const { format } = require('date-fns');
const { formatInTimeZone } = require('date-fns-tz')

const handleDateAPI = (req, res) => {

  const checkUnixTime = /\d{5,}/g;
  const checkValidDate = /(\d{4})\-(0[1-9]|1[1-2])\-(0[1-9]|[12]\d|3[01])/g;

  if(!req.params.hasOwnProperty('unixtime')){
    return res.json({
      'unix': new Date().getTime(),
      'utc': new Date().toUTCString()
    })
  }

  const { unixtime } = req.params;

  if(checkUnixTime.test(unixtime)){
    const unix = parseInt(unixtime);

    return res.json({
      'unix': unix,
      'utc': new Date(unix).toUTCString()
    })
  }
  
  const dateProvided = new Date(unixtime);

  if(dateProvided.toString() === "Invalid Date"){

    return res.json({"error": "Invalid Date"});
  } else {
    return res.json({
      "unix": dateProvided.getTime(),
      "utc": dateProvided.toUTCString()
    })
  }
  
}

module.exports = { handleDateAPI };
