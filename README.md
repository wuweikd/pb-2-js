



# 掘金文章，配合使用更佳： 

https://juejin.cn/post/7203285698074148919

# pb-2-js
> 将pb文件转换为js/ts/.d.ts；通过传入git的链接，得到对应的文件。


## 如何使用
### 1.第一步：下载
> 执行： `npm i @yy/pb-2-js -D --registry=https://npm-registry.duowan.com`
### 2.第二步：初始化，自动创建配置文件：`protobufConfig.json`
> 执行：`pb-2-js i`
### 3.第三步：修改`protobufConfig.json`配置

效果图：
[![pSvPBFO.png](https://s1.ax1x.com/2023/02/22/pSvPBFO.png)](https://imgse.com/i/pSvPBFO)
### 4.第四步：根据`protobufConfig.json`配置，生成目标文件，如.js/.d.ts
> 执行 `pb-2-js s`

效果图：
[![pSvPVzj.png](https://s1.ax1x.com/2023/02/22/pSvPVzj.png)](https://imgse.com/i/pSvPVzj)

## 使用技术
1. [npm命令](https://docs.npmjs.com/cli/v9/configuring-npm/package-json#bin)
2. protobufjs 7.x: [protobuf.js cli](https://github.com/protobufjs/protobuf.js/blob/master/cli/README.md)
3. @gitbeaker/node
4. commander
5. shelljs
6. inquirer
7. 其他：[本cli如何实现的](https://juejin.cn/post/7203285698074148919)

## 版本更新
- 0.0.1: 初始版本，错误的依赖，已经废弃
- 0.0.2: 将protobufjs 升级为7.x 版本
- 0.0.3: 补充文档而已

## 谁在使用
[me小世界，只生成了.d.ts](https://git.duowan.com/webs/bilin/me-small-world/-/blob/master/protobufConfig.json)
