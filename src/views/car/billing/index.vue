<template>
  <div>
    <el-button type="primary" size="small" style="margin: 20px 0;" @click="dialogVisible = true">添加停车计费规则</el-button>
    <div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="序号" >
        </el-table-column>
        <el-table-column prop="ruleNumber" label="计费规则编号" >
        </el-table-column>
        <el-table-column prop="ruleName" label="计费规则名称">
        </el-table-column>
        <el-table-column prop="freeDuration" label="免费时长（分钟）" >
        </el-table-column>
        <el-table-column label="收费上限（元）">
          <template v-slot="{ row }">
            <p v-if="row.chargeCeiling == null">--</p>
            <p v-else>{{ row.chargeCeiling }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="chargeType" label="计费方式">
          <template v-slot="{ row }">
            <p v-show="row.chargeType == 'duration'">时长收费</p>
            <p v-show="row.chargeType == 'turn'">按次收费</p>
            <p v-show="row.chargeType == 'partition'">分段收费</p>

          </template>
        </el-table-column>
        <el-table-column prop="ruleNameView" label="计费规则" >
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template v-slot="{ row }">
            <el-button type="text" size="small" @click="bj(row.id)">编辑</el-button>
            <el-button type="text" size="small" @click="del(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :title="this.bl" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="计费规则编号" prop="ruleNumber">
          <el-input v-model="ruleForm.ruleNumber"></el-input>
        </el-form-item>
        <el-form-item label="计费规则名称" prop="ruleName">
          <el-input v-model="ruleForm.ruleName"></el-input>
        </el-form-item>
        <el-form-item label="计费方式" prop="chargeType">
          <div style="display: flex;">
            <el-radio v-model="ruleForm.chargeType" label="duration" size="small" border>时长收费</el-radio>
            <el-radio v-model="ruleForm.chargeType" label="turn" size="small" border>按次收费</el-radio>
            <el-radio v-model="ruleForm.chargeType" label="partition" size="small" border>分段收费</el-radio>
          </div>
        </el-form-item>

        <div style="display: flex;align-items: center;">
          <el-form-item label="免费时长">
            <el-input-number style="width: 100px;" v-model="ruleForm.durationTime" controls-position="right"
              @change="handleChange" :min="1"></el-input-number>分钟
          </el-form-item>
          <el-form-item label="收费上限">
            <el-input v-model="ruleForm.chargeCeiling"></el-input>元
          </el-form-item>
        </div>
        <div>
          <div v-show="ruleForm.chargeType == 'duration'">
            <el-form-item label="计费规则">
              <div style="display: flex;">
                <div>
                  每<el-input-number size="small" style="width: 100px;" v-model="ruleForm.freeDuration"
                    controls-position="right" @change="handleChange1" :min="1"></el-input-number>
                </div>
                <div>
                  <el-select size="small" style="width: 60px;" v-model="ruleForm.durationType" placeholder="请选择">
                    <el-option label="小时" value="hour"></el-option>
                    <el-option label="分钟" value="minute"></el-option>

                  </el-select>
                </div>
                <div>
                  <el-input size="small" style="width: 60px;" v-model="ruleForm.durationPrice"></el-input>元
                </div>
              </div>
            </el-form-item>
          </div>
          <div v-show="ruleForm.chargeType == 'turn'">
            <el-form-item label="计费规则">

              <el-input size="small" style="width: 100px;" v-model="ruleForm.turnPrice"></el-input>元

            </el-form-item>
          </div>
          <div v-show="ruleForm.chargeType == 'partition'">
            <el-form-item label="计费规则">
              <div style="display: flex;width: 100%;">
                <el-input size="small" style="width: 60px;" v-model="ruleForm.partitionFrameTime"></el-input>小时内，
                每小时收费<el-input size="small" style="width: 60px;" v-model="ruleForm.partitionFramePrice"></el-input>元
              </div>
              <div style="display: flex;width: 100%;">
                每增加<el-input size="small" style="width: 60px;" v-model="ruleForm.partitionIncreaseTime"></el-input>小时，
                增加<el-input size="small" style="width: 60px;" v-model="ruleForm.partitionIncreasePrice"></el-input>元
              </div>
            </el-form-item>
          </div>
        </div>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
      :page-sizes="[10, 20, 30, 100]" :page-size="pageSize" layout="->,total, prev,pager,next,sizes, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { getbillingApi, delbillingApi, addbillingApi, xqbillingApi, updatebillingApi } from '@/api/user'
export default {
  name: "billing",
  data() {
    return {
      tableData: [],
      page: 1,
      pageSize: 10,
      dialogVisible: false,
      total: null,
      id1: null,
      bl: '添加计费规则',
      ruleForm: {
        ruleName: '',
        chargeType: 'duration',
        ruleNumber: '',
        durationTime: '',
        durationPrice: '',
        durationType: '',
        freeDuration: null,
        chargeCeiling: '',

        turnPrice: '',

        partitionFrameTime: null,
        partitionFramePrice: '',
        partitionIncreaseTime: null,
        partitionIncreasePrice: '',

      },
      rules: {
        ruleName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
        chargeType: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
        ruleNumber: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },

        ],
      }

    }
  },
  methods: {
    async bj(id) {
      this.id1 = id
      const res = await xqbillingApi(id)
      console.log('wsq', res);
      this.ruleForm = res.data.data
      console.log(this.ruleForm);
      this.bl = '修改计费规则'
      this.dialogVisible = true
    },
    ccc() {
      console.log(this.ruleForm.chargeType);
    },
    handleChange(value) {
      this.ruleForm.durationTime = value
    },
    handleChange1(value) {
      this.freeDuration = value
    },
    async add() {
      const res = await getbillingApi({ page: this.page, pageSize: this.pageSize })
      console.log('res', res);
      this.tableData = res.data.data.rows
      this.total = res.data.data.total
    },
    async del(id) {
      const res = await delbillingApi(id)
      console.log(res);
      this.$message({
        type: 'success', // success error warning
        message: '删除',
        duration: 2000,
      })
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
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (!this.id1) {
            const res = await addbillingApi(this.ruleForm)
            console.log(res);
            this.$message({
              type: 'success', // success error warning
              message: '添加成功!',
              duration: 2000,
            })
          } else {
            const res = await updatebillingApi(this.ruleForm, { id: this.id1 })
            console.log(res);
            this.$message({
              type: 'success', // success error warning
              message: '编辑成功!',
              duration: 2000,
            })
          }
          this.add()

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

    },

  },
  created() {
    this.add()

  }
};

</script>

<style lang='scss' scoped></style>
