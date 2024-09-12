import { AMDNode, NodeType } from "./base";

export class Pipe extends AMDNode {
    type: NodeType = NodeType.pipe;
    
    constructor(fileName) {
        super(fileName);
        
    }
}