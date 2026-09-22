const http = require('node:http');

const port = Number(process.env.PORT) || 3000;

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200);
    res.end(JSON.stringify({ status: 'ok' }));
    return;
  }

  if (req.method === 'GET' && req.url === '/api/message') {
    res.writeHead(200);
    res.end(JSON.stringify({ message: 'Hello from the Node.js backend!' }));
    return;
  }

  res.writeHead(404);
  res.end(JSON.stringify({ error: 'Not found' }));
});

if (require.main === module) {
  server.listen(port, () => {
    console.log(`Backend listening on http://localhost:${port}`);
  });
}

module.exports = server;
