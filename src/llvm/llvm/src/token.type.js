const ListChain = require('../../listchain');

let tt = [
    'number', 'identifer', 'string', 'comment', // 0-9 a-zA-Z "string"
    'open_paren', 'close_paren', // ()
    'open_curly_bracket', 'close_curly_bracket', // {}
    'open_square_bracket', 'close_square_bracket', // []
    'string_quote', 'string_double_quote', // ' "
    'apostrophe_string', 'apostrophe', // `
    'tilde', // ~
    'equal', // =
    'bang_equal', 'equal_equal', // != ==
    'less_equal', 'greater_equal', // <= >=
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
    'underscore', // _
    'less', 'greater', // < >
    'plus_equal', 'minus_equal', // += ==
    'star_equal', 'caret_equal', // *= ^=
    'slash_equal', 'percent_equal', // /= %=
    'operator_or', 'operator_and', // || &&
    'keyword', // keyword
    'eof'
].map(t => t.toUpperCase());

let tokenType = new ListChain(tt);

module.exports = tokenType;