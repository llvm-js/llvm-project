# llvm.js/exceptions ([RunKit + npm](https://runkit.com/embed/5nk6qqwfierw))

## Exceptions Component

The `exceptions` component in `llvm.js` allows you to handle and output errors when working with the library. You can use various exception classes provided by this component to control the flow of your program and handle specific types of errors.

Here is a list of all the available exception types and their corresponding messages:
```js
FileNotFoundException - "[FileNotFoundException]: File not found in the filesystem"
FileAlreadyExistsException - "[FileAlreadyExistsException]: File already exists in the filesystem"
DirectoryNotFoundException - "[DirectoryNotFoundException]: Directory not found"
IOException - "[IOException]: IOException not available"
CallableException - "[CallableException]: CallableException not available"
```

### Exception Class

The `Exception` class is a generic exception that can be thrown and caught within your application. It has the following signature:

```ts
Exception(message: string, throw: boolean)
```

- `message` (string): A descriptive message for the exception.
- `throw` (boolean): A flag indicating whether the exception should be thrown (`true`) or just logged (`false`). By default, if `throw` is not specified, the exception will terminate the process.

### FileException Class

The `FileException` class is a specialized exception for file-related errors. It has the following signature:

```ts
FileException(message: string)
```

- `message` (string): A descriptive message for the exception.

### TokenException Class

The `TokenException` class is specifically designed for errors related to tokens. It can be used to highlight and report issues with specific tokens. It has the following signature:

```ts
TokenException(message: string, token: object, view: boolean)
```

- `message` (string): A descriptive message for the exception.
- `token` (object): The token object associated with the error. This token can be obtained from an AST tree.
- `view` (boolean): Indicates whether to include the token information at the end of the error message. If set to `true`, the token will be displayed for better identification.

### Usage Examples

Here are a few usage examples to illustrate how to work with the `exceptions` component:

1. Using `IOException` class:

```javascript
const { IOException } = require('llvm.js/exceptions');
new IOException();
```

2. Using `TokenException` class:

```javascript
const exceptions = require('llvm.js/exceptions');

// token - can be obtained from an AST tree (not shown in this code example)
// The error will reference the token with the provided message.
// The `view` flag determines if the token should be displayed at the end of the error message.
new exceptions.TokenException('Invalid token', token); 
```