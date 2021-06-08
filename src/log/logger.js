// const { appendFile } = require('fs')
const { appendFile } = require('fs')
const { join } = require('path')

const moment = require('moment')

function logger(req, res){

  const { ip, hostname, method, baseUrl } = req
  const { headersSent } = res

  const logFilePath = join(__dirname, 'log.txt')
  const date = new Date()
  moment().locale()
  const dateFormat = moment().format('YYYY/MM/DD, hh:mm:ss a')
  const data = `date: ${dateFormat}, ip: ${ip}, hostname: ${hostname} method: ${method} baseUrl: ${baseUrl}\n
    loc: ${headersSent}
  `
  // const data = `${req.toString()}\n`

  appendFile(logFilePath, data, 'utf8', (err) => {
    if (err) {
      console.log('The "data to append" was appended to file!', err);
      throw err;
    }
    else {
      console.log('Log was appended to file succesfully!');
    }
  })
}

module.exports = logger
