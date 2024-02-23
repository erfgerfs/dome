<template>
  <div>
    <el-form style="margin-bottom: 5px;border-bottom: 1px solid #ccc;" :inline="true" :model="formInline"
      class="demo-form-inline">
      <el-form-item label="车牌号码">
        <el-input size="small" v-model="formInline.carNumber" placeholder="请输入车牌号码"></el-input>
      </el-form-item>
      <el-form-item label="车主姓名">
        <el-input size="small" v-model="formInline.personName" placeholder="请输入车主姓名"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select size="small" v-model="formInline.cardStatus" placeholder="未选择">
          <el-option label="可用" :value=0></el-option>
          <el-option label="过期" :value=1></el-option>

        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <div style="margin-top: 10px;display: flex;align-items: center;width: 100%;justify-content: space-between;">
      <div>
        <el-button type="primary" size="small" @click="$router.push('/car/addMonthCard')">添加月卡</el-button>
        <el-button type="primary" size="small">批量删除</el-button>
      </div>
      <div class="aaa">
        <p style="bbb"> <i class="el-icon-success"></i>本园区共计 1530 个车位，月卡用户 0 人，车位占有率 0.00%</p>
      </div>
    </div>
    <el-table :data="tableData" border style="width: 100%">

      <el-table-column type="index" label="序号">
      </el-table-column>
      <el-table-column prop="personName" label="车主名称">
      </el-table-column>
      <el-table-column prop="phoneNumber" label="联系方式">
      </el-table-column>
      <el-table-column prop="carNumber" label="车牌号">
      </el-table-column>
      <el-table-column prop="carBrand" label="车辆品牌">
      </el-table-column>
      <el-table-column prop="totalEffectiveDate" label="剩余有效天数">
      </el-table-column>
      <el-table-column prop="cardStatus" label="状态">
        <template v-slot="{ row }">

          <div>可用</div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template v-slot="{ row }">
          <el-button type="text" size="small" @click="xf(row.id)">续费</el-button>
          <el-button type="text" size="small" @click="ck(row.id)">查看</el-button>
          <el-button type="text" size="small" @click="bj(row.id)">编辑</el-button>
          <el-button type="text" size="small" @click="del(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
      :page-sizes="[10, 20, 30, 100]" :page-size="pageSize" layout="->,total, prev,pager,next,sizes, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { getmonthCardApi } from '@/api/user';
export default {
  name: "monthCard",
  components: {

  },
  data() {
    return {
      formInline: {
        carNumber: '',
        personName: '',
        cardStatus: ''
      },
      page: 1,
      pageSize: 10,
      tableData: [],
      total: null
    }
  },
  methods: {

    onSubmit() {
      this.add()
    },
    async add() {
      const res = await getmonthCardApi({ page: this.page, pageSize: this.pageSize }, this.formInline)
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
    bj(id) {

    },
    del(id) {

    },

  },
  created() {
    this.add()
  }
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
