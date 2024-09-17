const { error } = require("node:console");
const fs = require("node:fs");
fs.readdir(".", (err, files) => {
  if (err) {
    console.log(err);
    return;
  }
  files.forEach((file) => {
    console.log(file);
  });
});
