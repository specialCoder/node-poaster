 const React = require('react');

 const renderResult = ({
     foo, names, bar
 }) =>
 /*#__PURE__*/
 React.createElement("div", {
    className: "classname"
  }, /*#__PURE__*/React.createElement("p", null, foo), /*#__PURE__*/React.createElement("p", null, names.length > 0 ? names.length : null), names.map(item => {
    // const { label, value} = item;
    return /*#__PURE__*/React.createElement("p", null, "aas");
  }) // <p>
  //     {/* {item.label}-{item.value} */}
  //     {/* {`${item.label}`} */}
  //     {item.label}
  // </p>)
  , /*#__PURE__*/React.createElement("p", null, `${bar}`), /*#__PURE__*/React.createElement("pp", null, "ppp"));
  /**
   * names.map({ label }) 不支持解构
   * <p>{`${item.label}`}</p> 不支持这种形式的模版字符串
   */

  module.exports = renderResult;