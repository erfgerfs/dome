<template>
  <div>
    <el-form style="margin-bottom: 10px;border-bottom: 1px solid red;" :inline="true" :model="formInline"
      class="demo-form-inline">
      <el-form-item label="审批人">
        <el-input size="small" v-model="formInline.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="审批人">
        <el-input size="small" v-model="formInline.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select size="small" v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <div>
      <el-button type="primary" size="small" @click="$router.push('/car/addMonthCard')">添加月卡</el-button>
      <el-button type="primary" size="small">批量删除</el-button>
    </div>
    <div>
      <i></i>本园区共计 1530 个车位，月卡用户 0 人，车位占有率 0.00%
    </div>

  </div>
</template>

<script>
export default {
  name: "monthCard",
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    }
  }
};

</script>

<style lang='scss' scoped></style>
