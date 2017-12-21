const files = require.context('.', true, /\.json$/)
const modules = {}

files.keys().forEach(key => {
  if (modules[key.replace(/(\.\/|\.json)/g, '').replace(/(\.\/|\/index)/g, '')] === undefined) {
    modules[key.replace(/(\.\/|\.json)/g, '').replace(/(\.\/|\/index)/g, '')] = {}
  }
  modules[key.replace(/(\.\/|\.json)/g, '').replace(/(\.\/|\/index)/g, '')][key.replace(/(\.\/|\.json)/g, '').split('/')[1]] = files(key)
})

export default modules
