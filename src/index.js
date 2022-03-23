// const acorn = require("acorn");
// const jsx = require("acorn-jsx");
const fs = require('fs');
const path = require('path');
const ReactDOMServer = require('react-dom/server');
const { getFileContent, transform } = require("./utils/common");
const JsxParser = require("./parser/jsx-parser");
// const JsxParser = require("./lib/react-jsx-parser.min.js")['react-jsx-parser'].default;
// const renderResult = require("./transform");

// console.log("JsxParser==>", JsxParser);
const args = {
  foo:'foo',
  bar: 'bar',
  names:[{ label:'name1', value:1}, { label:'name2', value:2}],
  show: false,
  color:"#000"
//   myEventHandler: () => { /* ... do stuff ... */ },
};

async function main (tmpDir){
  // const { foo, bar, names } = args;
  const content = getFileContent("demo3.js");

  // const reactComponent = jsxParser(content)
  try{ 
    const code = transform(content).code;
    const firstPoint = code.indexOf('React');

    // 创建文件

    // 将内容写入临时文件，作为模块使用
    const tmpFile = await  writeFile(code.slice(firstPoint), tmpDir);

    const render = require(tmpFile);
    // React Component to Html string
    const result = renderToString(render(args));
    console.log('has result===>', result);
    // 删除临时文件
    delFile(tmpFile);
  } catch(err){
    console.log(`err ===> ${err}`);
  }
  // const fn = newFunc(`
  // console.log("arguments==>", arguments);

  // `);


  // const React = arguments[0]; 
  // const [${Object.keys(arguments[1]).reduce((pre,cur) => {
  //   pre += cur+',';
  //   return pre;
  // },'')}] = arguments[1];
  // return ${code.slice(firstPoint)}

  // const rr = fn(React,args);
  // console.log('rr-->', fn.toString(), rr);
  // console.log('str====>', JSON.stringify(str));
  // console.log('code==>', str.code);


  // const htm = ReactDOMServer.renderToStaticMarkup(reactComponent);
  // console.log("result-->", htm)

  // const reactComponent = renderResult(args);
  // const html = ReactDOMServer.renderToStaticMarkup(reactComponent);

  // console.log('f2html==>', html);
}

// new Function 在 node 下读不到全局数据： https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function
function writeFile(code, dir){
  const fileContent = `
  const React = require('react');

  const render = (props) => {
    return ${code}
  }

  module.exports = render;
  `;

  return new Promise((resolve,reject) => {
    const filePath = path.resolve(__dirname,dir, getUuidFile());
    // 写入到临时文件
    fs.writeFile(filePath, fileContent, 'utf-8', (err) => {
      if (err) {
        console.log(`err:${err}`);
        reject(err);
      }else{
        console.log('write success!');
        resolve(filePath);
      }
    })
  });
}

function renderToString(reactComponent){
  return ReactDOMServer.renderToStaticMarkup(reactComponent);
}

function getUuiD(randomLength = 5){
  return Number(Math.random().toString().substr(2,randomLength) + Date.now()).toString(36)
}

function getUuidFile(){
  return `${getUuiD()}.js`;
}

function delFile(filePath){
  fs.unlinkSync(filePath)
}
// function newFunc(code,args){
//   return new Function(code)
// }

// function jsxParser(content){
//     const parser =  new JsxParser({
//         bindings:args,
//         // components:{ InjectableComponent, Library },
//         jsx:content,
//         onError: (error) => {
//             console.log('error--->', error);
//         }
//       });
    
//     return parser.render();
// }

/**
 * @params { string } path 临时文件夹名称， 地址相对于 __dirname
 */
main('tmp');