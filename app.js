const express = require('express');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;

let visitorCount = 0;

app.get('/', (req, res) => {
  visitorCount++;
  const containerId = os.hostname();          // this is the Pod/container ID
  const timestamp = new Date().toISOString();

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="refresh" content="5">
      <title>Cloud Computing Project</title>
      <style>
        body { font-family: system-ui, sans-serif; background:#0f172a; color:#e2e8f0;
               display:flex; align-items:center; justify-content:center; min-height:100vh; margin:0; }
        .card { background:#1e293b; padding:40px 50px; border-radius:16px;
                box-shadow:0 10px 40px rgba(0,0,0,.5); border:1px solid #334155; max-width:520px; }
        h1 { color:#22d3ee; margin-top:0; }
        .row { margin:14px 0; font-size:18px; }
        .label { color:#94a3b8; }
        .val { color:#a78bfa; font-weight:600; }
        code { background:#0f172a; padding:2px 8px; border-radius:6px; }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>🚀 Running on Kubernetes</h1>
        <div class="row"><span class="label">Timestamp:</span> <span class="val">${timestamp}</span></div>
        <div class="row"><span class="label">Container ID:</span> <code>${containerId}</code></div>
        <div class="row"><span class="label">Visitor count (this pod):</span> <span class="val">${visitorCount}</span></div>
        <div class="row label">Page auto-refreshes every 5s</div>
      </div>
    </body>
    </html>
  `);
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    uptime: process.uptime(),
    container: os.hostname()
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});