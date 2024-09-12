import { AMDNode, NodeType } from "./base";

export class Input extends AMDNode {
    type: NodeType = NodeType.input
    alias: string;
    name: string;
    dataType: string;
}