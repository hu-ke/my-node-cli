#! /usr/bin/env node
import { input } from '@inquirer/prompts';
import path, { dirname } from 'path'
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
import fs from 'fs'
import ejs from 'ejs'

const answers = {
    name: await input({ message: 'Enter your name' }),
    age: await input({ message: 'and your age'})
}
const destUrl = path.join(__dirname, 'templates')
const cwdUrl = process.cwd()

// 从模版目录中读取文件
fs.readdir(destUrl, (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
      // 使用 ejs 渲染对应的模版文件
      // renderFile（模版文件地址，传入渲染数据）
      ejs.renderFile(path.join(destUrl, file), answers).then(data => {
        // 生成 ejs 处理后的模版文件
        fs.writeFileSync(path.join(cwdUrl, file) , data)
      })
    })
})


