// pbjs [options] file1.proto file2.json ...  (or pipe)  other | pbjs [options] -
import fs from 'fs'
import shelljs from 'shelljs'
import template from "./template.js";
import {Gitlab} from "@gitbeaker/node";
const shConfig = {
  toJs: 'pbjs -t static-module -w  commonjs --keep-case -o protos/svc/proto.js  protos/svc/*.proto\n',
  toTs: 'pbts -o proto.d.ts proto.js\n',
  toJson: 'pbjs -t json *.proto > bundle.json\n'
}

// 创建配置文件
const generateFile = (a, pbconfigName) => {
  fs.writeFileSync(`./${pbconfigName}`, JSON.stringify(template, null, 4))
}

// 读取配置文件，下载对应pb文件
const readConfigCreatePb = async (pbConfigName) => {
  const config = JSON.parse(fs.readFileSync(`./${pbConfigName}`).toString())
  const gitLabConf = config.gitLab
  const api = new Gitlab(gitLabConf)
  const {projectId, protoNames, targetPath, branch} = gitLabConf

  for (let protoName of protoNames) {
    const data = await api.RepositoryFiles.show(projectId, protoName, branch)
    let content = Buffer.from(data.content, 'base64').toString('utf8')

    const targetFile = `${targetPath}/${protoName}`
    const fList = targetFile.split('/')
    fList.splice(fList.length-1, 1)
    if (!fs.existsSync(fList.join('/'))) { // 创建文件夹
      fs.mkdirSync(fList.join('/'),{ recursive: true })
    }
    fs.writeFileSync(`${targetPath}/${protoName}`, content)
  }
}

// 根据pb文件，生成对应js/ts文件
const readPbCreateJs = async (pbConfigName) => {
  const config = JSON.parse(fs.readFileSync(`./${pbConfigName}`).toString())
  const {gitLab, needChangeToDTS, needChangeToJS, needChangeToJSON, protobufjs} = config
  const {protoNames, targetPath} = gitLab
  let commend = ''

  for (let protoName of protoNames) {

    const targetFile = `${targetPath}/${protoName}`
    const fList = targetFile.split('/')
    fList.splice(fList.length-1, 1)
    const filePath = fList.join('/')
    commend += (`pbjs -t static-module -w  ${protobufjs.wrap} ${protobufjs.keep_case ? '--keep-case': ''}  ${protobufjs.es6 ? '--es6' : ''} -o ${targetFile.replace('.proto', '.js')}  ${targetFile}\n`)
    if (needChangeToDTS) {
      commend += (`pbts -o ${targetFile.replace('.proto', '.d.ts')} ${targetFile.replace('.proto', '.js')}\n`)
    }
    if (needChangeToJSON) {
      commend += (`pbjs -t json ${targetFile} -o ${targetFile.replace('.proto', '.json')}\n`)
    }
  }


  fs.writeFileSync(`${targetPath}/gen.sh`, commend)
  shelljs.exec(`sh ${targetPath}/gen.sh`)

  if (!needChangeToJS) {
    for (let protoName of protoNames) {
      const targetFile = `${targetPath}/${protoName}`
      const fList = targetFile.split('/')
      fList.splice(fList.length-1, 1)
      const filePath = fList.join('/')
      const dir = fs.readdirSync(filePath)
      for (let file of dir) {
        if (file.endsWith('.js')) {
          fs.unlinkSync(`${filePath}/${file}`)
        }
      }
    }
  }


}


export {generateFile, readConfigCreatePb, readPbCreateJs}
