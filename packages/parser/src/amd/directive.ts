import { AMDNode, NodeType } from "./base";
import { Input } from "./input";
import { Output } from "./output";

export class Directive extends AMDNode {
    constructor(fileName: string) {
        super(fileName)
    }
    type: NodeType = NodeType.directive;
    inputs: Input[];
    outputs: Output[];
    selector: string;
    members: AMDNode[]
}