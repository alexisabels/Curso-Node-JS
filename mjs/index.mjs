// .js por defecto utiliza CommonJS
// .mjs para utilizar ES Modules
// .cjs para CommonJS
import { sum } from "./sum.mjs";
import { sub } from "./sum.mjs";
import { mult } from "./sum.mjs";

console.log(sum(1, 2, 3));
console.log(sub(1, 2, 3));
console.log(mult(1, 2, 3));
