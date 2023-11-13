# llvm.js/llvm

`llvm.Config.function()` is a set of functions for configuring the lexer configuration in the project llvm.js . Below is the documentation for each function:

- `setCommentLine(string: string)`: Sets a one-line comment for the lexer. Accepts a string as an argument containing the text of the comment.

- `forbiddenSymbol(char: char | char[])`: Sets forbidden characters to which the lexer will respond with an error. It can take a character or an array of characters as an argument.

- `setCommentBlock(string: string)`: Sets a block comment. If the argument is a string, then the end of the block comment will be determined by the reverse order of characters in the argument. If the argument is an array, then the first element will be used as the beginning of the block comment, and the second element as its end.

- `clearCommentLine()`: Clears data about the presentation of single-line comments.

- `clearCommentBlock()`: Clears data about the presentation of block comments.

- `setSupportNumberSnake(bool: boolean)`: Sets whether to enable or disable support for the underscore character `_` in numbers. Takes the boolean value `true` to enable and `false` to disable support.

- `clearSupportNumberSnake()`: Clears the data and returns the initial value of the underscore character support setting in numbers.
