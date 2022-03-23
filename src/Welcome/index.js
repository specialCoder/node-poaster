const fs = require("fs");
// const babelParser = require("@babel/parser");
const { getTree } = require("./utils/getTree");

const demo1 = "/Welcome/index.js";
const demo2 = "/Welcome/demo.js";
const content = fs.readFileSync(`${__dirname}${demo1}`, "utf8");
// const ast = babelParser.parse(content, {
//   sourceType: "module",
//   plugins: ["jsx"],
// });
// console.log(JSON.stringify(ast));
console.log(JSON.stringify(getTree(content)));
