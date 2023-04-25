import * as ts from 'typescript';
import { NgModule } from '../amd/ng-module';
import { AMDNode } from '../amd/base';
import { visitArrayLiteral, visitNode, visitObjectLiteral } from '../visitors';
import { parseArgs } from 'util';
import { Component } from '../amd/component';

export function parseNgmodule(node: ts.ClassDeclaration): NgModule {
    // const decorator = ts.getDecorators(node)[0];
    // const type = decorator.expression['expression']['escapedText']
    // const args = decorator.expression['arguments']
    // const parsedArgs:any[] = visitNode(args[0])
    // const module = new NgModule(node.getSourceFile()?.fileName)
    // parsedArgs.forEach(a => module[a.name] = a.initializer)
    // return module;
    return null
}
export function parseComponent(node: ts.ClassDeclaration) { 
    const decorator = ts.getDecorators(node)[0];
    const type = decorator.expression['expression']['escapedText']
    const args = decorator.expression['arguments']
    const parsedArgs:any[] = visitNode(args[0])
    const component = new Component(node.getSourceFile()?.fileName)
    parsedArgs.forEach(a => component[a.name] = a.initializer)
    console.log(component)
    return component;
}
export function parseDirective(node: ts.ClassDeclaration) { }
export function parsePipe(node: ts.ClassDeclaration) { }
export function parseInjectable(node: ts.ClassDeclaration) { }
