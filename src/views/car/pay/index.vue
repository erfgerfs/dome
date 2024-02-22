<template>
  <div>
    <div style="margin: 20px 0;border-bottom: 1px solid #ccc;">
      <el-form size="small" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="车牌号码">
          <el-input v-model="formInline.carNumber" placeholder="请输入车牌号码"></el-input>
        </el-form-item>
        <el-form-item label="缴费状态">
          <el-select size="small" v-model="formInline.paymentStatus" placeholder="未选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="未缴费" :value=0></el-option>
            <el-option label="已缴费" :value=1></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>

      <el-table :data="list" style="width: 100%">
        <el-table-column type="index" label="序号">
        </el-table-column>
        <el-table-column prop="carNumber" label="车牌号码">
        </el-table-column>
        <el-table-column prop="chargeType" label="收费类型">
          <template v-slot="{ row }">
            <p v-if="row.chargeType == 'temp'">临时停车</p>
            <p v-else>临时停车</p>

          </template>
        </el-table-column>
        <el-table-column prop="parkingTime" label="停车总时长">
        </el-table-column>
        <el-table-column prop="actualCharge" label="缴纳费用（元）">
        </el-table-column>
        <el-table-column prop="paymentStatus" label="缴费状态">
          <template v-slot="{ row }">
            <p v-if="row.paymentStatus == 1">已缴费</p>
            <p v-else>未缴费</p>
          </template>
        </el-table-column>
        <el-table-column prop="paymentMethod" label="缴纳方式">
          <template v-slot="{ row }">
            <p v-if="row.paymentMethod == 'Alipay'">支付宝</p>
            <p v-else-if="row.paymentMethod == 'WeChat'">微信</p>
            <p v-else-if="row.paymentMethod == 'Cash'">线下</p>
            <p v-else>--</p>
          </template>
        </el-table-column>
        <el-table-column prop="parkingTime" label="缴纳时间">
        </el-table-column>
      </el-table>
    </div>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
      :page-sizes="[10, 20, 30, 100]" :page-size="pageSize" layout="->,total, prev,pager,next,sizes, jumper" :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { getparApi } from '@/api/user'

export default {
  name: "pay",
  data() {
    return {
      formInline: {
        carNumber: '',
        paymentStatus: null
      },
      page: 1,
      pageSize: 10,
      list: [],
      total: null
    }
  },
  methods: {
    onSubmit() {
      // console.log('submit!');
      this.add()
    },
    async add() {
      const res = await getparApi({ page: this.page, pageSize: this.pageSize, carNumber: this.formInline.carNumber, paymentStatus: this.formInline.paymentStatus })
      console.log(res);
      this.list = res.data.data.rows
      this.total = res.data.data.total
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.add()
    },
    handleCurrentChange(val) {
      this.page = val
      this.add()
    }
  },
  created() {
    this.add()
  }
};

</script>

<style lang='scss' scoped></style>
