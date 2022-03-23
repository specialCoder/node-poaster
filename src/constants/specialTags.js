const VOID_ELEMENTS = [
	'area',
	'base',
	'br',
	'col',
	'embed',
	'hr',
	'img',
	'input',
	'keygen',
	'link',
	'menuitem',
	'meta',
	'param',
	'source',
	'track',
	'wbr',
]

const NO_WHITESPACE = [
	'table',
	'tbody',
	'tfoot',
	'thead',
	'tr',
]


function canHaveChildren(tagName) {
	return VOID_ELEMENTS.indexOf(tagName.toLowerCase()) === -1
}

function canHaveWhitespace(tagName) {
	return NO_WHITESPACE.indexOf(tagName.toLowerCase()) !== -1
}

module.exports = {
    VOID_ELEMENTS,
    canHaveChildren,
    canHaveWhitespace
}