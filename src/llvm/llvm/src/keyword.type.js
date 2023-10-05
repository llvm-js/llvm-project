const ListChain = require('../../listchain');

let kt = [
    'if', 'else', 'switch',
    'for', 'while', 'do',
    'function',
    'break', 'continue',
    'return'
].map(t => t.toUpperCase());

let keywordType = new ListChain(kt);

module.exports = keywordType;