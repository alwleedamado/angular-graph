import * as ts from "typescript";
import { AMDNode } from "./amd/base";
import {
  parseComponent,
  parsePipe,
  parseInjectable,
  parseDirective,
  parseNgmodule,
} from "./parsers/angular";

export function visitNode(node: ts.Node) {
  switch (node.kind) {
    case ts.SyntaxKind.Unknown:
      return;
    case ts.SyntaxKind.NumericLiteral:
    case ts.SyntaxKind.BigIntLiteral:
    case ts.SyntaxKind.StringLiteral:
      return visitStringLiteral(node as ts.StringLiteral);
    case ts.SyntaxKind.RegularExpressionLiteral:
    case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
      break;
    case ts.SyntaxKind.Identifier:
      return (<ts.Identifier>node).escapedText;
    case ts.SyntaxKind.PrivateIdentifier:
    case ts.SyntaxKind.QualifiedName:
    case ts.SyntaxKind.ComputedPropertyName:
    case ts.SyntaxKind.TypeParameter:
    case ts.SyntaxKind.Parameter:
    case ts.SyntaxKind.Decorator:
    case ts.SyntaxKind.PropertySignature:
    case ts.SyntaxKind.PropertyDeclaration:
    case ts.SyntaxKind.MethodDeclaration:
    case ts.SyntaxKind.ClassStaticBlockDeclaration:
    case ts.SyntaxKind.Constructor:
    case ts.SyntaxKind.GetAccessor:
    case ts.SyntaxKind.SetAccessor:
    case ts.SyntaxKind.CallSignature:
    case ts.SyntaxKind.ConstructSignature:
    case ts.SyntaxKind.IndexSignature:
    case ts.SyntaxKind.TypePredicate:
    case ts.SyntaxKind.TypeReference:
    case ts.SyntaxKind.FunctionType:
    case ts.SyntaxKind.ConstructorType:
    case ts.SyntaxKind.TypeQuery:
    case ts.SyntaxKind.TypeLiteral:
    case ts.SyntaxKind.ArrayType:
    case ts.SyntaxKind.TupleType:
    case ts.SyntaxKind.OptionalType:
    case ts.SyntaxKind.RestType:
    case ts.SyntaxKind.UnionType:
    case ts.SyntaxKind.IntersectionType:
    case ts.SyntaxKind.ConditionalType:
    case ts.SyntaxKind.InferType:
    case ts.SyntaxKind.ParenthesizedType:
    case ts.SyntaxKind.TypeOperator:
    case ts.SyntaxKind.IndexedAccessType:
    case ts.SyntaxKind.MappedType:
    case ts.SyntaxKind.LiteralType:
    case ts.SyntaxKind.TemplateLiteralType:
    case ts.SyntaxKind.ImportType:
      break;
    case ts.SyntaxKind.ArrayLiteralExpression:
      return visitArrayLiteral(node as ts.ArrayLiteralExpression);
    case ts.SyntaxKind.ObjectLiteralExpression:
      return visitObjectLiteral(node as ts.ObjectLiteralExpression);
    case ts.SyntaxKind.PropertyAccessExpression:
      break;
    case ts.SyntaxKind.PropertyAssignment:
      return visitPropertyAssignment(node as ts.PropertyAssignment);
    case ts.SyntaxKind.ElementAccessExpression:
    case ts.SyntaxKind.CallExpression:
      return visitCallExpression(node as ts.CallExpression);
    case ts.SyntaxKind.ParenthesizedExpression:
    case ts.SyntaxKind.FunctionExpression:
    case ts.SyntaxKind.ArrowFunction:
    case ts.SyntaxKind.DeleteExpression:
    case ts.SyntaxKind.TypeOfExpression:
    case ts.SyntaxKind.VoidExpression:
    case ts.SyntaxKind.AwaitExpression:
    case ts.SyntaxKind.BinaryExpression:
    case ts.SyntaxKind.TemplateExpression:
    case ts.SyntaxKind.SpreadElement:
    case ts.SyntaxKind.ExpressionWithTypeArguments:
    case ts.SyntaxKind.SatisfiesExpression:
    case ts.SyntaxKind.TemplateSpan:
    case ts.SyntaxKind.SemicolonClassElement:
    case ts.SyntaxKind.Block:
    case ts.SyntaxKind.EmptyStatement:
    case ts.SyntaxKind.VariableStatement:
    case ts.SyntaxKind.ExpressionStatement:
    case ts.SyntaxKind.VariableDeclaration:
    case ts.SyntaxKind.VariableDeclarationList:
    case ts.SyntaxKind.FunctionDeclaration:
      break;
    case ts.SyntaxKind.ClassDeclaration:
      return visitClass(node as ts.ClassDeclaration);
    case ts.SyntaxKind.InterfaceDeclaration:
    case ts.SyntaxKind.TypeAliasDeclaration:
    case ts.SyntaxKind.EnumDeclaration:
    case ts.SyntaxKind.ModuleDeclaration:
    case ts.SyntaxKind.NamespaceExportDeclaration:
    case ts.SyntaxKind.ImportEqualsDeclaration:
    case ts.SyntaxKind.ImportDeclaration:
    case ts.SyntaxKind.NamedImports:
    case ts.SyntaxKind.ExportAssignment:
    case ts.SyntaxKind.ExportDeclaration:
    case ts.SyntaxKind.NamedExports:
    case ts.SyntaxKind.NamespaceExport:
    case ts.SyntaxKind.ExportSpecifier:
    case ts.SyntaxKind.MissingDeclaration:
    case ts.SyntaxKind.ExternalModuleReference:
  }
  return null;
}

export type AngularDecoratorType =
  | "NgModule"
  | "Component"
  | "Pipe"
  | "Injectable"
  | "Directive";
export function visitAngularNode(
  type: AngularDecoratorType,
  node: ts.ClassDeclaration
) {
  switch (type) {
    case "NgModule":
      return parseNgmodule(node);
    case "Component":
      return parseComponent(node);
    case "Pipe":
      return parsePipe(node);
    case "Injectable":
      parseInjectable(node);
    case "Directive":
      return parseDirective(node);
  }
}

export function visitClass(node: ts.ClassDeclaration) {
  let decorators = ts.getDecorators(node);
  if (decorators && decorators.length > 0) {
    const decorator = decorators[0];
    const type = decorator.expression["expression"]["escapedText"];
    return visitAngularNode(type, node);
  } else return {};
}

export function visitObjectLiteral(node: ts.ObjectLiteralExpression) {
  return node.properties.map((p) => visitNode(p));
}

export function visitArrayLiteral(node: ts.ArrayLiteralExpression) {
  return node.elements.map((el) => visitNode(el));
}

export function visitPropertyAssignment(node: ts.PropertyAssignment) {
  const name = (<ts.Identifier>node.name).escapedText;
  const initializer = visitNode(node.initializer);
  return { name, initializer };
}

export function visitCallExpression(node: ts.CallExpression) {
  return {
    object: node.expression["expression"]["escapedText"],
    method: (<ts.CallExpression>node).expression["name"]["escapedText"],
    arguments: node["arguments"].map((n) => visitNode(n)),
  };
}

export function visitStringLiteral(node: ts.StringLiteral) {
  return node.text;
}
