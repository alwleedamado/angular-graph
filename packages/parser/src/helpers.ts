import * as ts from 'typescript'

export function getChildrenOfKind(kind: ts.SyntaxKind, node: ts.Node) {
   return node.getChildren().filter(n => n.kind === kind)
}

export function getAllClasses(sourceFile: ts.SourceFile) {
   let classes: ts.ClassDeclaration[] = [];
   sourceFile.statements.forEach(stm => {
      if (ts.isClassDeclaration(stm)) {
         classes.push(stm)
      }
   });
   return classes;
}

export function isAngularNode(node: ts.ClassDeclaration) {
   const types = ['NgModule', 'Component', 'Pipe', 'Injectable', 'Directive']
   const decorator = ts.getDecorators(node)[0]
   const type = decorator.expression['expression']['escapedText']
   return types.includes(type)
}