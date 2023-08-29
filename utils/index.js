import figlet from "figlet";
import path from 'path'
import fsPromises from 'node:fs/promises';
import fs from 'fs'
import { indexVue, indexScss, packageJson } from "./docTemplates.js";
import { generateRouterCodes } from './babel-util.js'
/*
* pageName: 页面名称
* routerLocation: router.ts文件所在位置
* pageLocation: pages文件夹所在位置
*/
export const addPage = async ({
  pageName, routerLocation, pageLocation
}) => {
  // 新建文件夹
  await fsPromises.mkdir(path.join(pageLocation, pageName))
  // 新建index.vue文件
  await fsPromises.writeFile(path.join(pageLocation, pageName, 'index.vue'), indexVue({pageName}))
  // 新建index.scss文件
  await fsPromises.writeFile(path.join(pageLocation, pageName, 'index.scss'), indexScss({pageName}))
  const output = generateRouterCodes({pageName, routerLocation})
  writeFile(routerLocation, output)
}

// 删除整个文件夹
export const removeDir = (targetUrl) => {
  return fsPromises.rm(targetUrl, {
    recursive: true
  })
}

// 判断文件夹是否存在
export const isFolderExists = (targetUrl) => {
  return fs.existsSync(targetUrl)
}

// 打印starblink logo
export const printLogo = () => {
  console.log(figlet.textSync("starblink fe!", {
    font: "Standard",
  }))
}

// 生成模板代码
export const generateProjFiles = async(targetFileOrFolderUrl, outputDirUrl, fileOrFolderName) => {
  // 是文件夹
  if ((await fsPromises.stat(targetFileOrFolderUrl)).isDirectory()) {
    // 在输出目录下创建文件夹
    await fsPromises.mkdir(path.join(outputDirUrl, fileOrFolderName))
    // 将目标文件夹下的文件/文件夹 写到 输出目录
    let list = await fsPromises.readdir(targetFileOrFolderUrl)
    for (let name of list) {
      generateProjFiles(path.join(targetFileOrFolderUrl, name), path.join(outputDirUrl, fileOrFolderName), name)
    }
  } else {
    // 普通文件，直接写
    let result = await fsPromises.readFile(targetFileOrFolderUrl, 'utf-8')
    fsPromises.writeFile(path.join(outputDirUrl, fileOrFolderName), result)
  }
}

// 写package.json文件
export const writePackageJson = async(targetFolderUrl, {name, description}) => {
  return fsPromises.writeFile(targetFolderUrl, packageJson({name, description}))
}

// 将内容写入文件
export const writeFile = async(targetFolderUrl, content) => {
  console.log('targetFolderUrl', targetFolderUrl, content)
  return fsPromises.writeFile(targetFolderUrl, content)
}

// 判断文件夹是否为空
export const isEmptyDir = async(targetFolderUrl) => {
  const list = await fsPromises.readdir(targetFolderUrl)
  return !(list?.length > 0)
}