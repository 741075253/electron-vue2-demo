const { contextBridge, ipcRenderer } = require('electron')
const jsonFile = require('jsonfile')
const fs = require('fs')
const path = require('path')
const fsp = fs.promises
contextBridge.exposeInMainWorld('electronApi', {
  readJson: async (url) => {
    const src = getExtraResourcesPath(url)
    if (!fs.existsSync(src)) {
      return Promise.resolve(false)
    }
    const file = await jsonFile.readFileSync(src)
    return Promise.resolve(file)
  },
  writeJson: async (url, data) => {
    try {
      return await jsonFile.writeFileSync(getExtraResourcesPath(url), data, {
        spaces: 2,
      })
    } catch (err) {
      return err
    }
  },
  readFile: async (url, isAbsolute) => {
    let src = url
    if (!isAbsolute) {
      src = getExtraResourcesPath(url)
    }
    if (!fs.existsSync(src)) {
      return Promise.resolve(false)
    }
    const file = await fs.readFileSync(src)
    return Promise.resolve(file)
  },
  removeFile: (url) => {
    if (!fs.existsSync(url)) {
      return false
    } else {
      // 删除成功返回undefined
      return fs.unlinkSync(url)
    }
  },
  copyFile: async (sourceDirPath, destDirPath, filename) => {
    const sourceFilePath = path.join(sourceDirPath, filename)
    const destFilePath = path.join(destDirPath, filename)
    try {
      await fsp.access(sourceFilePath, fs.constants.R_OK)
      await fsp.access(destDirPath, fs.constants.W_OK)
      await fsp.copyFile(sourceFilePath, destFilePath)

      return true
    } catch (ex) {
      if (ex.errno === -2)
        console.error(`File "${sourceFilePath}" doesn't exist.`)
      else if (ex.errno === -13)
        console.error(`Could not access "${path.resolve(destDirPath)}"`)
      else
        console.error(`Could not copy "${sourceFilePath}" to "${destDirPath}"`)
      return false
    }
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
  saveBase64Poster: (data, file, dirName) => {
    try {
      const raw = data.replace(/^data:image\/(jpeg|png|jpg);base64,/, '')
      const buffer = Buffer.from(raw, 'base64')

      const temp = path.join(getExtraResourcesPath(dirName))
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
  openDialog: (opt) => {
    return ipcRenderer.invoke('dialog:openDialog', opt)
  },
})

function getExtraResourcesPath(filename) {
  const resources = process.env.NODE_ENV === 'production' ? '/resources' : ''
  return path.join(process.cwd(), `${resources}/extra-resources/${filename}`)
}
