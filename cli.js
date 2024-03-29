#! /usr/bin/env node
import { input, confirm } from '@inquirer/prompts'; // inquirer命令行询问用户问题，记录回答结果
import {printLogo, writePackageJson, generateProjFiles, isFolderExists, removeDir} from './utils/index.js'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url';
import { red, lightCyan, green } from 'kolorist'

const __dirname = dirname(fileURLToPath(import.meta.url));
import { program } from 'commander' // commander用于命令行自定义指令
printLogo()

program
    .name('my-node-cli')
    .description('This is the CLI to help creating a starblink fe project instantly.')
    .version('0.0.1')

// 创建工程
program
    .command('create <name>')
    .description('create a new project')
    .action(async name => {
        let shouldContinue = true
        let alreadyExists = isFolderExists(path.join(__dirname, 'generated', name))
        // 名为name的工程已经存在
        if (alreadyExists) {
            shouldContinue = await confirm({
                message: `${lightCyan(`你输入的 "${name}" 文件夹不为空，是否清空当前${name}并且继续`)}`
            })
        }
        if (!shouldContinue) {
            console.log(`${red('✖ 操作取消')}`)
            return
        }
        // 用户输入
        const answers = {
            name,
            description: await input({ message: '请输入项目描述（Please enter project description）：'})
        }
        // 模板路径
        const targetFileOrFolderUrl = path.join(__dirname, 'templates', 'wisepick-fe')
        // 输出脚手架路径
        const outputDirUrl = path.join(__dirname, 'generated')
        // 生成脚手架之前删除已有的同名脚手架
        if (alreadyExists) {
            await removeDir(path.join(__dirname, 'generated', name))
        }
        // 生成脚手架
        await generateProjFiles(targetFileOrFolderUrl, outputDirUrl, answers.name)
        // 生成脚手架的package.json文件
        const packageJsonUrl = path.join(__dirname, 'generated', answers.name, 'package.json')
        await writePackageJson(
            packageJsonUrl,
            answers
        )
        console.log(green(`工程 ${name} 创建成功.`))
    })

program.parse()
