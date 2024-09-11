import {
  platform,
  version,
  arch,
  cpus,
  freemem,
  totalmem,
  uptime,
} from "node:os";
console.log("Info del SO");
console.log("-----------------");
console.log("Nombre del SO", platform());
console.log("Versión del SO", version());
console.log("Arquitectura del SO", arch());
console.log("CPUS:", cpus());
console.log("Memoria libre", freemem() / 1024 / 1024);
console.log("Memoria total", totalmem() / 1024 / 1024);
console.log("uptime", uptime() / 60 / 60);
