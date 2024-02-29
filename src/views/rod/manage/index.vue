<template>
  <div>
    <div class="ip">{{ Ip }}</div>
    <el-form style="margin-bottom: 5px;border-bottom: 1px solid #ccc;" :inline="true" :model="formInline"
      class="demo-form-inline">

      <el-form-item label="一体杆名称:">
        <el-input size="small" v-model="formInline.poleName" placeholder="请输入一体杆名称"></el-input>
      </el-form-item>
      <el-form-item label="一体杆编号">
        <el-input size="small" v-model="formInline.poleNumber" placeholder="请输入编号"></el-input>
      </el-form-item>
      <el-form-item label="运行状态">
        <el-select size="small" v-model="formInline.poleStatus" placeholder="未选择">
          <el-option label="正常" :value=0></el-option>
          <el-option label="异常" :value=1></el-option>

        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <div style="margin-top: 10px;display: flex;align-items: center;width: 100%;justify-content: space-between;">
      <div>
        <el-button type="primary" size="small" @click="bbb()" v-n="'pole:info:add_edit'">添加一体杆</el-button>
        <el-button size="small" @click="pldel" v-n="'pole:info:remove'">批量删除</el-button>
      </div>

    </div>
    <el-table @selection-change="handleSelectionChange" tooltip-effect="dark" :data="tableData" border
      style="width: 100%">

      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" label="序号">
      </el-table-column>
      <el-table-column prop="poleName" label="一体杆名称">
      </el-table-column>
      <el-table-column prop="poleNumber" label="一体杆编号">
      </el-table-column>
      <el-table-column prop="poleIp" label="一体杆IP">
      </el-table-column>
      <el-table-column prop="areaName" label="安装区域">
      </el-table-column>
      <el-table-column prop="poleType" label="一体杆类型">
        <template v-slot="{ row }">
          <div v-show="row.poleType == 'entrance'">入口</div>
          <div v-show="row.poleType == 'export'">出口</div>
        </template>
      </el-table-column>
      <el-table-column prop="poleStatus" label="运行状态">
        <template v-slot="{ row }">
          <div v-show="row.poleStatus == 1">异常</div>
          <div v-show="row.poleStatus == 0">正常</div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template v-slot="{ row }">
          <el-button type="text" size="small" @click="bj(row)" v-n="'pole:info:add_edit'">编辑</el-button>
          <el-button type="text" size="small" @click="del(row.id)" v-n="'pole:info:remove'">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
      :page-sizes="[10, 20, 30, 100]" :page-size="pageSize" layout="->,total, prev,pager,next,sizes, jumper"
      :total="total">
    </el-pagination>
    <el-dialog :before-close="handleClose" :title="qb" :visible.sync="dialogVisible" width="40%">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="一体杆名称" prop="poleName">
          <el-input v-model="ruleForm.poleName"></el-input>
        </el-form-item>
        <el-form-item label="一体杆编号" prop="poleNumber">
          <el-input v-model="ruleForm.poleNumber"></el-input>
        </el-form-item>
        <el-form-item label="一体杆ip" prop="poleIp">
          <el-input v-model="ruleForm.poleIp"></el-input>
        </el-form-item>
        <el-form-item label="关联区域" prop="areaId">
          <el-select v-model="ruleForm.areaId" placeholder="请选择活动区域">
            <el-option v-for="(item, index) in list" :key="index" :label="item.areaName" :value="item.areaId"></el-option>

          </el-select>
        </el-form-item>
        <el-form-item label="一体杆类型" prop="poleType">
          <el-select v-model="ruleForm.poleType" placeholder="请选择支付方式">
            <el-option label="入口" value='entrance'></el-option>
            <el-option label="出口" value='export'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
          <el-button @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getinfoApi, delinfoApi, addinfoApi, listinfoApi, bjinfoApi } from '@/api/user';
