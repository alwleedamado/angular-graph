export abstract class AMDNode {
    filename: string;
    abstract type: NodeType;
    name: string;
    constructor(fileName) { }
}

export enum NodeType {
    ngModule = 1,
    component = 2,
    directive = 3,
    pipe = 4,
    injectable = 5,
}

export enum Injectable {
    service = 1,
    interceptor = 2,
    gaurd = 3,
    generic = 4
}