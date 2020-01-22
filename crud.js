const http = require('http');
const userOperations = require('./crudOperations');
const port = 3000;

const server = http.createServer((req, res) => {
  let body = '';
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/JSON');
  switch (req.url, req.method) {
    case ('/add', 'POST'):
      req.on('data', function (data) {
        body = body + data;
      });
      req.on('end', function () {
        res.end(userOperations.addUser(body));
      });
      break;
    case ('/delete', 'DELETE'):
      req.on('data', function (data) {        
        body = body + data;
      });
      req.on('end', function () {
        res.end(userOperations.deleteUser(JSON.parse(body)));
      });
      break;
    case ('/edit', 'PUT'):
      req.on('data', function (data) {
        body = body + data;
      });
      req.on('end', function () {
        res.end(userOperations.updateUser(JSON.parse(body)));
      });
      break;
    case ('/read', 'GET'):
      req.on('data', function (data) {
        body = body + data;
      });
      req.on('end', function () {
        res.end(userOperations.getUser(JSON.parse(body)));
      });
      break;
    default:
      break;
  }
}).listen(port, () => {
  console.log(`Server running at ${port} `);
});