export default {
  name: "monthCard",
  components: {

  },
  data() {
    return {
      list: [],
      Ip: "",
      qb: '',
      dialogVisible: false,
      formInline: {
        poleName: '',
        poleNumber: '',
        poleStatus: ''
      },
      ruleForm: {
        poleName: '',
        poleNumber: '',
        poleIp: '',
        areaId: null,
        poleType: ''
      },
      rules: {
        poleName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },

        ],
        poleNumber: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },

        ],
        poleIp: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },

        ],
        areaId: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },

        ],
        poleType: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },

        ],
      },
      page: 1,
      pageSize: 10,
      tableData: [],
      total: null,
      id1: '',
      ids: []
    }
  },
  methods: {
    async pldel() {
      if (confirm('确认批量删除吗')) {
        const res = await delinfoApi(this.ids)
        console.log(res);
        this.$message({
          type: 'success', // success error warning
          message: '批量删除',
          duration: 2000,
        })
        this.add()
      }
    },
    handleSelectionChange(val) {
      this.ids = val.map(item => item.id)
      console.log('val', this.ids);
    },
    get(url, cb) {
      var httpRequest = new XMLHttpRequest();
      httpRequest.open("GET", url, true);
      httpRequest.send();
      httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
          var json = httpRequest.responseText;
          cb(json);
        }
      };
    },
    handleClose() {
      // console.log(11);
      // console.log(done);
      this.dialogVisible = false
      this.ruleForm = {}
    },
    async ccc() {
      const res = await listinfoApi()
      this.list = res.data.data
      console.log('this.list', this.list);
    },
    bbb() {

      this.qb = '添加一体杆'
      this.dialogVisible = true
      this.ruleForm.poleIp = this.Ip
    },

    onSubmit() {
      this.add()
    },
    async add() {
      const res = await getinfoApi({ page: this.page, pageSize: this.pageSize, poleName: this.formInline.poleName, poleNumber: this.formInline.poleNumber, poleStatus: this.formInline.poleStatus })
      console.log(res);
      this.tableData = res.data.data.rows
      this.total = res.data.data.total
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.add()
    },
    handleCurrentChange(val) {
      this.page = val
      this.add()
    },
    xf(id) {

    },
    ck(id) {

    },
    bj(data) {
      console.log(data);
      this.id1 = data.id
      this.ruleForm = data
      this.qb = '编辑一体杆'
      this.dialogVisible = true

    },
    async del(id) {
      if (confirm('确认删除吗')) {
        const res = await delinfoApi(id)
        console.log(res);
        this.$message({
          type: 'success', // success error warning
          message: '删除成功',
          duration: 2000,
        })
        this.add()
      }

    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {

          if (!this.id1) {

            const res = await addinfoApi(this.ruleForm)
            console.log(res);
            this.$message({
              type: 'success', // success error warning
              message: '添加成功',
            })
            this.$refs[formName].resetFields();
            this.add()
          } else {

            const res = await bjinfoApi({ id: this.id1, areaId: this.ruleForm.areaId, poleIp: this.ruleForm.poleIp, poleName: this.ruleForm.poleName, poleNumber: this.ruleForm.poleNumber, poleType: this.ruleForm.poleType })
            console.log(res);
            this.$message({
              type: 'success', // success error warning
              message: '编辑',
            })
            this.$refs[formName].resetFields();
            this.add()
          }


          this.dialogVisible = false

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogVisible = false
    }

  },
  created() {
    this.add()
    this.ccc()
  },
  mounted() {
    // 调用接口获取ip地址
    this.get("https://api.ipify.org/?format=json", (data) => {
      data = JSON.parse(data);
      this.Ip = data.ip;
      console.log("IP地址为", data.ip);

    });
  },
};

</script>

<style lang='scss' scoped>
.aaa {
  background-color: #e6f7ff;
  border: 1px solid #91d5ff;
  padding: 0 10px;
}

.bbb {
  box-sizing: border-box;
  margin: 0;
  color: #000000d9;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: "tnum";
  position: relative;
  display: flex;
  align-items: center;
  padding: 8px 15px;
  word-wrap: break-word;
  border-radius: 2px;
}

.el-icon-success {
  color: #1890ff
}
</style>
