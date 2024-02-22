<template>
  <div>
    <div class="top">
      <div>
        <a href="#" @click="fh"> 返回 </a>
        <span> | </span>
        <span> 添加企业</span>
      </div>
      <div>
        <p>黑马管理员</p>
      </div>
    </div>
    <div class="bom">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <div class="shang">

          <div class="box">
            <div>企业信息</div>

            <el-form-item label="企业名称" prop="name" placeholder="请输入企业名称">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="法人" prop="legalPerson" placeholder="请输入法人">
              <el-input v-model="ruleForm.legalPerson"></el-input>
            </el-form-item>
            <el-form-item label="注册地址" prop="registeredAddress" placeholder="请输入注册地址">
              <el-input v-model="ruleForm.registeredAddress"></el-input>
            </el-form-item>
            <el-form-item label="所在行业">
              <el-select v-model="ruleForm.industryCode" placeholder="请选择所在行业">
                <el-option label="电子商务" :value=1001></el-option>
                <el-option label="游戏娱乐" :value=1002></el-option>
                <el-option label="媒体服务" :value=1003></el-option>
                <el-option label="广告营销" :value=1004></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="营业执照" prop="tp">
              <el-upload class="upload-demo" action="#" :file-list="fileList" :http-request="add"
                :before-remove="beforeRemove">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>

          </div>
        </div>
        <div class="xia">

          <div class="box">
            <div>联系人信息</div>

            <el-form-item label="企业联系人" prop="contact">
              <el-input v-model="ruleForm.contact"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="contactNumber">
              <el-input v-model="ruleForm.contactNumber"></el-input>
            </el-form-item>

          </div>
        </div>
        <div class="di">
          <div>

            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">确认修改</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>

          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
import { qyaddApi, qyejzApi } from '@/api/user'
export default {
  name: "manage",
  data() {
    return {
      fileList: [],
      ruleForm: {
        name: '',
        legalPerson: '',
        registeredAddress: '',
        contact: '',
        contactNumber: '',
        industryCode: null,
        businessLicenseUrl: '',
        businessLicenseId: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        registeredAddress: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        contact: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        contactNumber: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 1, max: 11, message: '长度在 1 到 11 个字符', trigger: 'blur' }
        ],
        legalPerson: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],

      }
    }

  },
  methods: {
    fh() {
      this.$router.push('/park/enterprise')
      
    },
    async add(params) {
      console.log(params);
      const file = params.file

      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', 'businessLicense')

      const res = await qyejzApi(formData)
      this.ruleForm.businessLicenseUrl = res.data.data.url
      this.ruleForm.businessLicenseId = res.data.data.id
      console.log(res);

      // const oss = new COS({
      //   SecretId: 'AKIDqaHxW0aFtLeoGZntqofMuKm8Ki197DdZ',
      //   SecretKey: 'tcKuIbipogTAmIAuVJ0jIhtvoX8bwlog'

      // })
      // oss.putObject({
      //   Bucket: 'wsq666-1324139984',
      //   Region: 'ap-nanjing',
      //   Key: params.file.name,
      //   StorageClass: 'STANDARD', // 固定值
      //   Body: params.file // ⽂件对象
      // }, (err, data) => {

      //   // console.log(data);
      //   console.log('http://' + data.Location);
      //   // this.ruleForm.businessLicenseUrl = 'http://' + data.Location


      // })
      // this.$emit('input', 'http://' + data.Location)
      // console.log('http://' + data.Location);

    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await qyaddApi(this.ruleForm)
          this.$message({
            message: '恭喜添加成功！！！',
            type: "success"
          })
          console.log(res);
          this.$router.push('/park/enterprise')
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  }

};


</script>

<style lang='scss' scoped>
.top {
  width: 100vw;
  height: 80px;
  background-color: #fff;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

}

.bom {
  width: 100vw;
  height: calc(110vh);
  background-color: #f4f6f8;
  margin-bottom: 30px;


  .shang {
    margin: 0 auto;

    width: 70%;
    background-color: #fff;

    margin-bottom: 30px;

    .box {
      padding: 30px;
      margin: 10px 0;
    }
  }

  .xia {
    margin: 0 auto;

    width: 70%;
    background-color: #fff;


  }

  .box {
    padding: 30px;
    margin: 10px 0;
  }
}

.di {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 80px;
  padding: 10px;
  background-color: #fff;
}
</style>
