import req from '@/api/service'
import areas from '@/utils/areas.js'
async function importExecl(url, file, option) {
  // URL：请求API，file：导入的文件；option需要校验的表头
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = function (event) {
      try {
        const bytes = new Uint8Array(event.target.result)
        let binary = ''
        for (let i = 0; i < bytes.byteLength; i++) {
          binary += String.fromCharCode(bytes[i])
        }
        const XLSX = require('xlsx')
        const workbook = XLSX.read(binary, { type: 'binary' }) // execl中的sheets
        const data = XLSX.utils.sheet_to_json(
          workbook.Sheets[workbook.SheetNames[0]]
        ) // 取第一张表的数据
        resolve(importExeclHandle(data, url, file, option))
      } catch (error) {
        return
      }
    }
    reader.onerror = () => {
      return reject('error')
    }
    reader.readAsArrayBuffer(file)
  })
}
async function importExeclHandle(data, url, file, option) {
  let res
  if (data.length != 0 && checkFileHead(data[0], option)) {
    res = await req.post(url, file, {
      'Content-type': 'application/json;charset=UTF-8',
    })
  } else {
    // 内容不符合要求
    res = false
  }
  return res
}
function checkFileHead(obj, option) {
  // option 数组
  return option.every(key => {
    return obj[key] != undefined
  })
}
// 导出文件
async function exportFile(url, params, reqType) {
  // reqType是提交类型 formData json
  console.log(reqType)
  console.log(params)
  let res
  if (reqType == 'formData') {
    console.log(url)
    var form = document.createElement('form')
    form.style.display = 'none'
    form.action = url
    form.method = 'post'
    form.enctype = 'multipart/form-data'
    document.body.appendChild(form)
    for (const key in params) {
      // formData.append(key,params[key]);
      var input = document.createElement('input')
      input.type = 'hidden'
      input.name = key
      input.value = params[key]
      form.appendChild(input)
    }
    form.submit()
    form.remove()
  } else if (reqType == 'json') {
    res = await req.post(url, params, { responseType: 'arraybuffer' })
    let fileName = res.headers['content-disposition'].split('filename=')[1]
    const blob = new Blob([res.data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })
    // console.log( new Blob([res.data], {type: "application/vnd.ms-excel"}));
    const link = document.createElement('a')
    const objectUrl = URL.createObjectURL(blob) // 创建URL
    link.href = objectUrl
    link.download = fileName // 自定义文件名
    link.click() // 下载文件
    URL.revokeObjectURL(objectUrl) // 释放内存
  }
}
//地址 code 转化 四个直辖市
// 后台获取之后转化 适配area.js
function recoverAddressCode(address) {
  if (
    address.provinceCode === '110000' ||
    address.provinceCode === '120000' ||
    address.provinceCode === '310000' ||
    address.provinceCode === '500000'
  ) {
    address.cityCode = String(address.provinceCode - 0 + 100)
  }
  return address
}
// 根据code获取对应name
function getCodeName(provinceCode, cityCode, countyCode) {
  let obj = {}
  if (provinceCode) {
    obj.provinceCode = provinceCode
    obj.provinceName = areas.province_list[provinceCode]
  }
  if (cityCode) {
    obj.cityCode = cityCode
    obj.cityName = areas.city_list[cityCode]
  }
  if (countyCode) {
    obj.districtCode = countyCode
    obj.districtName = areas.city_list[countyCode]
  }
  return obj
}
//提交之前  预处理
function coverAddressCode(address) {
  if (
    address.provinceCode === '110000' ||
    address.provinceCode === '120000' ||
    address.provinceCode === '310000' ||
    address.provinceCode === '500000'
  ) {
    address.cityCode = address.provinceCode
  }
  return address
}
export {
  importExecl,
  exportFile,
  recoverAddressCode,
  coverAddressCode,
  getCodeName,
}
