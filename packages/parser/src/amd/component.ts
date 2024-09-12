import { AMDNode, NodeType } from "./base";
import { Directive } from "./directive";

export class Component extends Directive {
    constructor(fileName: string) {
        super(fileName)
    }
    type: NodeType = NodeType.component;
    styleUrls?: string[];
    style: string;
    detectionStrategy: any;
}