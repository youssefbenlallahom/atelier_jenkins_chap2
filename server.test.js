const http = require('node:http');
const server = require('./server');

let baseUrl;

beforeAll((done) => {
  server.listen(0, () => {
    const { port } = server.address();
    baseUrl = `http://127.0.0.1:${port}`;
    done();
  });
});

afterAll((done) => {
  server.close(done);
});

function request(pathname) {
  return new Promise((resolve, reject) => {
    const req = http.request(`${baseUrl}${pathname}`, { method: 'GET' }, (res) => {
      let data = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          body: JSON.parse(data),
        });
      });
    });

    req.on('error', reject);
    req.end();
  });
}

test('GET /health returns 200 and status ok', async () => {
  const response = await request('/health');
  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual({ status: 'ok' });
});

test('GET /api/message returns 200 and backend message', async () => {
  const response = await request('/api/message');
  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual({ message: 'Hello from the Node.js backend!' });
});

test('unknown route returns 404', async () => {
  const response = await request('/unknown');
  expect(response.statusCode).toBe(404);
  expect(response.body).toEqual({ error: 'Not found' });
});
