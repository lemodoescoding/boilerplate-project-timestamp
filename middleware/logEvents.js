const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const fs = require('fs');
const fsPromise = fs.promises;
const path = require('path');

const logEvents = async function(message, filename){
  const date = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${date}\t${uuid()}\t${message}`;

  try {
    if(!fs.existsSync(path.join(__dirname, '..', 'logs'))){
      await fsPromise.mkdir(path.join(__dirname, '..', 'logs'));
    }

    await fsPromise.appendFile(
      path.join(__dirname, '..', 'logs', filename),
      logItem
    )
  } catch (err){
    console.error(err);
  }
}

const reqLogger = function(req, res, next){
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLogs.txt');
  console.log(`${req.method} ${req.path}`);

  next();
}

module.exports = { logEvents, reqLogger };
