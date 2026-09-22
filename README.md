# Node.js backend

A small dependency-free Node.js HTTP backend.

## Run locally

```bash
npm start
```

The server listens on port `3000` by default. Set `PORT` to use another port.

## Endpoints

- `GET /health` — returns the service health status.
- `GET /api/message` — returns a sample JSON message.
