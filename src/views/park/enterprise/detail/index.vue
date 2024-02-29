<template>
  <div>
    <div class="top">
      <div>
        <a href="#" @click="fh"> 返回 </a>
        <span> | </span>
        <span> 查看企业</span>
      </div>
      <div>
        <p>黑马管理员</p>
      </div>
    </div>
    <div class="bom">

      <div class="shang">

        <div class="box">
          <div>企业信息</div>
          <div>
            <span style="color: #ccc;">企业名 </span>{{ this.ruleForm.name }}
          </div>
          <div>
            <span style="color: #ccc;">法人 </span>{{ this.ruleForm.legalPerson }}
          </div>
          <div>
            <span style="color: #ccc;">注册地址 </span>{{ this.ruleForm.registeredAddress }}
          </div>
          <div>
            <span style="color: #ccc;">所在行业 </span>{{ this.iii }}
          </div>
          <div>
            <span style="color: #ccc;">职业执照 </span><img style="width: 200px;height: 200px;"
              :src='this.ruleForm.businessLicenseUrl' alt="">
          </div>
        </div>
      </div>
      <div class="xia">
        <div class="box">
          <div>联系人信息</div>
          <div>
            <span style="color: #ccc;">企业联系人 </span>{{ this.ruleForm.contact }}
          </div>
          <div>
            <span style="color: #ccc;">企业电话 </span>{{ this.ruleForm.contactNumber }}
          </div>
        </div>
      </div>
      <div class="shang">
        <div class="box">
          <div>租聘记录</div>
          <el-table :data="this.list" style="width: 100%">
            <el-table-column type="index" label="序号">
            </el-table-column>
            <el-table-column prop="name" label="序号" style="width: 10px;">
            </el-table-column>
            <el-table-column label="合同状态">
              <template v-slot="scope">
                <button v-show="scope.row.status == 0" style="background-color: orange;">待生效</button>
                <button v-show="scope.row.status == 1" style="background-color: darkcyan;">生效中</button>
                <button v-show="scope.row.status == 2" style="background-color: chartreuse;">已到期</button>
                <button v-show="scope.row.status == 3" style="background-color: khaki;">已退租</button>
              </template>
            </el-table-column>
            <el-table-column prop="contractName" label="租赁合同" style="width: 30px;color: #6c8cfd;">
              <template v-slot="{row}">
                <el-button type="text" @click="aaa(row)">{{ row.contractName }}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="startTime" label="录入时间" style="width: 50px;">
            </el-table-column>
            <el-table-column label="合同状态">
              <template v-slot="scope">
                <a href="#" style="color: #6c8cfd;" @click="xz(scope.row)">合同下载</a>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
import { qyaddApi, qyejzApi, qyxqApi, qybjApi, qyxzApi } from '@/api/user'
import FileSaver from 'file-saver'
export default {
  name: "manage",
  data() {
    return {
      fileList: [{}],
      id1: this.$route.query.id,
      list: [],
      ruleForm: {
        name: '',
        legalPerson: '',
        registeredAddress: '',
        contact: '',
        contactNumber: '',
        industryCode: null,
        businessLicenseUrl: '',
        businessLicenseId: '',
        id: null
      },
      iii: '',
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
    aaa(data){
      const url=data.contractUrl
      console.log(url);
      window.open(url)
    },
    async xz(data) {
      const res = await qyxzApi(data.id)

      console.log(res);
      FileSaver.saveAs(res, data.contractName)
    },
    fh() {
      this.$router.push('/park/enterprise')
    },
    async add1() {
      const res = await qyxqApi(this.id1)
      console.log('res', res);
      this.ruleForm.businessLicenseId = res.data.data.businessLicenseId
      this.ruleForm.businessLicenseUrl = res.data.data.businessLicenseUrl
      this.ruleForm.contact = res.data.data.contact
      this.ruleForm.contactNumber = res.data.data.contactNumber
      this.ruleForm.industryCode = res.data.data.industryCode
      this.ruleForm.name = res.data.data.name
      this.ruleForm.legalPerson = res.data.data.legalPerson
      this.ruleForm.registeredAddress = res.data.data.registeredAddress
      this.ruleForm.id = res.data.data.id
      this.iii = res.data.data.industryName
      this.list = res.data.data.rent
      // res.data.data.businessLicenseUrl
      this.fileList.push({ name: 'propety.png', url: res.data.data.businessLicenseUrl })
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

          const res = await qybjApi(this.ruleForm)

          console.log(res);
          this.$router.push('/park/enterprise')
          this.$message({
            message: '恭喜编辑成功！！！',
            type: "success"
          })
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
  },
  created() {
    this.add1()
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
  height: 100%;
  background-color: #f4f6f8;
  margin-bottom: 30px;
  padding: 20px;

  .shang {
    margin: 0 auto;

    width: 65%;
    background-color: #fff;

    margin-bottom: 30px;

    .box {
      padding: 30px;
      margin: 10px 0;
    }
  }

  .xia {
    margin: 0 auto;

    width: 65%;
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
