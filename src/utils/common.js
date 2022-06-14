// 获取文件名
export function getFileName(file) {
  if (!file) {
    return ''
  }
  const point = file.lastIndexOf('.')
  return file.substring(0, point)
}

// 给数据分页
export function parserPageList(data, pageSize = 6) {
  if (!data || !data.length) {
    return []
  }
  data = [...data]
  const list = []
  while (data.length) {
    list.push(data.splice(0, pageSize))
  }
  return list
}

export function getVideoInfo(name, src) {
  return new Promise((resolve) => {
    const video = document.createElement('video')
    video.setAttribute('src', `file:///${src}`)
    video.onloadedmetadata = () => {
      video.currentTime = 1
    }
    video.onseeked = () => {
      const { duration, videoHeight, videoWidth } = video
      let w = videoWidth
      let h = videoHeight
      if (w > h) {
        if (w > 640) {
          const scale = 640 / videoWidth
          w = 640
          h = Math.ceil(h * scale)
        }
      } else {
        const scale = 480 / videoHeight
        h = 480
        w = Math.ceil(w * scale)
      }
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = w
      canvas.height = h
      ctx?.drawImage(video, 0, 0, w, h)
      const dataUrl = ctx?.canvas.toDataURL('image/jpeg', 0.9) || ''

      const min = Math.floor(duration / 60)
      const sec = Math.floor(duration % 60)

      resolve({
        path: src,
        name,
        duration:
          (min >= 10 ? min : `0${min}`) + ':' + (sec >= 10 ? sec : `0${sec}`),
        current: 0,
        poster: dataUrl,
      })
    }
    video.onerror = () => {
      resolve(null)
    }
  })
}
