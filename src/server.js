const http = require('http')
const data = require('./dataTable.json')

http.createServer(function (request, response) {
    response.writeHead(200, {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
    })
    response.end(JSON.stringify(data))
}).listen(4000)