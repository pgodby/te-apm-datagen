require('isomorphic-fetch');
const express = require('express');
const app = express();

let config = {
  name: "PAYMENT",
  port: 3000,
  code: 200,
  delay: 0,
  services: []
};

// whoami
app.get("/info", (req, res) => {
  res.status(200).json({ message: `Hello from service [${config.name}]!` });
});

// configuration URL for HTTP response
app.get("/config", (req, res) => {
  config.code = parseInt(req.query.code);
  config.delay = parseInt(req.query.delay);
  console.log(`\r\n[${config.name}] set configuration to: code=${config.code}, delay=${config.delay}\r\n`);
  res.status(200).json({});
});

// demo URL
app.get("/api", async (req, res) => {
  for (const service of config.services) {
    fetch(`http://${service}:3000/api`)
      .then(res => {
        console.log(`[${config.name}] to [${service}] returned: ${res.status} ${res.statusText}`);
      })
      .catch(err => {
        console.log(`[${config.name}] request to ${service} failed!`);    
      });
  }

  setTimeout((() => {
    res.status(config.code).json({});
  }), config.delay * 1000);
});

// All other GET requests
app.get("*", (req, res) => {
  res.status(404).json({});
});

// start the server
app.listen(config.port, () => {
  console.log(`[${config.name}] server listening on port ${config.port}`);
});