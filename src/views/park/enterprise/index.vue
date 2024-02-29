<template>
  <div>
    <div style="width: 600px;justify-content: space-between;align-items: center;margin: 20px 0;">
      企业名称：<el-input v-model="input" placeholder="请输入企业名称" style="width: 250px;"></el-input>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </div>
    <el-button type="primary" @click="go" v-n="'park:enterprise:add_edit'">添加企业</el-button>
    <div>
      <el-table :data="list" style="width: 100%" @expand-change="nm">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-table label-position="left" :data="props.row.children" inline class="demo-table-expand">
              <el-table-column prop="buildingName" label="租聘楼宇">
              </el-table-column>
              <el-table-column label="租聘起止时间">
                <template v-slot="{ row }">
                  <div>{{ row.startTime }}---{{ row.endTime }}</div>
                </template>
              </el-table-column>
              <el-table-column prop=status label="合同状态">
                <template v-slot="scope">

                  <el-button size="mini" type="primary" v-show="scope.row.status == 0" plain>待生效</el-button>

                  <el-button size="mini" type="success" v-show="scope.row.status == 1" plain>生效中</el-button>

                  <el-button size="mini" v-show="scope.row.status == 2" plain>已到期</el-button>

                  <el-button size="mini" v-show="scope.row.status == 3" type="info" plain>已退租</el-button>

                </template>
              </el-table-column>
              <el-table-column prop=status label="操作">
                <template v-slot="{ row }">

                  <el-button type="text" v-show="row.renewFlag" @click="xz(row)" v-n="'park:rent:add_surrender'">续租</el-button>
                  <el-button type="text" disabled v-show="row.renewFlag == 0" v-n="'park:rent:add_surrender'">续租</el-button>
                  <el-button type="text" v-show="row.exitFlag" @click="tuizu(row.id)" v-n="'park:rent:add_surrender'">退租</el-button>
                  <el-button type="text" disabled v-show="row.exitFlag == 0" v-n="'park:rent:add_surrender'">退租</el-button>
                  <el-button type="text" v-if="row.exitFlag == 0" @click="del1(row.id)" v-n="'park:rent:remove'">删除</el-button>
                  <el-button type="text" disabled v-else v-n="'park:rent:remove'">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column type="index" label="序号" width="50">
        </el-table-column>
        <el-table-column prop="name" label="企业名称" width="200">
        </el-table-column>
        <el-table-column prop="contact" label="联系人">
        </el-table-column>
        <el-table-column prop="contactNumber" label="电话">
        </el-table-column>


        <el-table-column label="操作">
          <template v-slot="scope">
            <a style="margin:0 5px;color: #7094ff;" href="#" @click="addht(scope.row.id)" v-n="'park:rent:add_surrender'">添加合同</a>
            <a style="margin:0 5px;color: #7094ff;" href="#" @click="ck(scope.row.id)" v-n="'park:enterprise:query'">查看</a>
            <a style="margin:0 5px;color: #7094ff;" href="#" @click="bj(scope.row.id)" v-n="'park:enterprise:add_edit'">编辑</a>
            <a style="margin:0 5px;color: #7094ff;" href="#" @click="del(scope.row.id)" v-n="'park:enterprise:remove'">删除</a>

          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
      :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="100">
    </el-pagination>



    <el-dialog :title='text' :visible.sync="dialogVisible" width="30%">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="租凭楼宇" prop="buildingId">
          <el-select v-if="this.bbbbb == null" v-model="ruleForm.buildingId" placeholder="请选择活动区域">
            <el-option v-for="(item, index) in list2" :key="index" :label="item.name" :value="item.id"></el-option>
            <!-- <el-option v-else   :label="item.name" :value="item.id"></el-option> -->
          </el-select>
          <el-input v-else disabled v-model="okok"></el-input>
        </el-form-item>
        <el-form-item label="租聘起始日期">

          <el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始月份"
            end-placeholder="结束月份" @change="aaa" value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="租聘合同">
          <el-upload class="upload-demo" :on-preview="kkk" action="#" :file-list="fileList" :http-request="upload"
            :before-remove="beforeRemove">
            <el-button :disabled="buttonstart" size="small" :type="buttonstart ? 'success' : 'primary'">{{
              buttonstart ? '已上传' : '点击上传' }}</el-button>
            <!-- <el-button size="small" type="success" disabled>已上传</el-button> -->
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5MB</div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import { qyApi, qydelApi, qyaddApi, qyzyApi, listbuildingApi, qyejzApi, addbuildingApi, tuienterpriseApi, delenterpriseApi } from '@/api/user'
export default {
  name: "billing",
  data() {
    return {
      okok: '',
      bbbbb: null,
      text: '',
      ppp: null,
      fileList: [],
      list1: [],
      nnn: {},
      page: 1,
      pageSize: 10,
      list: [],
      input: '',
      total1: '',
      name: '',
      id100: null,
      list2: [],
      value1: [],
      dialogVisible: false,
      ruleForm: {
        buildingId: null,
        startTime: '',
        endTime: '',
        contractUrl: '',
        contractId: '',
        type: 0,
        enterpriseId: null,

      },
      rules: {
        buildingId: [
          { required: true, message: '请输入楼宇名称', trigger: 'blur' },

        ],
      }
    }

  },
  computed: {
    buttonstart() {
      return !!this.ruleForm.contractId || false
    }
  },
  methods: {
    async nm(row) {
      console.log(row);
      const res = await qyzyApi(row.id)
      console.log(res);
      this.id100 = row.id
      // console.log(id);
      row.children = res.data.data
      // this.list1 = res.data.data
    },
    async del1(id) {
      const res = await delenterpriseApi(id)
      console.log(res);
      this.$message({
        type: 'success',
        message: '删除成功'
      })
    },
    async xz(data) {
      console.log(data);
      this.ruleForm.buildingId = data.buildingId
      this.okok = `办公楼${this.ruleForm.buildingId}栋`
      this.ruleForm.type = 1
      this.bbbbb = data.id
      this.value1 = [data.startTime, data.endTime]
      this.ruleForm.startTime = data.startTime
      this.ruleForm.endTime = data.endTime
      this.dialogVisible = true
      this.text = '续租合同'

    },
    async tuizu(id) {
      if (confirm('确定退租吗')) {
        const res = await tuienterpriseApi(id)
        console.log((res));
        this.$message({
          type: 'success', // success error warning
          message: '退租成功',
          duration: 2000,
        })
      }

    },
    kkk() {
      window.open(this.ruleForm.contractUrl)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    async upload(data) {

      const file = data.file
      console.log(file.size);
      if (file.size < 5 * 1024 * 1024) {
        const forMData = new FormData()
        forMData.append('file', file)
        forMData.append('type', 'contract')

        console.log('data', forMData);

        const res = await qyejzApi(forMData)
        this.ruleForm.contractUrl = res.data.data.url
        this.ruleForm.contractId = res.data.data.id
        if (forMData) {
          this.ppp = 1
        }
        this.ppp = 0
        console.log(res);
      } else {
        alert('不能大于5MB')
      }

    },
    aaa() {
      this.ruleForm.startTime = this.value1[0]
      this.ruleForm.endTime = this.value1[1]
      console.log(this.ruleForm.startTime);
      console.log(this.ruleForm.endTime);
    },
    async addht(id) {
      this.ruleForm.enterpriseId = id
      this.dialogVisible = true
      this.text = '添加合同'
      const res = await listbuildingApi()
      this.list2 = res.data.data
      console.log("list2", this.list2);
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (this.bbbbb) {
            const data = {
              buildingId: this.ruleForm.buildingId,
              endTime: this.ruleForm.endTime,
              startTime: this.ruleForm.startTime,
              enterpriseId: this.id100,
              type: this.ruleForm.type,
              contractId: this.ruleForm.contractId,
              contractUrl: this.ruleForm.contractUrl
            }
            const res = await addbuildingApi(data)
            console.log(res);
            this.$message({
              type: 'success', // success error warning
              message: '续租成功',
              duration: 2000,
            })
            this.ppp1(this.ruleForm.enterpriseId)
            this.type = 0
            this.bbbbb = null
            this.value1 = []
            this.ruleForm.buildingId = null


          } else {
            const res = await addbuildingApi(this.ruleForm)
            console.log(res);
            this.$message({
              type: 'success', // success error warning
              message: '添加成功',
              duration: 2000,
            })
          }
          this.dialogVisible = false
          this.add()

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.value1 = []
      this.ruleForm.buildingId = null
      this.$refs[formName].resetFields();
      this.dialogVisible = false
    },
    async ppp1(id) {

    },
    ck(id) {
      this.$router.push({ path: '/detail', query: { id: id } })
    },
    bj(id) {
      this.$router.push({ path: '/bj', query: { id: id } })
    },
    go() {
      this.$router.push({ path: '/add' })
    },
    async add() {
      const res = await qyApi({ page: this.page, pageSize: this.pageSize, name: this.name })
      console.log(res);
      this.list = res.data.data.rows.map((item) => {
        return {
          ...item,
          children: []
        }
      })

      this.total1 = res.data.data.total

    },
    onSubmit() {
      this.name = this.input
      this.add()
    },
    handleSizeChange(val) {

      this.pageSize = val
      this.add()
    },
    handleCurrentChange(val) {

      this.page = val
      this.add()

    },
    async del(id) {
      if (confirm('确认删除吗')) {
        const res = await qydelApi(id)
        console.log(res);
        this.$message({
          message: '恭喜你,删除成功',
          type: 'success'
        });
        this.add()
      }
    },

  },
  created() {
    this.add()
  }
};


</script>

<style lang='scss' scoped></style>
