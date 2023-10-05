interface ExpressionConstructor {
    new(expression?: string): any;
}

export declare class Expression implements ExpressionConstructor {
    answer(): any;
}

export * from '@llvm/expression';