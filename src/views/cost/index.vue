<template>
  <div>
    <el-form style="margin-bottom: 10px;border-bottom: 1px solid #ccc;" :inline="true" :model="formInline"
      class="demo-form-inline">
      <el-form-item label="企业名称">
        <el-input size="small" v-model="formInline.enterpriseName" placeholder="请输入企业名称"></el-input>
      </el-form-item>
      <el-form-item label="缴费时间">
        <div class="block">

          <el-date-picker size="small" value-format="yyyy-MM-dd" v-model="value1" type="daterange" range-separator="至"
            start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-button type="primary" size="small" @click="getadd()">添加账单</el-button>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="序号">
      </el-table-column>
      <el-table-column prop="billNumber" label="账单编号">
      </el-table-column>
      <el-table-column prop="enterpriseName" label="企业名称">
      </el-table-column>
      <el-table-column prop="buildingName" label="租赁楼宇">
      </el-table-column>
      <el-table-column prop="propertyFeePrice" label="物业费(元/m²)">
      </el-table-column>
      <el-table-column prop="paymentAmount" label="账单金额(元)">
      </el-table-column>
      <el-table-column prop="createTime" label="缴费时间">
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="{ row }">

          <el-link type="primary" @click="ck(row)">查看</el-link>
          <el-link type="primary" @click="del(row.id)">删除</el-link>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
      :page-sizes="[10, 20, 30, 100]" :page-size="pageSize" layout="->,total, prev,pager,next,sizes, jumper"
      :total="total">
    </el-pagination>
    <el-dialog title="是否确认删除当前账单?" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <div>
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="del1()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="查看账单" :visible.sync="dialogVisible1" width="40%" :before-close="handleClose">
      <p>租户名称:{{ data.enterpriseName }}</p>
      <p>租聘楼宇:{{ data.enterpriseName }}</p>
      <p>缴费周期:{{ data.startTime }}至{{ data.endTime }}</p>
      <p>物业费(元/㎡):{{ data.propertyFeePrice }}</p>
      <p>账单金额(元):{{ data.paymentAmount }}</p>
      <p v-show="data.paymentMethod == 1">支付方式:<span>微信</span></p>
      <p v-show="data.paymentMethod == 3">支付方式:<span>现金</span></p>
      <p v-show="data.paymentMethod == 2">支付方式:<span>支付宝</span></p>
      <p>缴费时间:{{ data.createTime }}</p>

      <el-button @click="dialogVisible1 = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>

    </el-dialog>

    <el-dialog title="添加账单" :visible.sync="dialogVisible2" width="40%" :before-close="handleClose">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="选择租户" prop="enterpriseId">
          <el-select v-model="ruleForm.enterpriseId" placeholder="请选择租户">
            <el-option v-for="(item, index) in qylist" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="租聘楼宇" prop="buildingId">
          <el-select v-model="ruleForm.buildingId" placeholder="请选择楼宇">
            <el-option v-for="(item, index) in lylist" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="缴费周期" prop="value2">
          <el-date-picker @change="aaa()" size="small" :value-format="this.ooo" v-model="value2" type="daterange"
            range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="支付金额" prop="paymentAmount">
          <el-input v-model="ruleForm.paymentAmount" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="支付方式" prop="paymentMethod">
          <el-select v-model="ruleForm.paymentMethod" placeholder="请选择支付方式">
            <el-option label="微信" :value=1></el-option>
            <el-option label="支付宝" :value=2></el-option>
            <el-option label="现金" :value=3></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { getcostApi, delcostApi, addcostApi, AllenterprisecostApi, AllbuildingcostApi } from '@/api/user'
export default {
  name: "cost",
  data() {
    return {
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      ooo: 'yyyy-MM-dd',
      value2: '',
      qylist: [],
      lylist: [],
      formInline: {
        enterpriseName: '',

        start: '',
        end: ''
      },
      ruleForm: {
        enterpriseId: null,
        buildingId: null,
        startTime: '',
        endTime: '',
        paymentAmount: null,
        paymentMethod: null
      },
      rules: {
        enterpriseId: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
        buildingId: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
        startTime: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
        endTime: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
        paymentAmount: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
        paymentMethod: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
      },
      page: 1,
      pageSize: 10,
      value1: '',
      tableData: [],
      total: null,
      id1: 0,
      data: {},
      daterq: '',
    }
  },
  methods: {
    aaa() {
      this.ruleForm.startTime = this.value2[0]
      this.ruleForm.endTime = this.value2[1]
      console.log(this.ruleForm.startTime);
      console.log(this.ruleForm.endTime);
      let date1 = new Date(this.value2[0])
      let date2 = new Date(this.value2[1])
      date1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
      date2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
      const diff = date2.getTime() - date1.getTime(); //目标时间减去当前时间
      const diffDate = diff / (24 * 60 * 60 * 1000);  //计算当前时间与结束时间之间相差天数
      this.ruleForm.paymentAmount = diffDate * 41.67
      console.log(this.ruleForm.paymentAmount);
    },
    getadd() {
      this.dialogVisible2 = true

    },
    onSubmit() {
      console.log(this.formInline);

      if (this.value1 == null || this.value1 == []) {
        this.formInline.start = '',
          this.formInline.end = '',
          this.add()
      } else {
        this.formInline.start = this.value1[0]
        this.formInline.end = this.value1[1]
        this.add()
      }

    },

    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {

          const res = await addcostApi(this.ruleForm)
          console.log(res);
          this.$message({
            message: '恭喜你,添加成功',
            type: 'success'
          });
          this.dialogVisible2 = false
          this.add()
          console.log(this.ruleForm);
          this.$refs[formName].resetFields();
          // this.dialogVisible2 = false
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogVisible2 = false
    },
    ck(data) {
      this.data = data
      this.dialogVisible1 = true
    },
    async add() {
      const res = await getcostApi({ page: this.page, pageSize: this.pageSize }, this.formInline)
      console.log(res);
      this.tableData = res.data.data.rows
      this.total = res.data.data.total

    },
    async getqy() {
      const res = await AllenterprisecostApi()

      this.qylist = res.data.data
      console.log(this.qylist);
    },
    async getly() {
      const res = await AllbuildingcostApi()

      this.lylist = res.data.data
      console.log(this.lylist);
    },
    async del1() {
      this.dialogVisible = false
      const res = await delcostApi(this.id1)
      this.$message({
        type: 'success', // success error warning
        message: '删除成功',
        duration: 2000,
      })
      this.add()
      console.log(res);

    },
    handleSizeChange(val) {
      this.pageSize = val
      this.add()
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    del(id) {
      console.log(id);
      // this.id1=id
      this.dialogVisible = true

    },
    handleCurrentChange(val) {
      this.page = val
      this.add()
    },
  },
  created() {
    this.add()
    this.getqy()
    this.getly()
  }
};

</script>

<style lang='scss' scoped>
.el-icon-remove-outline {
  color: #faad14;
}

.dialog-footer {
  float: right;
  margin-bottom: 40px;
}
</style>
