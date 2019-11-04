<template>
  <div>
    <div class="codeImg_box" id="codeHtml" v-show="isShowCode">
      <img :src="codeBg">
      <div id="code"></div>
    </div>
    <div id="codeImg" class="pt-20" @click="uploadPic"></div>
    <section class="initPage_box" v-show="!isShowCode">
      <div class="logo"><img src="@s/img/logo/logoxs.svg"></div>
      <!-- <h3 class="color_ff title">{{$$.config.title}}</h3> -->
      <p class="color_ff">邀请小伙伴们注册，奖励叠加400个*邀请数量</p>
      <div class="flex-c">
        <div class="flex-c refCont_cont">
          <el-input placeholder="请输入内容" v-model="codeCont" readonly id="codeCopy"> </el-input>
          <el-button type="primary" @click="copyCode" class="ml-10">{{$t('BTN').copy}}</el-button>
        </div>
      </div>
      <div class="flex-c">
        <el-button type="primary" @click="createCv">{{$t('BTN').createCode}}</el-button>
        <el-button type="primary" @click="goCM">{{$t('BTN').goCM}}</el-button>
        <el-button @click="closeForm(2)" class="nobg color_ff">{{$t('BTN').cancel}}</el-button>
      </div>
      <!-- <div class="flex-c mt-10">
        <el-button type="primary" @click="copyCode">{{$t('BTN').copy}}</el-button>
      </div> -->
    </section>
  </div>
</template>

<style>
.codeImg_box {width: 360px;min-height:300px;margin: auto;position: relative;line-height: 0;display: none;}
.codeImg_box img {width: 100%;height: 100%;margin: 0;}
#code {width:115px;height:115px;position: absolute;bottom: 81px;left: 123px;}
#codeImg {display: inline-block;}
.refCont_cont {width: 360px;padding: 0px 0 20px;}
.refCont_cont .el-input__inner{background: none!important;color:#fff;padding: 0 5px;}
</style>

<script>
import  html2canvas  from  'html2canvas'
const QRCode = require('qrcodejs2')
export default {
  name: 'CreateCode',
  props: {
    refCode: {
      type: String
    },
  },
  data () {
    return {
      codeBg: require('@s/img/bg/bg.png'),
      // codeBg: '',
      isShowCode: false,
      codeCont: '',
      uploadPicUrl: ''
    }
  },
  sockets: {
    cbImg (res) {
      console.log(res)
    }
  },
  watch: {
    refCode () {
      if (this.refCode) {
        this.codeCont = this.$$.config.joinCMURL + '/?invite=' + this.refCode
      } else {
        this.codeCont = this.$$.config.joinCMURL + '/?invite='
      }
    }
  },
  mounted () {
    this.codeCont = this.$$.config.joinCMURL + '/?invite=' + this.refCode
    // this.$socket.emit('cbImg')
    // this.createCode()
  },
  methods: {
    createCode () {
      // console.log(this.codeCont)
      let qrcodeInit = new QRCode('code', {
        width: 115,
        height: 115, // 高度
        text: this.codeCont, // 二维码内容
        image: '@s/img/bg/bg.jpg'
        // render: "canvas" // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
        // background: "#f0f"
        // foreground: "#ff0"
      })
    },
    createCv () {
      let htmlDom = document.querySelector('#codeHtml')
      this.createCode()
      htmlDom.style.display = 'block'
      html2canvas( htmlDom , {
          allowTaint: false,   //允许污染
          taintTest: true,    //在渲染前测试图片(没整明白有啥用)
          useCORS: true,      //使用跨域(当allowTaint为true时这段代码没什么用,下面解释)
          background: "none",
          scale:2
          // width: 640,
          // height: 1000
      }).then((canvas) => {
        this.uploadPicUrl = canvas.toDataURL()
        document.getElementById('codeImg').appendChild(canvas)
        htmlDom.style.display = 'none'
        this.isShowCode = true
      })
    },
    uploadPic () {
      // console.log(this.uploadPicUrl)
      let _a = document.createElement('a')
      _a.href = this.uploadPicUrl
      _a.download = this.$t('TITLE').joinCM
      _a.target = '_blank'
      _a.click()
      _a = null
      // window.open(this.uploadPicUrl)
    },
    closeForm (num) {
      this.$emit('closeFormEvent', Number(num))
    },
    copyCode () {
      document.getElementById('codeCopy').select()
      document.execCommand("Copy")
      this.$message({
        message: this.$t('SUCCESS_TIP').TIP_2,
        type: 'success'
      })
    },
    goCM () {
      // window.open('https://github.com/fsn-dev')
      window.open('https://github.com/orgs/fsn-dev/invitation')
    }
  }
}
</script>
