import { readFile } from "node:fs/promises";
//lee los dos a la vez, y cuando este todo, devuelve todo a la vez de una
Promise.all([
  readFile("./archivo.txt", "utf-8"),
  readFile("./archivo2.txt", "utf-8"),
]).then(([text, secondText]) => {
  console.log("primer texto:", text);
  console.log("segundo texto:", secondText);
});
