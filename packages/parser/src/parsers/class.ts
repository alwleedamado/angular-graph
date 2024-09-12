import * as ts from 'typescript'
import { isAngularNode } from '../helpers'

export function parseClass(clazz: ts.ClassDeclaration) {
    if (isAngularNode(clazz))
        return parseAngularClass(clazz)
    else
        return parseRegularClass(clazz)
}

function parseRegularClass(clazz: ts.ClassDeclaration) {

}


function parseAngularClass(clazz: ts.ClassDeclaration) {

}