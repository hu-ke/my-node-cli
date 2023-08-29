import CodeGenerator from "@babel/generator";
import babel from '@babel/core'
import traverse from "@babel/traverse";
import * as t from '@babel/types'
import * as Path from 'path'
import { fileURLToPath } from 'url';
const __dirname = Path.dirname(fileURLToPath(import.meta.url));

const tsBabelPath = Path.join(__dirname, '..', 'node_modules', '@babel', 'plugin-syntax-typescript')
const upperCaseFirstLetter = (str) => {
  if (str && typeof str) {
    return `${str[0].toUpperCase()}${str.slice(1)}`
  }
}
export const generateRouterCodes = ({
  pageName, routerLocation
}) => {
  const {ast} = babel.transformFileSync(routerLocation, { 
    ast: true,
    plugins: [tsBabelPath]
  })
  traverse.default(ast, {
    enter(path) {
      if (path.isArrayExpression()) {
        if (path?.parent?.id?.name === 'routes') {
          let field = t.objectExpression([
            t.objectProperty(t.identifier('path'), t.stringLiteral(`${Path.sep}${Path.join(pageName)}`)),
            t.objectProperty(t.identifier('component'), t.identifier(upperCaseFirstLetter(pageName))),
          ])
          path.node.elements.push(field)
        }
      } else if (path.node.type === 'Program') {
        // 需要插入的节点
        const node = t.importDeclaration(
          [t.importDefaultSpecifier(t.identifier(upperCaseFirstLetter(pageName)))],
          t.stringLiteral(`.${Path.sep}${Path.join('pages', pageName, 'index.vue')}`)
        )
        path.node.body.unshift(node)
      }
    },
  })
  let output = CodeGenerator.default(ast, {})
  return output.code
}

