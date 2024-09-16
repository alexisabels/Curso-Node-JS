const http = require("node:http");
const { findAvailablePort } = require("./10.free-port.js");
const server = http.createServer((req, res) => {
  console.log("Request received");
  res.end("Hola mundo");
});

findAvailablePort(1234).then((port) => {
  server.listen(port, () => {
    console.log(`server escuchando en puerto http://localhost:${port}`);
  });
});
