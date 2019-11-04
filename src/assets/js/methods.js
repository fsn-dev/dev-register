const config = require('@s/config')
export default {
  config: config,
  getParam (param) {
    let str = location.search.split('?')[1]
    if (!str) return null
    let arr = str.split('&')
    for (let obj of arr ) {
      let arr2 = obj.split('=')
      if (arr2[0] === param) {
        return arr2[1]
      }
    }
    return null
  },
  qrCode (cont, id) {
    let QRCode = require('qrcodejs2')
    document.getElementById(id).innerHTML = ''
    let qrcodeInit = new QRCode(id, {
      width: 270,
      height: 270, // 高度
      text: cont // 二维码内容
      // render: "canvas" // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
      // background: "#f0f"
      // foreground: "#ff0"
    })
    // console.log(qrcodeInit)
    // qrcodeInit = null
  },
  createHash (hashLength) {
    // if (!hashLength || typeof(Number(hashLength)) != 'number') {return}
    hashLength = hashLength ? hashLength : 5
    var ar = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    var hs = []
    var hl = Number(hashLength)
    var al = ar.length
    for (var i = 0; i < hl; i ++) {
        hs.push(ar[Math.floor(Math.random() * al)])
    }
    return hs.join('')
  }
}