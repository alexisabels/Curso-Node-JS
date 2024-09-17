const path = require("node:path");

console.log(path.sep); //barra separadora de carpetas segun SO

//puedes unir rutas con path.join
const filePath = path.join("content", "subfolder", "test.txt");
console.log(filePath);

const base = path.basename("asdasd/asdasd/asdsad/img.txt", ".txt");
console.log(base);

const extension = path.extname("img.jpeg");
console.log(extension);
