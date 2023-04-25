import { AMDNode, NodeType } from "./base";

export class NgModule extends AMDNode {
    constructor(fileName: string) {
        super(fileName)
    }
    type = NodeType.ngModule;
    declarations: AMDNode[]
    providers: any[];
    imports: AMDNode[];
    exports: AMDNode[];
    bootstrap: AMDNode[];
}