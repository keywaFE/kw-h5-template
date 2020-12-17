const fs = require('fs')
const path = require('path')

const proxy = {
  '/api': {
    target: 'http://dev-xuanpin.keywa.cc',
    changeOrigin: true,
    pathRewrite: {
      '^/api': ''
    }
  }
}

const getPages = () =>
  fs
    .readdirSync(path.resolve(__dirname, './src/pages/'))
    .filter(item => item !== '_layouts' && item !== '_includes')

const getEntries = modules => {
  return modules.reduce((rs, module, input) => {
    rs[module] = {
      entry: path.join(__dirname, `./src/pages/${module}/main.js`),
      template: 'public/template.html',
      config: require(`./src/pages/${module}/config.js`),
      cdn
    }
    return rs
  }, {})
}

// const proxyRoutes = ['prevention', 'demand', 'data']
// const proxyTarget = 'http://dev.rhh.keywa.cc'
// const proxyGenerator = (proxyRoutes, target) =>
//   proxyRoutes.reduce((acc, cur, input) => {
//     acc['/' + cur] = {
//       target,
//       changeOrigin: true,
//     }
//     return acc
//   }, {})

const isProduction = process.env.NODE_ENV === 'production'

const cdn = {
  css: [
    // 'https://cdn.bootcss.com/element-ui/2.13.0/theme-chalk/index.css'
  ],
  js: [
    'https://cdn.bootcss.com/vue/2.6.10/vue.min.js',
    // 'https://cdn.bootcss.com/element-ui/2.13.0/index.js',
    'https://cdn.bootcss.com/axios/0.19.2/axios.min.js'
  ]
}

const externals = {
  vue: 'Vue',
  axios: 'axios',
  'element-ui': 'ELEMENT'
}

module.exports = {
  publicPath: isProduction ? '/h5' : '/',
  chainWebpack: config => {
    config.resolve.alias
      .set('assets', '@/assets')
      .set('components', '@/components')
      .set('page', '@/page')
      .set('api', '@/api')
      .set('utils', '@/utils')

    config.externals(externals)
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: !!isProduction,
    // 开启 CSS source maps?
    sourceMap: false,
    requireModuleExtension: true,
    // css预设器配置项
    loaderOptions: {
      postcss: {
        // 这是rem适配的配置
        plugins: [
          require('postcss-px2rem')({
            remUnit: 100
          })
        ]
      },
      sass: {
        prependData:
          '@import "src/style/_mixin.scss";@import "src/style/_variables.scss";' // 全局引入
      }
    }
  },
  lintOnSave: true, // default false
  // 打包时不生成.map文件
  productionSourceMap: true,
  devServer: {
    proxy
  },
  pages: getEntries(getPages())
}
