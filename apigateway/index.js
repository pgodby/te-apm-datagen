require('isomorphic-fetch');
const express = require('express');
const app = express();

let config = {
  name: "APIGATEWAY",
  port: 3000,
  code: 200,
  delay: 0,
  services: ["AD","CART","CATALOG","CHECKOUT"]
};

// whoami
app.get("/info", (req, res) => {
  res.status(200).json({ message: `Hello from service [${config.name}]!` });
});

// configuration URL for HTTP response
app.get("/config", (req, res) => {
  fetch(`http://${req.query.service}:3000/config?code=${req.query.code}&delay=${req.query.delay}`)
    .catch(err => {
      console.log(`[${config.name}] configuration request to [${req.query.service}] failed!`);    
    });
  res.status(200).json({});
});

// demo URL
app.get("/api", async (req, res) => {
  console.log("\r\n***** API GATEWAY: New simulation *****");
  for (const service of config.services) {
    fetch(`http://${service}:3000/api`)
      .then(res2 => {
        console.log(`[${config.name}] to [${service}] returned: ${res2.status} ${res2.statusText}`);
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