const theConfig = {
  "description": "当前文件为pb-2-js的配置文件，只支持gitlab，token需要到gitlab申请，projectId为项目id，protoNames是proto文件的路径",
  gitLab: {
    host: '',
    token: '',
    projectId: '',
    protoNames: [
    ],
    targetPath: 'protos',
    branch: 'master'
  },
  protobufjs: {
    description: "wrap:封装格式，如commonjs、es6、amd、default;",
    wrap: "commonjs",
    "keep_case": true,
    es6: false,
  },
  needChangeToDTS: true,
  needChangeToJS: true,
  needChangeToJSON: true,
}


export default theConfig
