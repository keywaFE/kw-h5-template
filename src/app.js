const fs = require('fs')
const path = require('path')

const getPages = () =>
  fs
    .readdirSync(path.resolve(__dirname, './pages/'))
    .filter(item => item !== '_layouts' && item !== '_includes')

const getEntries = modules => {
  return modules.reduce((rs, module, input) => {
    rs[module] = {
      entry: path.join(__dirname, `./pages/${module}/main.js`),
      template: path.join(__dirname, `./pages/${module}/index''`)
    }
    return rs
  }, {})
}

console.log(getEntries(getPages()))
//
const proxyRoutes = ['prevention', 'demand', 'data']

const proxyGenerator = (proxyRoutes, target) =>
  proxyRoutes.reduce((acc, cur, input) => {
    acc['/' + cur] = {
      target,
      changeOrigin: true
    }
    return acc
  }, {})

console.log(proxyGenerator(proxyRoutes))
