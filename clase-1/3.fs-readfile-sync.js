const fs = require("node:fs");
//aquí es síncrono, de modo que se bloquea el proceso hasta que se resuelva la solicitud.
console.log("Leyendo el primer archivo...");
const text = fs.readFileSync("./archivo.txt", "utf-8");
console.log("primer texto:", text);

console.log("--> Hacer cosas mientras lee el archivo...");

console.log("Leyendo el segundo archivo...");
const secondText = fs.readFileSync("./archivo2.txt", "utf-8");
console.log("segundo texto:", secondText);
