export declare class CodeGen {
    static variableDeclaration(nameToken: string, valueToken: string): void;
    static constDeclaration(nameToken: string, valueToken: string): void;
    static genSLFunction(name: string): void;
    static callFunction(id: string, args: Array): void;
    static callFunction(id: string, args: string): void;
    static callFunction(id: string, args: number): void;
    static codegen(outputfilebane: string): void;
}

export * from '@llvm.js/codegen';