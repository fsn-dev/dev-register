<template>
  <div>
    <div class="formSet_box">
      <h3 class="title">{{$t('TITLE').joinCM}}</h3>
      <p class="font14" v-html="$t('NOTES').N_0"></p>
      <p class="color_red font14" v-html="$t('NOTES').N_1"></p>
      <el-form ref="userInfo" :model="userInfo" :rules="rules" label-position="top" label-width="auto"  size="medium ">
        <el-form-item :label="$t('LABEL').github" prop="gitID" v-if="!isShowGit">
        <!-- <el-form-item label="github用户名" prop="gitID"> -->
          <div class="flex-c">
            <el-input v-model="userInfo.gitID" @blur="findDevUser"></el-input>
          </div>
          <div class="tip" v-html="$t('NOTES').N_2 + userInfo.gitID"></div>
        </el-form-item>
        <el-form-item :label="$t('LABEL').wx" prop="wx">
          <el-input v-model="userInfo.wx" :disabled="isDisabled"></el-input>
        </el-form-item>
        <el-form-item :label="$t('LABEL').email" prop="email">
          <el-input v-model="userInfo.email" :disabled="isDisabled"></el-input>
        </el-form-item>
        <el-form-item :label="$t('LABEL').work" prop="work">
          <el-input v-model="userInfo.work" :disabled="isDisabled"></el-input>
          <div class="tip" v-html="$t('NOTES').N_3"></div>
        </el-form-item>
        <el-form-item :label="$t('LABEL').role" prop="roleArr">
          <el-checkbox-group v-model="roleVal" :min="1" :max="2" class="text-l" @change="changeRole">
            <el-checkbox v-for="(item, index) in roleArr" :label="JSON.stringify(item)" :key="index" :disabled="isDisabled">{{$i18n.locale === 'zh-CN'? item.name : item.name_en}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item :label="$t('LABEL').city" v-if="isDisabled && !regionObj.s.id">
          <div class="flex-c">
            <el-input v-model="userInfo.city" :disabled="isDisabled"></el-input>
            <el-button type="primary" class="ml-10" @click="getCurrCity" :disabled="isDisabled">{{$t('BTN').selectCity}}</el-button>
          </div>
        </el-form-item>
        <el-form-item :label="$t('LABEL').city" prop="city" v-else>
          <div class="flex-bc">
            <el-select v-model="regionObj.s.id" filterable @change="changeState" class="WW100" :disabled="isDisabled">
              <el-option v-for="(item, index) in regionArr.s" :key="index" :label="$i18n.locale === 'zh-CN'? item.name : item.name_en" :value="item.id"></el-option>
            </el-select>
            <el-select v-model="regionObj.c.id" filterable class="ml-10 WW100" @change="changeCountry" :disabled="isDisabled">
              <span slot="empty" class="flex-c pt-10 pb-10 font12 color_99">Null</span>
              <el-option v-for="(item, index) in regionArr.c" :key="index" :label="$i18n.locale === 'zh-CN'? item.name : item.name_en" :value="item.id"></el-option>
            </el-select>
            <el-select v-model="regionObj.p.id" filterable class="ml-10 WW100" @click="changeProvince" :disabled="isDisabled">
              <span slot="empty" class="flex-c pt-10 pb-10 font12 color_99">Null</span>
              <el-option v-for="(item, index) in regionArr.p" :key="index" :label="$i18n.locale === 'zh-CN'? item.name : item.name_en" :value="item.id"></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item :label="$t('LABEL').skill" prop="skill">
          <el-input type="textarea" v-model="userInfo.skill" :disabled="isDisabled"></el-input>
          <div class="tip" v-html="$t('NOTES').N_4"></div>
        </el-form-item>
        <el-form-item :label="$t('LABEL').uploadFile">
          <!-- <el-input v-model="userInfo.file"></el-input> -->
          <div class="flex-sc">
              <!-- :action="$$.config.appURL + '/uploadFile'" -->
            <el-upload class="WW100 text-l" :disabled="isDisabled" :action="$$.config.uploadFile" drag multiple :on-success="uploadFileSuccess" :on-remove="removeFileSuccess" :file-list="fileUrlList">
              <i class="el-icon-upload" v-if="!isDisabled"></i>
              <div class="el-upload__text" v-html="$t('BTN').clickUpload" v-if="!isDisabled"></div>
              <!-- <div class="el-upload__tip" slot="tip">不超过500kb</div> -->
            </el-upload>
          </div>
          <div class="tip" v-html="$t('NOTES').N_5"></div>
        </el-form-item>
        <el-form-item :label="$t('LABEL').ref" prop="ref" v-if="!isShowRef && !isRegister">
          <el-input v-model="userInfo.ref" :disabled="isDisabled"></el-input>
          <div class="tip" v-html="$t('NOTES').N_6"></div>
        </el-form-item>
        <el-form-item :label="$t('LABEL').address">
          <el-input v-model="userInfo.address" :disabled="isDisabled"></el-input>
          <div class="tip" v-html="$t('NOTES').N_7"></div>
        </el-form-item>
        
        <el-form-item class="btn_box mt-20">
          <el-button type="primary" @click="resigterBtn('userInfo')" :disabled="isDisabled" v-if="!isDisabled">{{isRegister ? $t('BTN').sureEdit : $t('BTN').nowJoin}}</el-button>
          <el-button type="primary" @click="closeForm(3)" v-if="isDisabled">{{$t('BTN').createCode}}</el-button>
          <el-button type="primary" @click="openEditBtn" v-if="isDisabled">{{$t('BTN').editInfo}}</el-button>
          <el-button @click="closeForm(1)">{{$t('BTN').cancel}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style>
.formSet_box {max-width: 800px;margin: auto;background:#fff;border-radius:8px;box-shadow: 0px 0px 15px rgba(0, 0, 0, .3);padding: 10px 15px 30px;}
.formSet_box .el-form-item{margin-bottom: 15px;}
.formSet_box .el-form-item .el-form-item__label{width: 100%;padding-bottom: 0;}
.formSet_box .btn_box .el-form-item__content{margin-left: 0!important;}
.formSet_box .el-form-item__content .tip{text-align: left;color: #999;line-height: 16px;font-size: 12px;margin-top: 10px;}
</style>

<script>
// import Cookies from 'js-cookie'
import addressJson from '@/data/addressJson'
export default {
  name: 'Form',
  props: {
    gitID: {
      type: String
    },
    email: {
      type: String
    },
    isPublic: {
      type: Number
    },
    invite: {
      type: String
    }
  },
  data () {
    return {
      userInfo: {
        gitID: '',
        wx: '',
        email: '',
        work: '',
        city: '',
        skill: '',
        fileUrl: '',
        ref: '',
        address: '',
        roleArr: []
      },
      regionArr: {
        s: addressJson,
        c: [],
        p: []
      },
      regionObj: {
        s: {id: '', name: '', name_en: ''},
        c: {id: '', name: '', name_en: ''},
        p: {id: '', name: '', name_en: ''},
      },
      roleArr: [],
      roleVal: [],
      fileUrlList: [],
      isShowGit: true,
      isShowRef: true,
      isDisabled: false,
      isRegister: false,
      refCode: '',
      rules: {
        gitID: [
          { required: true, message: this.$t('VALID').V_0, trigger: 'blur' }
        ],
        wx: [
          { required: true, message: this.$t('VALID').V_1, trigger: 'blur' }
        ],
        email: [
          { required: true, message: this.$t('VALID').V_2, trigger: 'blur' },
          { type: 'email', message: this.$t('VALID').V_3, trigger: ['blur', 'change'] }
        ],
        work: [
          { required: true, message: this.$t('VALID').V_4, trigger: 'blur' }
        ],
        city: [
          {
            validator (rule, value, callback) {
              callback()
            },
            required: true,
            type: 'object',
            trigger: 'blur'
          }
        ],
        skill: [
          { required: true, message: this.$t('VALID').V_6, trigger: 'blur' },
          { min: 20, message: this.$t('VALID').V_7, trigger: 'blur' }
        ],
        ref: [
          { required: true, message: this.$t('VALID').V_8, trigger: 'blur' }
        ],
        roleArr: [
          {
            validator (rule, value, callback) {
              callback()
            },
            type: 'array',
            required: true,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  sockets: {
    joinCM (res) {
      console.log(res)
      if (res.msg === 'Success') {
        this.$message({
          message: this.$t('SUCCESS_TIP').TIP_0,
          type: 'success'
        })
        this.setRefCode()
        this.closeForm(3)
      } else {
        this.$message({
          message: res.error,
          type: 'warning'
        })
      }
    },
    editCM (res) {
      console.log(res)
      if (res.msg === 'Success') {
        this.$message({
          message: this.$t('SUCCESS_TIP').TIP_1,
          type: 'success'
        })
        this.closeForm(3)
      } else {
        this.$message({
          message: res.error,
          type: 'warning'
        })
      }
    },
    findDevUser (res) {
      console.log(res)
      if (res.msg === 'Success') {
        this.$message({
          message: this.$t('WARNING_TIP').TIP_1,
          type: 'warning'
        })
        this.userInfo = res.info
        this.userInfo = {
          gitID: this.userInfo.gitID,
          wx: res.info.wx,
          email: res.info.email,
          work: res.info.work,
          // city: res.info.city,
          skill: res.info.skill,
          file: res.info.file,
          fileUrl: res.info.fileUrl,
          ref: res.info.ref,
          address: res.info.address,
        }
        if (res.info.fileUrl.length > 0 && res.info.fileUrl[0]) {
          this.fileUrlList = res.info.fileUrl
        }
        if (res.info.city.s) {
          this.regionObj = res.info.city
          this.changeState()
        } else {
          this.userInfo.city = res.info.city
        }
        for (let obj of res.info.roleArr) {
          this.roleVal.push(JSON.stringify(obj))
        }
        this.isDisabled = true
        this.isRegister = true
        this.refCode = res.info.refCode
        this.setRefCode()
        this.changeRole()
        console.log(this.roleVal)
      } else {
        this.isDisabled = false
        this.isRegister = false
        this.refCode = ''
        this.userInfo = {
          gitID: this.userInfo.gitID,
          wx: '',
          email: this.email ? this.email : '',
          work: '',
          city: '',
          skill: '',
          file: '',
          fileUrl: '',
          ref: '',
          address: ''
        }
      }
      // this.getRefCookie()
    },
    getRoleCM (res) {
      console.log(res)
      if (res.msg === 'Success') {
        this.roleArr = res.info
      } else {
        this.roleArr = []
      }
      // console.log(this.roleArr)
    },
    uploadFileUrl (res) {
      console.log(res)
    },
    removeFile (res) {
      console.log(res)
    }
  },
  watch: {
    gitID () {
      this.userInfo.gitID = this.gitID
      this.isShowGit = this.gitID ? true : false
      this.findDevUser()
    },
    invite (cur, old) {
      this.userInfo.ref = this.invite
      this.isShowRef = this.invite ? true : false
    }
  },
  mounted () {
    this.isShowGit = this.gitID ? true : false
    this.isShowRef = this.invite ? true : false
    this.changeState()
    this.$socket.emit('getRoleCM')
    // console.log(addressJson)
  },
  updated () {
    if (this.invite) {
      this.userInfo.ref = this.userInfo.ref ? this.userInfo.ref : this.invite
    }
  },
  methods: {
    resigterBtn (formName) {
      this.$refs[formName].validate((valid) => {
        // console.log(valid)
        if (valid) {
          // alert('submit!')
          if (this.isRegister) {
            this.editCM()
          } else {
            this.joinCM()
          }
        } else {
          // console.log('error submit!!');
          return false
        }
      })
    },
    getCurrCity () {
      this.userInfo.city = returnCitySN["cname"]
    },
    removeFileSuccess (file, fileList) {
      this.fileUrlList = fileList
      this.$socket.emit('removeFile', file.response)
    },
    uploadFileSuccess (res, file, fileList) {
      if (res) {
        this.fileUrlList = fileList
      } else {
        this.$message({
          message: this.$t('WARNING_TIP').TIP_0,
          type: 'warning'
        })
      }
      // console.log(res)
      // console.log(this.fileUrlList)
    },
    closeForm (num) {
      this.$emit('closeFormEvent', Number(num))
    },
    setRefCode () {
      this.$emit('setRefCode', this.refCode)
    },
    changeData () {
      let fileArr = []
      for (let obj of this.fileUrlList) {
        fileArr.push({
          name: obj.name,
          size: obj.size,
          url: obj.response,
          timestamp: obj.uid,
          type: obj.raw && obj.raw.type ? obj.raw.type : obj.type,
        })
      }
      if (this.roleVal.length <= 0) {
        return {
          error: this.$t('VALID').V_9
        }
      }
      if (!this.regionObj.s.id || !this.regionObj.c.id || !this.regionObj.p.id) {
        // console.log(this.regionObj)
        return {
          error: this.$t('VALID').V_5
        }
      }
      let _role = []
      for (let obj of this.roleVal) {
        _role.push(JSON.parse(obj))
      }
      // console.log(this.$$.createHash())
      return {
        gitID: this.userInfo.gitID.replace(/\s/g, ''),
        wx: this.userInfo.wx.replace(/\s/g, ''),
        email: this.userInfo.email.replace(/\s/g, ''),
        work: this.userInfo.work.replace(/\s/g, ''),
        // city: this.userInfo.city.replace(/\s/g, ''),
        city: this.regionObj,
        skill: this.userInfo.skill.replace(/\s/g, ''),
        fileUrl: fileArr,
        refCode: this.refCode,
        ref: this.userInfo.ref.replace(/\s/g, ''),
        roleArr: _role,
        isPublic: this.isPublic,
        address: this.userInfo.address.replace(/\s/g, '')
      }
    },
    joinCM () {
      let $data = this.changeData()
      // console.log($data)
      if ($data && $data.error) {
        this.$message({
          message: $data.error,
          type: 'warning'
        })
        return
      }
      this.refCode = this.$$.createHash() + '0x0' + Date.now().toString(16)
      let data = Object.assign({}, $data, {refCode: this.refCode})
      this.$socket.emit('joinCM', data)
    },
    editCM () {
      this.$socket.emit('editCM', this.changeData())
    },
    findDevUser () {
      // console.log(this.userInfo.gitID)
      this.$socket.emit('findDevUser', {
        gitID: this.userInfo.gitID
      })
      // this.getRefCookie()
    },
    openEditBtn () {
      this.isDisabled = false
    },
    changeState () {
      for (let obj of addressJson) {
        if (obj.id === this.regionObj.s.id) {
          this.regionObj.s.name = obj.name
          this.regionObj.s.name_en = obj.name_en
          this.regionArr.c = obj.childrens
          this.regionObj.c.id = obj.childrens[0].id
          this.changeCountry()
          break
        }
      }
    },
    changeCountry () {
      for (let obj of this.regionArr.c) {
        if (obj.id === this.regionObj.c.id) {
          this.regionObj.c.name = obj.name
          this.regionObj.c.name_en = obj.name_en
          this.regionArr.p = obj.childrens
          // this.regionObj.p.id = obj.childrens[0].id
          this.changeProvince()
          break
        }
      }
    },
    changeProvince () {
      for (let obj of this.regionArr.p) {
        if (obj.id === this.regionObj.p.id) {
          this.regionObj.p.name = obj.name
          this.regionObj.p.name_en = obj.name_en
          break
        }
      }
      this.userInfo.city = this.regionObj
    },
    changeRole (data) {
      // console.log(data)
      this.userInfo.roleArr = this.roleVal
    }
  }
}
</script>