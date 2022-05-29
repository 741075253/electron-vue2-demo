const { contextBridge } = require('electron')
const fs = require('fs')
const path = require('path')

contextBridge.exposeInMainWorld('electron', {
  readFile: async (url, callback) => {
    const src = getExtraResourcesPath(url)
    const file = await fs.readFileSync(src)
    callback(file)
  },
  getUrl: (url) => {
    return getExtraResourcesPath(url)
  },
  getFiles: async (filename) => {
    return await fs.readdirSync(getExtraResourcesPath(filename))
  },
})

function getExtraResourcesPath(filename) {
  const resources = process.env.NODE_ENV === 'production' ? '/resources' : ''
  return path.join(process.cwd(), `${resources}/extra-resources/${filename}`)
}
