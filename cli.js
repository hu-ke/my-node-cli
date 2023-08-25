#! /usr/bin/env node
import { input } from '@inquirer/prompts'; // inquirer命令行询问用户问题，记录回答结果
import path, { dirname } from 'path'
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
import fsPromises from 'node:fs/promises';
import ejs from 'ejs'
// import { program } from 'commander' // commander用于命令行自定义指令

// program
// .version('0.1.0')
// .command('create <name>')
// .description('create a new project')
// .action(name => { 
//     // 打印命令行输入的值
//     console.log("project name is " + name)
// })

// program.parse()

// const answers = {
//     name: await input({ message: 'Enter your name' }),
//     age: await input({ message: 'and your age'})
// }
// const destUrl = path.join(__dirname, 'templates')
// const cwdUrl = process.cwd()
// console.log('destUrl', destUrl, 'cwdUrl', cwdUrl)
// // 从模版目录中读取文件
// fs.readdir(destUrl, (err, files) => {
//     if (err) throw err;
//     files.forEach((file) => {
//       // 使用 ejs 渲染对应的模版文件
//       // renderFile（模版文件地址，传入渲染数据）
//       ejs.renderFile(path.join(destUrl, file), answers).then(data => {
//         // 生成 ejs 处理后的模版文件
//         fs.writeFileSync(path.join(cwdUrl, file) , data)
//       })
//     })
// })

const targetFileOrFolderUrl = path.join(__dirname, 'templates', 'wisepick-fe')
const outputDirUrl = path.join(__dirname, 'generated')

async function generate(targetFileOrFolderUrl, outputDirUrl, fileOrFolderName) {
    // 是文件夹
    if ((await fsPromises.stat(targetFileOrFolderUrl)).isDirectory()) {
        // 在输出目录下创建文件夹
        await fsPromises.mkdir(path.join(outputDirUrl, fileOrFolderName))
        // 将目标文件夹下的文件/文件夹 写到 输出目录
        let list = await fsPromises.readdir(targetFileOrFolderUrl)
        for (let name of list) {
            generate(path.join(targetFileOrFolderUrl, name), path.join(outputDirUrl, fileOrFolderName), name)
        }
    } else {
        console.log('targetFileOrFolderUrl', targetFileOrFolderUrl)
        // 普通文件，直接写
        let result = await fsPromises.readFile(targetFileOrFolderUrl, 'utf-8')
        fsPromises.writeFile(path.join(outputDirUrl, fileOrFolderName), result)
    }
}

generate(targetFileOrFolderUrl, outputDirUrl, 'wisepick-fe')
