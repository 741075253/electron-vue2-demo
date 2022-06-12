const { defineConfig } = require('@vue/cli-service')
const path = require('path')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// const isProduction = process.env.NODE_ENV === 'production'

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = defineConfig({
  publicPath: process.env.BASE_URL,
  transpileDependencies: true,
  assetsDir: 'static',
  devServer: {
    port: 9999,
  },
  pluginOptions: {
    electronBuilder: {
      preload: 'src/preload.js',
      // nodeIntegration: true,
      builderOptions: {
        productName: '交通银行',
        appId: 'com.electron.yxc',
        copyright: 'yxc',
        compression: 'store', // "store" | "normal"| "maximum" 打包压缩情况(store 相对较快)，store 39749kb, maximum 39186kb
        // directories: {
        //   output: 'build' // 输出文件夹
        // },
        win: {
          icon: 'public/logo.ico',
          // target: ['nsis', 'zip'],
        },
        nsis: {
          oneClick: false, // 一键安装
          // guid: 'xxxx', // 注册表名字，不推荐修改
          perMachine: true, // 是否开启安装时权限限制（此电脑或当前用户）
          allowElevation: true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
          allowToChangeInstallationDirectory: true, // 允许修改安装目录
          installerIcon: './public/logo.ico', // 安装图标
          uninstallerIcon: './public/logo.ico', // 卸载图标
          installerHeaderIcon: './public/logo.ico', // 安装时头部图标
          createDesktopShortcut: true, // 创建桌面图标
          createStartMenuShortcut: true, // 创建开始菜单图标
          shortcutName: '交通银行', // 图标名称
        },
        extraResources: ['./extra-resources'],
      },
    },
  },
  // configureWebpack: (config) => {
  //   if (isProduction) {
  //     config.plugins.push(
  //       new UglifyJsPlugin({
  //         uglifyOptions: {
  //           output: {
  //             comments: false, // 去掉注释
  //           },
  //           warnings: false,
  //           compress: {
  //             drop_console: true,
  //             drop_debugger: false,
  //             pure_funcs: ['console.log'], //移除console
  //           },
  //         },
  //       })
  //     )
  //   }
  // },
  chainWebpack: (config) => {
    config.resolve.alias.set('@', resolve('src'))
    // .set('src', resolve('src'))
    // .set('common', resolve('src/common'))
    // .set('components', resolve('src/components'))
  },
  productionSourceMap: false,
})
