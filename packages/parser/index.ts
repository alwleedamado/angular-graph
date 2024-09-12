import { Parser } from "./src/parser"

const program = new Parser(['../../apps/angular-graph-ui/src/main.ts'])

const amd = program.parse()