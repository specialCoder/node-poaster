
  const React = require('react');

  const render = (props) => {
    return React.createElement("div", {
  className: "classname"
}, /*#__PURE__*/React.createElement("p", null, props.foo), /*#__PURE__*/React.createElement("p", null, props.names.length > 0 ? props.names.length : null), props.names.map(item => {
  // const { label, value} = item;
  // return <p>{ label }</p>
  return /*#__PURE__*/React.createElement("p", null, `${item.label}-${item.value}`);
}) // <p>
//     {/* {item.label}-{item.value} */}
//     {/* {`${item.label}`} */}
//     {item.label}
// </p>)
, /*#__PURE__*/React.createElement("p", null, `${props.bar}`), props.show && /*#__PURE__*/React.createElement("p", null, "show"), /*#__PURE__*/React.createElement("pp", null, "ppp"));
/**
 * names.map({ label }) 不支持解构
 * <p>{`${item.label}`}</p> 不支持这种形式的模版字符串
 */
  }

  module.exports = render;
  