const { format } = require('date-fns');
const { formatInTimeZone } = require('date-fns-tz')

const handleDateAPI = (req, res) => {
  const { unixtime } = req.params;

  const checkDateRegex = /(\d{4})\-(0[1-9]|1[1-2])\-(0[1-9]|[12]\d|3[01])/gi;

  let finalRes = {};

  if(!unixtime.includes('-')){
    const dateProvided = new Date(parseInt(Math.abs(unixtime)));

    finalRes.unix = parseInt(dateProvided.getTime());
    finalRes.utc = formatInTimeZone(dateProvided, 'Europe/London', 'E, dd LLL yyyy HH:mm:ss zzz');
  }

  if(unixtime.match(checkDateRegex)){
    const [year, month, day] = unixtime.split('-');
    
    const dateProvided = new Date(`${year}-${month}-${day}T00:00:00+0000`);

    finalRes.unix = parseInt(dateProvided.getTime());
    finalRes.utc = formatInTimeZone(dateProvided, 'Europe/London', 'E, dd LLL yyyy HH:mm:ss zzz');
  }

  return res.status(200).json(finalRes);
}

module.exports = { handleDateAPI };
