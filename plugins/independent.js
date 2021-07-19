const fs = require('fs-extra')
const rd = require('rd')
const path = require('path')

export default (ctx, options) => {
  const miniappPath = ctx.paths.appPath

  if (process.env.INDEPENDENT !== 'true') return

  const defaultIndependentSroucePath = 'src/cxd'
  const defaultIndependentOutputPath = 'cxd'

  const tempDestPathArr = []

  // 构建的源目录
  const independentSrouceRoot = path.join(
    miniappPath,
    options.independentSrouceRoot || defaultIndependentSroucePath
  )
  // 构建的目标目录
  const independentOutputRoot = path.join(
    miniappPath,
    'dist',
    options.independentOutputRoot || defaultIndependentOutputPath
  )
  // console.log('independentOutputRoot', independentOutputRoot)

  // 修改构建输出目录
  // ctx.initialConfig.outputRoot = independentOutputRoot

  // 扫出独立分包的页面
  if (fs.pathExists()) {
    const fileList = rd.readDirSync(independentSrouceRoot)
    const basePath = fileList.shift()
    const srcPath = path.resolve(independentSrouceRoot, '..')
    fileList.forEach(file => {
      const tempDestPath = path.join(srcPath, file.replace(basePath, ''))
      if (fs.existsSync(tempDestPath)) {
        fs.removeSync(tempDestPath)
      }
      tempDestPathArr.push(tempDestPath)
    })
    // console.log('fileList', fileList)
    // 把独立分包里的各个独立页面分别移动到主目录
    // console.log('file', fileList.slice().shift())
    fs.copySync(independentSrouceRoot, srcPath)
  }

  // console.log('tempDestPathArr', tempDestPathArr)

  // plugin 主体
  ctx.onBuildStart(() => {
    console.log('编译开始！')
  })
  ctx.onBuildFinish(() => {
    console.log('编译结束！')
    // 检查目标路径是否已经存在
    const movePath = path.join(
      miniappPath,
      options.targetProjectPath,
      options.independentOutputRoot
    )
    // 删除 movePath 下的 pages 目录
    const pagePath = path.join(independentOutputRoot, 'pages')
    if (fs.existsSync(pagePath)) {
      fs.removeSync(pagePath)
    }

    if (fs.existsSync(movePath)) {
      fs.removeSync(movePath)
    }
    // 移动构建出来的文件到目标目录
    fs.moveSync(independentOutputRoot, movePath)
    
    // 删除移动时的临时目录
    tempDestPathArr.forEach(path => {
      if (fs.existsSync(path)) {
        fs.removeSync(path)
      }
    })
  })
}
