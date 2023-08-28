import * as parser from "@babel/parser";
import CodeGenerator from "@babel/generator";
import babel from '@babel/core'
import traverse from "@babel/traverse";
import * as t from '@babel/types'
import template from "@babel/template"


// const code = `
// class Example {}; // thisis
// let arr = [1,2,3]
// let list = ['1', '2', '3']
// let map = {
//     a: 11
// }
// console.log('end')
// `;
const code = `
const routes: RouteRecordRaw[] = [
  {
      path: '/privacy/:country',
      component: Privacy
  },
]
`
// console.log('ast>>', ast, ast.program.body)
// const output = CodeGenerator.default(
//   ast,
//   {
//     // compact: true,
//     comments: false
//     /* options */
//   },
//   code
// );
// console.log('outou', output)

// const ast = parser.parse(code);
const {ast} = babel.transformSync(code, { 
  ast: true,
  plugins: ["@babel/plugin-syntax-typescript"]
})
traverse.default(ast, {
  enter(path) {
    if (path.isArrayExpression()) {
      // console.log('path.node.name', path.getPrevSibling().parent.id.name)
      console.log('path.node.name', path.parent.id.name)
      let field = t.objectExpression([
        t.objectProperty(t.identifier('path'), t.stringLiteral('abc')),
        t.objectProperty(t.identifier('component'), t.identifier('HH')),
      ])
      path.node.elements.push(field)
      // path.node.elements.push(t.stringLiteral('a'))
    }
  },
})
let output = CodeGenerator.default(ast, {}, code)
console.log('oouput', output)

// const code = `
// function square(k) {
//   return k * k;
// }
// let list = ['1', '2', '3']`;

// const ast = parser.parse(code);

// traverse.default(ast, {
//   // 遍历声明表达式
//   // Identifier(path) {
//   //   // if (path.node.type === 'VariableDeclaration') {
//   //   //   console.log('path.node>', path.node)
//   //   //   // 替换
//   //   //   if (path.node.kind === 'var') {
//   //   //     path.node.kind = 'let';
//   //   //   }
//   //   // }
//   //   if (path.isIdentifier({name: 'list'})) {
//   //     console.log('path.node.name', path.getNextSibling().node)
//   //     // path.node.name = "x";
//   //   }
//   // },
//   // AssignmentExpression(path) {
//   //   console.log('path>', path)
//   // }
//   enter(path) {
//     if (path.isAssignmentExpression()) {
//       console.log(1)
//     }
//       // if (path.isIdentifier({name: 'list'})) {
//       //   console.log('path.node.name', path.node)
//       //   path.node.name = "x";
//       // }
//   },
// });
