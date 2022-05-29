const { contextBridge } = require('electron')
const jsonFile = require('jsonfile')
const fs = require('fs')
const path = require('path')

contextBridge.exposeInMainWorld('electronApi', {
  readJson: async (url) => {
    const src = getExtraResourcesPath(url)
    if (!fs.existsSync(src)) {
      return Promise.resolve(false)
    }
    const file = await jsonFile.readFileSync(src)
    return Promise.resolve(file)
  },
  writeJson: (url, data, callback) => {
    jsonFile.writeFile(getExtraResourcesPath(url), data, (error) => {
      callback(error)
    })
  },
  readFile: async (url) => {
    const src = getExtraResourcesPath(url)
    if (!fs.existsSync(src)) {
      return Promise.resolve(false)
    }
    const file = await fs.readFileSync(src)
    return Promise.resolve(file)
  },
  getUrl: (url) => {
    return getExtraResourcesPath(url)
  },
  // 获取目录下的文件
  getDir: async (dirname) => {
    const src = getExtraResourcesPath(dirname)
    if (!fs.existsSync(src)) {
      await fs.mkdirSync(src)
    }
    return Promise.resolve(fs.readdirSync(src))
  },
  saveBase64Poster: (data, file) => {
    try {
      const raw = data.replace(/^data:image\/jpeg;base64,/, '')
      const buffer = Buffer.from(raw, 'base64')

      const temp = path.join(getExtraResourcesPath('./posters'))
      if (!fs.existsSync(temp)) {
        fs.mkdirSync(temp, { recursive: true })
      }

      const absPath = path.join(temp, `/${file}.jpg`)
      fs.writeFileSync(absPath, buffer)
      return absPath
    } catch {
      return ''
    }
  },
})

function getExtraResourcesPath(filename) {
  const resources = process.env.NODE_ENV === 'production' ? '/resources' : ''
  return path.join(process.cwd(), `${resources}/extra-resources/${filename}`)
}
