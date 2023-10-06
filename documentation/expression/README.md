# llvm.js/expression ([RunKit + npm](https://runkit.com/embed/h9qtpce4suc2))

**Expression Component Documentation**

The expression component in llvm.js allows you to evaluate mathematical expressions and obtain the answer using the `answer()` method. This component supports the following features:

- Parentheses and nested parentheses to control the evaluation order.
- The constant value of π (pi).
- Basic arithmetic operations such as addition, subtraction, multiplication, and division.
- Exponentiation using the `^` operator.

**Installation**

To use the expression component, you first need to install the `llvm.js` package. You can do this using npm:

```shell
npm i llvm.js
```

**Usage**

1. Import the `Expression` class from the `llvm.js/expression` module:

```javascript
const Expression = require('llvm.js/expression');
```

2. Create a new instance of the `Expression` class by providing the mathematical expression as a parameter:

```javascript
let expression = new Expression('2 + 4');
```

3. Use the `answer()` method to evaluate the expression and obtain the answer:

```javascript
console.log(expression.answer());
```

The above code will output `6`, which is the result of evaluating the expression `2 + 4`.

**Examples**

Here are some examples to demonstrate the usage of the expression component:

1. Evaluating a complex expression:

```javascript
let expression = new Expression('(8 - 4) * (6 / 2)');
console.log(expression.answer()); // Output: 12
```

2. Using the constant value of π (pi):

```javascript
let expression = new Expression('pi * 2');
console.log(expression.answer()); // Output: 6.28
```

3. Performing exponentiation:

```javascript
let expression = new Expression('2 ^ 3');
console.log(expression.answer()); // Output: 8
```

Note: The expression component supports more complex mathematical operations. Refer to the official documentation for a complete list of supported features and usage examples.

We hope this documentation helps you effectively use the expression component in the llvm.js project. Please feel free to reach out if you have any further questions or need additional assistance.