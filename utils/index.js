import figlet from "figlet";
import path from 'path'
import fsPromises from 'node:fs/promises';
import fs from 'fs'

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
  const content = `
{
  "name": "${name}",
  "description": "${description}",
  "private": true,
  "version": "0.0.1",
  "type": "module",
  "scripts": {
    "local": "vite --mode testing",
    "build:dev": "vite build --mode dev",
    "build:test": "vite build --mode testing", 
    "build": "vite build --mode prod",
    "preview": "vite preview"
  },
  "dependencies": {
    "axios": "^1.4.0",
    "dayjs": "^1.11.9",
    "lib-flexible": "^0.3.2",
    "postcss-pxtorem": "^6.0.0",
    "sass": "^1.56.2",
    "sass-loader": "^13.2.0",
    "vue": "^3.2.41",
    "vue-router": "^4.0.13"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^3.2.0",
    "autoprefixer": "^10.4.13",
    "typescript": "^4.6.4",
    "url": "^0.11.1",
    "vite": "^3.2.3",
    "vite-plugin-html": "^3.2.0",
    "vite-plugin-singlefile": "^0.13.2",
    "vue-tsc": "^1.0.9"
  }
}
  `
  return fsPromises.writeFile(targetFolderUrl, content)
}
