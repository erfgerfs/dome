<template>
  <div style="width: 100%;height: 100%;background-color: #f4f6f8;justify-content: center;">
    <Header :content="'详情查看'"></Header>
    <div style="background-color: #fff;width: 80%;margin: 20px auto;">
      <div>
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="车主姓名" prop="personName">
            {{ ruleForm.personName }}
          </el-form-item>
          <el-form-item label="联系方式" prop="phoneNumber">
            {{ ruleForm.phoneNumber }}
          </el-form-item>
          <el-form-item label="车牌号码" prop="carNumber">
            {{ ruleForm.carNumber }}
          </el-form-item>
          <el-form-item label="车辆品牌" prop="carBrand">
            {{ ruleForm.carBrand }}
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div style="background-color: #fff;width: 80%;margin: 20px auto;">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号">
        </el-table-column>
        <el-table-column prop="cardEndDate" label="有效时间" width="180">
        </el-table-column>
        <el-table-column prop="paymentAmount" label="支付金额" width="180">
        </el-table-column>
        <el-table-column prop="cardStartDate" label="办理时间" width="180">
        </el-table-column>
        <el-table-column prop="createUser" label="办理人" width="180">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Header from '@/components/user/header.vue';
import { ckrechargeApi } from '@/api/user'
export default {
  components: {
    Header
  },
  data() {
    return {
      tableData: [],
      id1: this.$route.query.id,
      value1: [],
      ruleForm: {
        personName: '',
        phoneNumber: '',
        carNumber: '',
        carBrand: ''
      },
    }
  },
  methods: {

    async add() {

      const res = await ckrechargeApi(this.id1)
      console.log(res);
      this.ruleForm = {
        personName: res.data.data.personName,
        phoneNumber: res.data.data.phoneNumber,
        carNumber: res.data.data.carNumber,
        carBrand: res.data.data.carBrand,
        carInfoId: res.data.data.carInfoId,
      };
      this.tableData = res.data.data.rechargeList
    }
  },
  created() {
    this.add()
  }
}

</script>

<style lang='scss' scoped></style>
