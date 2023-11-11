const ListChain = require('../../listchain');

let tt = [
    'number', 'identifer', 'string', 'comment', // 0-9 a-zA-Z "string"
    'open_paren', 'close_paren', // ()
    'open_angle', 'close_angle', // <>
    'open_brace', 'close_brace', // {}
    'open_square_bracket', 'close_square_bracket', // []
    'string_quote', 'string_double_quote', // ' "
    'equal', 'bang_equal', 'equal_equal', 'less_equal', // = != == >=
    'whitespace', // \r \t \n
    'minus', 'plus', // - +
    'dot', 'comma', // . ,
    'star', // *
    'slash', 'space', // /
    'semicolon', 'colon', // ; :
    'bang', // !
    'dollar', // $
    'mark', // ?
    'caret', // ^
    'hash', // #
    'precent', // %
    'pipe', 'ampersand', // | &
    'doge', // @
    'plus_equal', 'minus_equal', // += ==
    'star_equal', 'caret_equal', // *= ^=
    'slash_equal', 'percent_equal', // /= %=
    'operator_or', 'operator_and', // || &&
    'eof'
].map(t => t.toUpperCase());

let tokenType = new ListChain(tt);

module.exports = tokenType;