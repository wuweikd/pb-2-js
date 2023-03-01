#!/usr/bin/env node

import {program} from "commander";
import inquirer from "inquirer";
import {generateFile, readConfigCreatePb, readPbCreateJs} from "./generate.js";
const PBCONFIGNAME = 'protobufConfig.json'
program.version('0.0.1', '-v, --version').usage('<command> [options]')

const choseList = [
  {
    type: 'list',
    message: '确定要初始化吗，初始化将覆盖原配置文件',
    name: 'needInit',
    default: 'false',
    choices: [
      'false',
      'true',
    ],
  },
]


program
  .command('init')
  .alias('i')
  .description('初始化，生成默认配置')
  .action(async cmd => {
    const  answers = await inquirer.prompt(choseList)
    if (answers.needInit === 'false') {
      console.log('取消初始化')
      return
    }
    generateFile(answers, PBCONFIGNAME)
    console.log('\x1B[32m%s\x1B[0m', `生成默认配置生成成功!请查看${PBCONFIGNAME}`)
  })

program
  .command('start')
  .alias('s')
  .description('根据配置生成对应的js/ts文件')
  .action(async cmd => {
    console.log('\x1B[32m%s\x1B[0m', `第一步：开始读取${PBCONFIGNAME},准备下载.proto文件`)
    await readConfigCreatePb(PBCONFIGNAME)
    console.log('\x1B[32m%s\x1B[0m', '第二步：.proto文件下载完成,准备根据配置创建js/ts文件')
    await readPbCreateJs(PBCONFIGNAME)
    console.log('\x1B[32m%s\x1B[0m', '第三步：根据.proto文件，生成对应js/ts文件')
  })


program.arguments('[command]').action(cmd => {
  program.outputHelp()
})

program.parse(process.argv)







