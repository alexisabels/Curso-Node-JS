const fs = require("node:fs");
//CALLBACK: aqui los empieza a leer y devuelve segun van saliendo resultados, sin importar el orden.
console.log("Leyendo el primer archivo...");
fs.readFile("./archivo.txt", "utf-8", (err, text) => {
  // ejecuta este callback
  console.log("primer texto:", text);
});

console.log("--> Hacer cosas mientras lee el archivo...");

console.log("Leyendo el segundo archivo...");
fs.readFile("./archivo2.txt", "utf-8", (err, text) => {
  console.log("segundo texto:", text);
});
