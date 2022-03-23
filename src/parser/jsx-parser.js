var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _JsxParser_parseJSX, _JsxParser_parseExpression, _JsxParser_parseMemberExpression, _JsxParser_parseName, _JsxParser_parseElement;

/* global JSX */
const Acorn  = require('acorn');
const AcornJSX  = require('acorn-jsx');
const  React = require('react');
const ATTRIBUTES = require('../constants/attributeNames');
const { canHaveChildren, canHaveWhitespace } = require('../constants/specialTags');
const { randomHash } = require('../helpers/hash');
const { parseStyle } = require('../helpers/parseStyle');
const { resolvePath } = require('../helpers/resolvePath');
/* eslint-disable consistent-return */

const defaultProps = {
    allowUnknownElements: true,
    autoCloseVoidElements: false,
    bindings: {},
    blacklistedAttrs: [/^on.+/i],
    blacklistedTags: ['script'],
    className: '',
    components: {},
    componentsOnly: false,
    disableFragments: false,
    disableKeyGeneration: false,
    jsx: '',
    onError: () => { },
    showWarnings: false,
    renderError: undefined,
    renderInWrapper: true,
    renderUnrecognized: () => null,
};

const { Fragment } = React;
class JsxParser extends React.Component {
    constructor(props) {
        const args = {
            ...defaultProps,
            ...props,
        }
        super(args);
        this.ParsedChildren = null;
        _JsxParser_parseJSX.set(this, (jsx) => {
            const parser = Acorn.Parser.extend(AcornJSX({
                autoCloseVoidElements: this.props.autoCloseVoidElements,
            }));
            const wrappedJsx = `<root>${jsx}</root>`;
            let parsed = [];
            try {
                // @ts-ignore - AcornJsx doesn't have typescript typings
                parsed = parser.parse(wrappedJsx, { ecmaVersion: 'latest' });
                // console.log("parsed-->", JSON.stringify(parsed));
                // @ts-ignore - AcornJsx doesn't have typescript typings
                parsed = parsed.body[0].expression.children || [];
            }
            catch (error) {
                if (this.props.showWarnings)
                    console.warn(error); // eslint-disable-line no-console
                if (this.props.onError)
                    this.props.onError(error);
                if (this.props.renderError) {
                    return this.props.renderError({ error: String(error) });
                }
                return null;
            }
            return parsed.map(p => __classPrivateFieldGet(this, _JsxParser_parseExpression, "f").call(this, p)).filter(Boolean);
        });
        _JsxParser_parseExpression.set(this, (expression, scope) => {
            var _a, _b;
            switch (expression.type) {
                case 'JSXAttribute':
                    if (expression.value === null)
                        return true;
                    return __classPrivateFieldGet(this, _JsxParser_parseExpression, "f").call(this, expression.value, scope);
                case 'JSXElement':
                case 'JSXFragment':
                    return __classPrivateFieldGet(this, _JsxParser_parseElement, "f").call(this, expression, scope);
                case 'JSXExpressionContainer':
                    return __classPrivateFieldGet(this, _JsxParser_parseExpression, "f").call(this, expression.expression, scope);
                case 'JSXText':
                    const key = this.props.disableKeyGeneration ? undefined : randomHash();
                    return this.props.disableFragments
                        ? expression.value
                        : React.createElement(Fragment, { key: key }, expression.value);
                case 'ArrayExpression':
                    return expression.elements.map(ele => __classPrivateFieldGet(this, _JsxParser_parseExpression, "f").call(this, ele, scope));
                case 'BinaryExpression':
                    /* eslint-disable eqeqeq,max-len */
                    switch (expression.operator) {
                        case '-': return __classPrivateFieldGet(this, _JsxParser_parseExpression, "f").call(this, expression.left) - __classPrivateFieldGet(this, _JsxParser_parseExpression, "f").call(this, expression.right);
                        case '!=': return __classPrivateFieldGet(this, _JsxParser_parseExpression, "f").call(this, expression.left) != __classPrivateFieldGet(this, _JsxParser_parseExpression, "f").call(this, expression.right);
                        case '!==': return __classPrivateFieldGet(this, _JsxParser_parseExpression, "f").call(this, expression.left) !== __classPrivateFieldGet(this, _JsxParser_parseExpression, "f").call(this, expression.right);
                        case '*': return __classPrivateFieldGet(this, _JsxParser_parseExpression, "f").call(this, expression.left) * __classPrivateFieldGet(this, _JsxParser_parseExpression, "f").call(this, expression.right);
                        case '**': return __classPrivateFieldGet(this, _JsxParser_parseExpression, "f").call(this, expression.left) ** __classPrivateFieldGet(this, _JsxParser_parseExpression, "f").call(this, expression.right);
                        case '/': return __classPrivateFieldGet(this, _JsxParser_parseExpression, "f").call(this, expression.left) / __classPrivateFieldGet(this, _JsxParser_parseExpression, "f").call(this, expression.right);
                        case '%': return __classPrivateFieldGet(this, _JsxParser_parseExpression, "f").call(this, expression.left) % __classPrivateFieldGet(this, _JsxParser_parseExpression, "f").call(this, expression.right);
                        case '+': return __classPrivateFieldGet(this, _JsxParser_parseExpression, "f").call(this, expression.left) + __classPrivateFieldGet(this, _JsxParser_parseExpression, "f").call(this, expression.right);
                        case '<': return __classPrivateFieldGet(this, _JsxParser_parseExpression, "f").call(this, expression.left) < __classPrivateFieldGet(this, _JsxParser_parseExpression, "f").call(this, expression.right);
                        case '<=': return __classPrivateFieldGet(this, _JsxParser_parseExpression, "f").call(this, expression.left) <= __classPrivateFieldGet(this, _JsxParser_parseExpression, "f").call(this, expression.right);
                        case '==': return __classPrivateFieldGet(this, _JsxParser_parseExpression, "f").call(this, expression.left) == __classPrivateFieldGet(this, _JsxParser_parseExpression, "f").call(this, expression.right);
                        case '===': return __classPrivateFieldGet(this, _JsxParser_parseExpression, "f").call(this, expression.left) === __classPrivateFieldGet(this, _JsxParser_parseExpression, "f").call(this, expression.right);
                        case '>': return __classPrivateFieldGet(this, _JsxParser_parseExpression, "f").call(this, expression.left) > __classPrivateFieldGet(this, _JsxParser_parseExpression, "f").call(this, expression.right);
                        case '>=': return __classPrivateFieldGet(this, _JsxParser_parseExpression, "f").call(this, expression.left) >= __classPrivateFieldGet(this, _JsxParser_parseExpression, "f").call(this, expression.right);
                        /* eslint-enable eqeqeq,max-len */
                    }
                    return undefined;
                case 'CallExpression':
                    const parsedCallee = __classPrivateFieldGet(this, _JsxParser_parseExpression, "f").call(this, expression.callee);
                    if (parsedCallee === undefined) {
                        this.props.onError(new Error(`The expression '${expression.callee}' could not be resolved, resulting in an undefined return value.`));
                        return undefined;
                    }
                    return parsedCallee(...expression.arguments.map(arg => __classPrivateFieldGet(this, _JsxParser_parseExpression, "f").call(this, arg, expression.callee)));
                case 'ConditionalExpression':
                    return __classPrivateFieldGet(this, _JsxParser_parseExpression, "f").call(this, expression.test)
                        ? __classPrivateFieldGet(this, _JsxParser_parseExpression, "f").call(this, expression.consequent)
                        : __classPrivateFieldGet(this, _JsxParser_parseExpression, "f").call(this, expression.alternate);
                case 'ExpressionStatement':
                    return __classPrivateFieldGet(this, _JsxParser_parseExpression, "f").call(this, expression.expression);
                case 'Identifier':
                    if (scope && expression.name in scope) {
                        return scope[expression.name];
                    }
                    return (this.props.bindings || {})[expression.name];
                case 'Literal':
                    return expression.value;
                case 'LogicalExpression':
                    const left = __classPrivateFieldGet(this, _JsxParser_parseExpression, "f").call(this, expression.left);
                    if (expression.operator === '||' && left)
                        return left;
                    if ((expression.operator === '&&' && left) || (expression.operator === '||' && !left)) {
                        return __classPrivateFieldGet(this, _JsxParser_parseExpression, "f").call(this, expression.right);
                    }
                    return false;
                case 'MemberExpression':
                    return __classPrivateFieldGet(this, _JsxParser_parseMemberExpression, "f").call(this, expression, scope);
                case 'ObjectExpression':
                    const object = {};
                    expression.properties.forEach(prop => {
                        object[prop.key.name || prop.key.value] = __classPrivateFieldGet(this, _JsxParser_parseExpression, "f").call(this, prop.value);
                    });
                    return object;
                case 'TemplateElement':
                    return expression.value.cooked;
                case 'TemplateLiteral':
                    return [...expression.expressions, ...expression.quasis]
                        .sort((a, b) => {
                        if (a.start < b.start)
                            return -1;
                        return 1;
                    })
                        .map(item => __classPrivateFieldGet(this, _JsxParser_parseExpression, "f").call(this, item))
                        .join('');
                case 'UnaryExpression':
                    switch (expression.operator) {
                        case '+': return expression.argument.value;
                        case '-': return -expression.argument.value;
                        case '!': return !expression.argument.value;
                    }
                    return undefined;
                case 'ArrowFunctionExpression':
                    if (expression.async || expression.generator) {
                        (_b = (_a = this.props).onError) === null || _b === void 0 ? void 0 : _b.call(_a, new Error('Async and generator arrow functions are not supported.'));
                    }
                    return (...args) => {
                        const functionScope = {};
                        expression.params.forEach((param, idx) => {
                            functionScope[param.name] = args[idx];
                        });
                        return __classPrivateFieldGet(this, _JsxParser_parseExpression, "f").call(this, expression.body, functionScope);
                    };
            }
        });
        _JsxParser_parseMemberExpression.set(this, (expression, scope) => {
            var _a, _b, _c, _d, _e, _f;
            // eslint-disable-next-line prefer-destructuring
            let { object } = expression;
            const path = [(_b = (_a = expression.property) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : JSON.parse((_d = (_c = expression.property) === null || _c === void 0 ? void 0 : _c.raw) !== null && _d !== void 0 ? _d : '""')];
            if (expression.object.type !== 'Literal') {
                while (object && ['MemberExpression', 'Literal'].includes(object === null || object === void 0 ? void 0 : object.type)) {
                    const { property } = object;
                    if (object.computed) {
                        path.unshift(__classPrivateFieldGet(this, _JsxParser_parseExpression, "f").call(this, property, scope));
                    }
                    else {
                        path.unshift((_e = property === null || property === void 0 ? void 0 : property.name) !== null && _e !== void 0 ? _e : JSON.parse((_f = property === null || property === void 0 ? void 0 : property.raw) !== null && _f !== void 0 ? _f : '""'));
                    }
                    object = object.object;
                }
            }
            const target = __classPrivateFieldGet(this, _JsxParser_parseExpression, "f").call(this, object, scope);
            try {
                console.log("target==>", target);
                let parent = target;
                const member = path.reduce((value, next) => {
                    if(value){
                        parent = value;
                        return value[next];
                    }
                    // parent = value;
                    // return value[next];
                }, target);
                console.log("member-->", member)

                if (typeof member === 'function'){
                    return member.bind(parent);
                }
                return member;
            }
            catch (_g) {
                console.log('catch error:', _g);
                const name = (object === null || object === void 0 ? void 0 : object.name) || 'unknown';
                this.props.onError(new Error(`Unable to parse ${name}["${path.join('"]["')}"]}`));
            }
        });
        _JsxParser_parseName.set(this, (element) => {
            if (element.type === 'JSXIdentifier') {
                return element.name;
            }
            return `${__classPrivateFieldGet(this, _JsxParser_parseName, "f").call(this, element.object)}.${__classPrivateFieldGet(this, _JsxParser_parseName, "f").call(this, element.property)}`;
        });
        _JsxParser_parseElement.set(this, (element, scope) => {
            const { allowUnknownElements, components, componentsOnly, onError } = this.props;
            const { children: childNodes = [] } = element;
            const openingTag = element.type === 'JSXElement'
                ? element.openingElement
                : element.openingFragment;
            const { attributes = [] } = openingTag;
            const name = element.type === 'JSXElement'
                ? __classPrivateFieldGet(this, _JsxParser_parseName, "f").call(this, openingTag.name)
                : '';
            const blacklistedAttrs = (this.props.blacklistedAttrs || [])
                .map(attr => (attr instanceof RegExp ? attr : new RegExp(attr, 'i')));
            const blacklistedTags = (this.props.blacklistedTags || [])
                .map(tag => tag.trim().toLowerCase()).filter(Boolean);
            if (/^(html|head|body)$/i.test(name)) {
                return childNodes.map(c => __classPrivateFieldGet(this, _JsxParser_parseElement, "f").call(this, c, scope));
            }
            const tagName = name.trim().toLowerCase();
            if (blacklistedTags.indexOf(tagName) !== -1) {
                onError(new Error(`The tag <${name}> is blacklisted, and will not be rendered.`));
                return null;
            }
            if (name !== '' && !resolvePath(components, name)) {
                if (componentsOnly) {
                    onError(new Error(`The component <${name}> is unrecognized, and will not be rendered.`));
                    return this.props.renderUnrecognized(name);
                }
                // if (!allowUnknownElements && document.createElement(name) instanceof HTMLUnknownElement) {
                //     onError(new Error(`The tag <${name}> is unrecognized in this browser, and will not be rendered.`));
                //     return this.props.renderUnrecognized(name);
                // }
            }
            let children;
            const component = element.type === 'JSXElement'
                ? resolvePath(components, name)
                : Fragment;
            if (component || canHaveChildren(name)) {
                children = childNodes.map(node => __classPrivateFieldGet(this, _JsxParser_parseExpression, "f").call(this, node, scope));
                if (!component && !canHaveWhitespace(name)) {
                    children = children.filter(child => (typeof child !== 'string' || !/^\s*$/.test(child)));
                }
                if (children.length === 0) {
                    children = undefined;
                }
                else if (children.length === 1) {
                    [children] = children;
                }
                else if (children.length > 1 && !this.props.disableKeyGeneration) {
                    // Add `key` to any child that is a react element (by checking if it has `.type`) if one
                    // does not already exist.
                    children = children.map((child, key) => (((child === null || child === void 0 ? void 0 : child.type) && !(child === null || child === void 0 ? void 0 : child.key)) ? Object.assign(Object.assign({}, child), { key: child.key || key }) : child));
                }
            }
            const props = {
                key: this.props.disableKeyGeneration ? undefined : randomHash(),
            };
            attributes.forEach(// eslint-disable-next-line max-len
            (expr) => {
                if (expr.type === 'JSXAttribute') {
                    const rawName = expr.name.name;
                    const attributeName = ATTRIBUTES[rawName] || rawName;
                    // if the value is null, this is an implicitly "true" prop, such as readOnly
                    const value = __classPrivateFieldGet(this, _JsxParser_parseExpression, "f").call(this, expr, scope);
                    const matches = blacklistedAttrs.filter(re => re.test(attributeName));
                    if (matches.length === 0) {
                        props[attributeName] = value;
                    }
                }
                else if ((expr.type === 'JSXSpreadAttribute' && expr.argument.type === 'Identifier')
                    || expr.argument.type === 'MemberExpression') {
                    const value = __classPrivateFieldGet(this, _JsxParser_parseExpression, "f").call(this, expr.argument, scope);
                    if (typeof value === 'object') {
                        Object.keys(value).forEach(rawName => {
                            const attributeName = ATTRIBUTES[rawName] || rawName;
                            const matches = blacklistedAttrs.filter(re => re.test(attributeName));
                            if (matches.length === 0) {
                                props[attributeName] = value[rawName];
                            }
                        });
                    }
                }
            });
            if (typeof props.style === 'string') {
                props.style = parseStyle(props.style);
            }
            const lowerName = name.toLowerCase();
            if (lowerName === 'option') {
                children = children.props.children;
            }
            return React.createElement(component || lowerName, props, children);
        });

        // render
        this.render = () => {
            const jsx = (this.props.jsx || '').trim().replace(/<!DOCTYPE([^>]*)>/g, '');
            this.ParsedChildren = __classPrivateFieldGet(this, _JsxParser_parseJSX, "f").call(this, jsx);
            const className = [...new Set(['jsx-parser', ...String(this.props.className).split(' ')])]
                .filter(Boolean)
                .join(' ');
            return (this.props.renderInWrapper
                ? React.createElement("div", { className: className }, this.ParsedChildren)
                : React.createElement(React.Fragment, null, this.ParsedChildren));
        };
    }
}
_JsxParser_parseJSX = new WeakMap(), _JsxParser_parseExpression = new WeakMap(), _JsxParser_parseMemberExpression = new WeakMap(), _JsxParser_parseName = new WeakMap(), _JsxParser_parseElement = new WeakMap();

JsxParser.displayName = 'JsxParser';

/* eslint-enable consistent-return */ 

module.exports = JsxParser;