import * as ts from 'typescript';
import { NgModule } from '../amd/ng-module';
import { AMDNode } from '../amd/base';
import { visitArrayLiteral, visitNode, visitObjectLiteral } from '../visitors';
import { parseArgs } from 'util';
import { Component } from '../amd/component';
import { Directive } from '../amd/directive';
import { Pipe } from '../amd/pipe';

export function parseNgmodule(node: ts.ClassDeclaration): NgModule {
    const parsedArgs: any[] = extractDecorator(node);

    const module = new NgModule(node.getSourceFile()?.fileName)
    parsedArgs.forEach(a => module[a.name] = a.initializer)
    module.name = node['name']['escapedText'].toString();
    console.log(module);
    return module;
}
function extractDecorator(node: ts.ClassDeclaration) {
    const decorator = ts.getDecorators(node)[0];
    const type = decorator.expression['expression']['escapedText'];
    const args = decorator.expression['arguments'];
    const parsedArgs: any[] = visitNode(args[0]);
    return parsedArgs;
}

export function parseComponent(node: ts.ClassDeclaration) {
    const parsedArgs = extractDecorator(node);
    const component = new Component(node.getSourceFile()?.fileName)
    parsedArgs.forEach(a => component[a.name] = a.initializer)
    return component;
}
export function parseDirective(node: ts.ClassDeclaration) {
    const parsedArgs = extractDecorator(node);
    let directive = new Directive(node.getSourceFile()?.fileName)
    parsedArgs.forEach(a => directive[a.name] = a.initializer)
    return directive;
}
export function parsePipe(node: ts.ClassDeclaration) {
    const parsedArgs = extractDecorator(node);
    let pipe = new Pipe(node.getSourceFile()?.fileName);
    parsedArgs.forEach(a => pipe[a.name] = a.initializer)
    return pipe;
}
export function parseInjectable(node: ts.ClassDeclaration) { }

function getDirectiveMembers(node: ts.ClassDeclaration) {
}
