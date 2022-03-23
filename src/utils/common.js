const fs = require("fs");
const path = require("path");

const getFileContent = (filename) => fs.readFileSync(path.join(__dirname, "../demo", filename), "utf8");

const transform = (code) => {
    return require("@babel/core").transformSync(code, {
        presets: ["@babel/preset-react"],
      });
}

module.exports = {
    getFileContent,
    transform
}