<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="一体杆名称:">
        <el-input v-model="formInline.poleName" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="一体杆编号：">
        <el-input v-model="formInline.poleNumber" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="处置状态">
        <el-select v-model="formInline.handleStatus" placeholder="未派单">
          <el-option label="全部" value=""></el-option>
          <el-option label="未派单" :value="0"></el-option>
          <el-option label="已派单" :value="1"></el-option>
          <el-option label="已接单" :value="2"></el-option>
          <el-option label="已完成" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="list" style="width: 100%">
      <el-table-column type="index" label="序号">
      </el-table-column>
      <el-table-column prop="poleName" label="一体杆名称">
      </el-table-column>
      <el-table-column prop="poleNumber" label="一体杆编号">
      </el-table-column>
      <el-table-column prop="errorType" label="故障类型">
      </el-table-column>
      <el-table-column prop="handleStatus" label="处置状态">
        <template v-slot="{ row }">
          <p v-show="row.handleStatus == 0">未派单</p>
          <p v-show="row.handleStatus == 1">已派单</p>
          <p v-show="row.handleStatus == 2">已结单</p>
          <p v-show="row.handleStatus == 3">已完成</p>
        </template>
      </el-table-column>
      <el-table-column prop="warningTime" label="告警时间">
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="{ row }">
          <span style="color: blue;margin-left: 10px;" v-n="'pole:warning:send'">派单</span>
          <span style="color: blue;margin-left: 10px;" v-n="'pole:warning:query'">详情</span>
          <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="del(row.id)">
            <span style="color: blue;margin-left: 10px;" slot="reference" v-n="'pole:warning:remove'">删除</span>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { gjApi, delgjApi } from '@/api/user'
export default {
  name: "warnList",
  data() {
    return {
      list: [],
      page: 1,
      pageSize: 10,
      formInline: {
        poleName: '',
        poleNumber: '',
        handleStatus: ''
      }
    }
  },
  methods: {
    async del(id) {

      const res = await delgjApi(id)
      console.log(res);
      this.$message({
        type: 'success', // success error warning
        message: '删除成功',
        duration: 2000,
      })
      this.add()
    },
    async add() {
      const res = await gjApi({ page: this.page, pageSize: this.pageSize, ...this.formInline })
      console.log(res);
      this.list = res.data.data.rows
    },
    onSubmit() {
      this.add()
    }
  },
  created() {
    this.add()
  }
};

</script>

<style lang='scss' scoped></style>
