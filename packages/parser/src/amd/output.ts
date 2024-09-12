import { AMDNode, NodeType } from "./base";

export class Output extends AMDNode {
    type: NodeType = NodeType.output
    alias: string;
    name: string;
}