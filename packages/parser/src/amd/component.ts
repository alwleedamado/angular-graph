import { AMDNode, NodeType } from "./base";

export class Component extends AMDNode {
    constructor(fileName: string) {
        super(fileName)
    }
    type: NodeType = NodeType.component;
    styleUrls?: string[];
    style: string;
    selector: string;
    detectionStrategy: any;
}