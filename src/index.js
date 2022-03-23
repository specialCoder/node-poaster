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
//   myEventHandler: () => { /* ... do stuff ... */ },
};

async function main (){
  // const { foo, bar, names } = args;
  const content = getFileContent("demo3.js");

  // const reactComponent = jsxParser(content)
  const code = transform(content).code;
  const firstPoint = code.indexOf('React');

  try{ 
    await  writeFile(code.slice(firstPoint));
    const render = require('./tmp/tmp.js');
    const result = renderToString(render(args));
    console.log('has result===>', result);
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
function writeFile(code){
  const fileContent = `
  const React = require('react');

  const render = (props) => {
    return ${code}
  }

  module.exports = render;
  `;

  return new Promise((resolve,reject) => {
    fs.writeFile(path.resolve(__dirname,'tmp/tmp.js'), fileContent, 'utf-8', (err) => {
      if (err) {
        console.log(`err:${err}`);
        reject(err);
      }else{
        console.log('write success!');
        resolve()
      }
    })
  });
}

function renderToString(reactComponent){
  return ReactDOMServer.renderToStaticMarkup(reactComponent);
}

// function newFunc(code,args){
//   return new Function(code)
// }

function jsxParser(content){
    const parser =  new JsxParser({
        bindings:args,
        // components:{ InjectableComponent, Library },
        jsx:content,
        onError: (error) => {
            console.log('error--->', error);
        }
      });
    
    return parser.render();
}

main();