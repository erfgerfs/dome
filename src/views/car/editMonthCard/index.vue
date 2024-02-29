<template>
  <div style="width: 100%;height: 100%;background-color: #f4f6f8;justify-content: center;">
    <Header :content="'修改月卡'"></Header>
    <div style="background-color: #fff;width: 80%;margin: 20px auto;">
      <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="车主姓名" prop="personName">
            <el-input v-model="ruleForm.personName"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="phoneNumber">
            <el-input v-model="ruleForm.phoneNumber"></el-input>
          </el-form-item>
          <el-form-item label="车牌号码" prop="carNumber">
            <el-input v-model="ruleForm.carNumber"></el-input>
          </el-form-item>
          <el-form-item label="车辆品牌" prop="carBrand">
            <el-input v-model="ruleForm.carBrand"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div style="background-color: #fff;width: 80%;margin: 20px auto;">
      <el-form :model="ruleForm1" :rules="rules1" ref="ruleForm1" label-width="100px" class="demo-ruleForm">
        <el-form-item label="有效日期" prop="value1">
          <el-date-picker v-model="value1" @change="rq" value-format="yyyy-MM-dd" type="daterange" range-separator="至"
            start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="支付金额" prop="paymentAmount">
          <el-input v-model="ruleForm1.paymentAmount"></el-input>
        </el-form-item>
        <el-form-item label="支付方式" prop="paymentMethod">
          <el-select v-model="ruleForm1.paymentMethod" placeholder="请选择支付方式">
            <el-option label="支付宝" value="Alipay"></el-option>
            <el-option label="微信" value="WeCha"></el-option>
            <el-option label="线下" value="Cash"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

    </div>
    <div style="width: 100%;background-color: #fff;line-height: 80px;position: fixed;bottom: 0;text-align: center;">

      <el-button type="primary" @click="submitForm()">立即创建</el-button>
      <el-button @click="resetForm()">重置</el-button>

    </div>
  </div>
</template>

<script>
import Header from '@/components/user/header.vue';
import { addcardApi, xqcardApi, updatecardApi } from '@/api/user'
export default {
  components: {
    Header
  },
  data() {
    return {
      id1: this.$route.query.id,
      value1: [],
      ruleForm: {
        personName: '',
        phoneNumber: '',
        carNumber: '',
        carBrand: ''
      },
      ruleForm1: {
        cardStartDate: '',
        cardEndDate: '',
        paymentAmount: '',
        paymentMethod: '',
        rechargeId: null
      },
      rules1: {
        cardStartDate: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
        cardEndDate: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
        paymentAmount: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
        paymentMethod: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
      },
      rules: {
        personName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
        phoneNumber: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
        carNumber: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
        carBrand: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],

      }
    }
  },
  methods: {

    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          const than = this
          this.$refs.ruleForm1.validate(async (valid) => {
            if (valid) {
              // alert('submit!');
              const data = {
                ...than.ruleForm,
                cardStartDate: than.ruleForm1.cardStartDate,
                cardEndDate: than.ruleForm1.cardEndDate,
                paymentAmount: than.ruleForm1.paymentAmount,
                paymentMethod: than.ruleForm1.paymentMethod,
                rechargeId: than.ruleForm1.rechargeId,

              }
              const res = await updatecardApi(data)

              console.log(res);
              this.$message({
                type: 'success', // success error warning
                message: '编辑成功',
                duration: 2000,
              })
              than.$router.go(-1)
            } else {
              console.log('error submit!!');
              return false;
            }
          })
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    rq() {
      // console.log(this.value1);
      this.ruleForm1.cardStartDate = this.value1[0]
      this.ruleForm1.cardEndDate = this.value1[1]
    },
    async add() {

      const res = await xqcardApi(this.id1.id)
      console.log(res);
      this.ruleForm = {
        personName: res.data.data.personName,
        phoneNumber: res.data.data.phoneNumber,
        carNumber: res.data.data.carNumber,
        carBrand: res.data.data.carBrand,
        carInfoId: res.data.data.carInfoId,
      };
      this.ruleForm1 = {

        paymentAmount: res.data.data.paymentAmount,
        paymentMethod: res.data.data.paymentMethod,
        rechargeId: res.data.data.rechargeId,
        cardStartDate: res.data.data.cardStartDate,
        cardEndDate: res.data.data.cardEndDate,
      }
      this.value1 = [res.data.data.cardStartDate, res.data.data.cardEndDate]
    }
  },
  created() {
    this.add()
  }
}

</script>

<style lang='scss' scoped></style>
