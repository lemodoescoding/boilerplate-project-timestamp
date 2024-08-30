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

  if(checkValidDate.test(unixtime)){
    const dateProvided = new Date(`${unixtime}T00:00:00+0000`);

    return res.json({
      'unix': dateProvided.getTime(),
      'utc': dateProvided.toUTCString()
    })
  }

  if(new Date(unixtime)){
    return res.json({
      'unix': new Date(unixtime).getTime(),
      'utc': new Date('unixtime').toUTCString()
    })
  }

  return res.json({"error": "Invalid Date"});
}

module.exports = { handleDateAPI };
