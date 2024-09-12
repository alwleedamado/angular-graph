import { readFileSync } from 'fs';
import * as ts from 'typescript';
import { getAllClasses, getChildrenOfKind } from './helpers';
import { visitClass, visitNode } from './visitors';

export class Parser {

    private program: ts.Program;

    constructor(private entryPoints: string[]) {
        const options = ts.getDefaultCompilerOptions()
        this.program = ts.createProgram({ rootNames: entryPoints, options })
    }

    parse() {
        // iterate over files' path
        const files = this.program.getSourceFiles();
        // instentiate vistors
        const modules = files.filter(f => !f.fileName.includes('node_modules')).map(f => {
            const nodes = f.getChildren();
            let clzz = getAllClasses(f)

            const md = {
                fileName: f.fileName,
                classes: clzz.map(c => {
                   let visitedNode =  visitNode(c);
                   visitNode['filename'] = f.fileName
                   return visitNode;
                }),
                interfaces: getChildrenOfKind(ts.SyntaxKind.InterfaceDeclaration, f),
                enums: getChildrenOfKind(ts.SyntaxKind.EnumDeclaration, f)
            }
            console.log(md.classes);
            return md;
        })
        return modules;
    }
}