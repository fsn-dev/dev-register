<template>
  <div class="bg" v-loading="loading">
    <!-- <el-button type="primary" @click="openForm">主要按钮</el-button>
    <el-button type="primary" @click="getGit">Get Git</el-button> -->
    <div class="container-small flex-ec" v-show="componentNum === 1 || componentNum === 2">
      <div class="changeLang_box">
        <el-select v-model="language" size="mini" @change="changLanguage">
          <el-option
            v-for="item in languageOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>

    <section class="initPage_box" v-show="componentNum === 1">
      <div class="logo"><img src="@s/img/logo/logoxs.svg"></div>
      <h3 class="color_ff title">{{$t('TITLE').joinCM}}</h3>
      <div class="flex-c">
        <el-button type="primary" @click="handRegi">{{$t('BTN').hangRegister}}</el-button>
        <el-button type="primary" @click="openForm">{{$t('BTN').githubLogin}}</el-button>
      </div>
      <div class="QRcode_box" v-if="$i18n.locale === 'zh-CN'">
        <div class="flex-c WW100">
          <div class="pic"><img src="@s/img/QRcode/wxkefu.jpg"></div>
        </div>
        <h3 class="title font12">{{$t('NOTES').N_8}}</h3>
      </div>
    </section>

    <formTable :gitID="gitID" :email="email" :isPublic="isPublic" :invite="invite" @closeFormEvent="closeForm" @setRefCode="changeRefCode" v-show="componentNum === 2"/>

    <CreateCode :refCode="refCode" @closeFormEvent="closeForm" v-show="componentNum === 3"></CreateCode>

  </div>
</template>

<style>
body, .bg{min-width: 100%;min-height: 100%;min-width: 100vw;min-height: 100vh;background:linear-gradient(to bottom,#2677fe,#7e63ff);background:-webkit-linear-gradient(to bottom,#2677fe,#7e63ff);background:-o-linear-gradient(to bottom,#2677fe,#7e63ff);background:-moz-linear-gradient(to bottom,#2677fe,#7e63ff);position: relative;}

.container-small {max-width: 800px;margin: auto;}

.changeLang_box{width: 100px;margin-top: 20px;}
.changeLang_box .el-input__inner{background: none;border: none;color: #fff;}

.initPage_box {padding-top: 10vh;}
.initPage_box .logo{width: 150px;margin: auto;}
.initPage_box .logo img{width: 100%;}
/* .initPage_box .title{} */
.QRcode_box {margin: auto;padding-top: 30px;}
.QRcode_box .title{font-size: 16px;color: #fff;}
.QRcode_box .pic{width: 150px;}
.QRcode_box .pic img{width: 100%;}
</style>

<script>
import FormTable from '@p/home/form'
import CreateCode from '@p/home/createCode'

import Cookies from 'js-cookie'
export default {
  name: 'HomeView',
  data () {
    return {
      dialogVisible: false,
      gitID: '',
      refCode: '',
      email: '',
      loading: false,
      gitCode: '',
      formFlag: false,
      componentNum: 1,
      invite: '',
      language: this.$i18n.locale,
      languageOption: [
        {value: 'en-US', label: 'English'},
        {value: 'zh-CN', label: '中文简体'}
      ],
      isPublic: 0
    }
  },
  components: {
    FormTable,
    CreateCode
  },
  sockets: {
    getGitUserInfo (res) {
      console.log(res)
      if (res.msg === 'Success') {
        this.gitID = res.username
        this.email = res.email
        this.isPublic = res.isPublic
        this.setRefCookie('JOIN_CM_TOKEN', this.gitID)
      } else {
        this.$message({
          message: this.$t('WARNING_TIP').TIP_0,
          type: 'warning'
        })
        this.gitID = ''
      }
      if (this.gitID) {
        this.componentNum = 2
      }
      this.loading = false
    }
  },
  mounted () {
    if (this.$$.getParam('code')) {
      this.loading = true
      this.getGit()
    }
    let ref = this.$$.getParam('invite') ? this.$$.getParam('invite') : ''
    if (ref) {
      this.setRefCookie('JOIN_CM_REF', ref)
    }
    this.invite = this.getRefCookie('JOIN_CM_REF')
  },
  methods: {
    openForm () {
      //github登录授权页面
      let oauth_uri='https://github.com/login/oauth/authorize'
      //github中获取
      let client_id = this.$$.config.gitRsConfig.client_id
      //授权回调地址
      let redirect_uri = this.$$.config.gitRsConfig.redirect_uri
      let url = `${oauth_uri}?client_id=${client_id}&redirect_url=${redirect_uri}`
      // window.open(url)
      // console.log(url)
      window.location.href = url
    },
    closeForm (data) {
      this.componentNum = data
    },
    changeRefCode (data) {
      this.refCode = data
    },
    handRegi () {
      // this.formFlag = true
      this.componentNum = 2
    },
    getGit ()  {
      this.$socket.emit('getGitUserInfo', {
        code: this.$$.getParam('code')
      })
    },
    setRefCookie (key, val) {
      Cookies.set(key, val, { expires: 7 })
    },
    getRefCookie (key) {
      return Cookies.get(key)
    },
    changLanguage () {
      this.$i18n.locale = this.language
      localStorage.setItem('JOIN_CM_LANGUAGE_TYPE', this.language)
      document.title = this.$t('TITLE').joinCM
    },
  }
}
</script>