import Vue from 'vue'
export default function _global_checkFile(file, params) {
  let testMsg = file.name.substring(file.name.lastIndexOf('.') + 1)
  let typeLimit = true
  if (params.i) {
    // 格式信息
    const set = new Set(params.i.split(','))
    typeLimit = set.has(testMsg.toLocaleLowerCase())
  }

  const isLt2M = file.size / 1024 < (params.k || 400)
  if (!typeLimit) {
    _global_tips('warning', `上传文件只能是 ${params.i} 格式!`)
    return false
  } else if (!isLt2M) {
    _global_tips('warning', `上传文件大小不能超过 ${params.k || 400}kb!`)
    return false
  } else {
    return _global_checkSize(file, params)
  }
}

function _global_checkSize(file, params) {
  const width = params.w || 10000
  const height = params.h || 10000
  const compTag = params.compTag || -1
  return new Promise((resolve, reject) => {
    const _URL = window.URL || window.webkitURL
    const img = new Image()
    img.onload = () => {
      // compTag:1表示大于，-1表示不大于
      const valid =
        compTag == 1
          ? img.width > width && img.height > height
          : img.width <= width && img.height <= height
      if (valid) resolve()
      else reject()
    }
    img.src = _URL.createObjectURL(file)
  }).then(
    () => {
      return file
    },
    () => {
      _global_tips(
        'warning',
        compTag == 1
          ? `文件尺寸不小于${width} * ${height}`
          : `文件尺寸不超过${width} * ${height}`
      )
      return Promise.reject()
    }
  )
}

function _global_exceedLimit(count) {
  this._global_tips('warning', `只能上传${count || 1}张图片`)
}

function _global_tips(type, message) {
  Vue.prototype.$message({
    type,
    message,
  })
}
