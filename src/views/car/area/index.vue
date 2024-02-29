<template>
  <div>
    <el-button type="primary" size="small" @click="bbb" v-n="'parking:area:add_edit'">添加区域</el-button>
    <el-table show-header :data="tableData" style="width: 100%">
      <el-table-column prop="ruleId" label="序号">
      </el-table-column>
      <el-table-column prop="areaName" label="区域名称">
      </el-table-column>
      <el-table-column prop="spaceNumber" label="车位数（个）">
      </el-table-column>
      <el-table-column prop="areaProportion" label="	面积（㎡）">
      </el-table-column>
      <el-table-column label="计费规则">
        <template v-slot="scope">
          <el-popover placement="top-start" trigger="hover" width="200" :content="scope.row.hoverRuleName">
            <p slot="reference" class="columnDiv">{{ scope.row.ruleName }}</p>
            <p class="hoverpart">{{ scope.row.hoverRuleName }}</p>
          </el-popover>
        </template>

      </el-table-column>
      <el-table-column prop="remark" label="备注">
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <a href="#" style="margin: 0 .1rem ;color: #4789ff;" @click="bj(scope.row)" v-n="'parking:area:add_edit'">编辑</a>
          <el-popconfirm title="这是一段内容确定删除吗" @onConfirm="del(scope.row.id)"><a href="#" slot="reference"
              style="margin: 0 .1rem ;color: #4789ff;" v-n="'parking:area:remove'">删除</a>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :before-close="handleClose" :title="qb" :visible.sync="dialogVisible" width="40%">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="区域名称" prop="areaName">
          <el-input v-model="ruleForm.areaName"></el-input>
        </el-form-item>
        <el-form-item label="车位数" prop="spaceNumber">
          <el-input-number style="width: 100%;" v-model="ruleForm.spaceNumber" controls-position="right"
            @change="handleChange" :min="1" :max="100"></el-input-number>
        </el-form-item>
        <el-form-item label="面积（㎡）" prop="areaProportion">
          <el-input v-model="ruleForm.areaProportion" style="width: 93%;"></el-input>㎡
        </el-form-item>
        <el-form-item label="关联计费规则" prop="ruleId">
          <el-select v-model="ruleForm.ruleId" placeholder="请选择活动区域">
            <el-option v-for="(item, index) in list" :key="index" :label="item.ruleName" :value="item.id"></el-option>

          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="ruleForm.remark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
          <el-button @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="Page.page"
      :page-sizes="[10, 20, 50, 100]" :page-size="Page.pageSize" layout="total, sizes, prev, pager, next, jumper"
      :total="100">
    </el-pagination>
  </div>
</template>

<script>
import { qygetApi, qy1delApi, qyxlApi, qybj1Api, qyadd1Api } from '@/api/user'
export default {
  name: "area",
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      qb: '',
      Page: {
        page: 1,
        pageSize: 10,

      },
      visible: false,
      list: [],
      id1: null,
      ruleForm: {
        areaName: '',
        spaceNumber: 1,
        areaProportion: '',
        ruleId: null,
        remark: ''
      },
      rules: {
        areaName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },

        ],
        spaceNumber: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },

        ],
        areaProportion: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },

        ],
        ruleId: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },

        ],
        remark: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },

        ],
      }
    }
  },
  methods: {
    bbb() {
      this.qb = '添加区域'
      this.dialogVisible = true

    },
    handleSizeChange(val) {
      this.Page.pageSize = val
      this.gett()
    },
    handleCurrentChange(val) {
      this.Page.page = val
      this.get()

    },
    bj(data) {
      console.log(data);
      this.id1 = data.id
      this.ruleForm = data
      this.qb = '编辑区域'
      this.dialogVisible = true

    },
    async get() {
      const res = await qygetApi(this.Page)
      console.log(res);
      this.tableData = res.data.data.rows
    },
    async del(id) {
      console.log(111);
      const res = await qy1delApi(id)
      console.log(res);
      this.$message({
        type: 'success', // success error warning
        message: '删除成功',
      })

      this.get()
    },
    handleChange(value) {
      console.log(value);
      this.ruleForm.spaceNumber = value
    },
    handleClose() {
      // console.log(11);
      // console.log(done);
      this.dialogVisible = false
      this.ruleForm = {}
    },
    async aaa() {
      const res = await qyxlApi()
      console.log("aaa", res);
      this.list = res.data.data.rows
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {

          if (!this.id1) {

            const res = await qyadd1Api(this.ruleForm)
            console.log(res);
            this.$message({
              type: 'success', // success error warning
              message: '添加成功',
            })
            this.$refs[formName].resetFields();
            this.get()
          } else {

            const res = await qybj1Api({ id: this.ruleForm.id, areaName: this.ruleForm.areaName, spaceNumber: this.ruleForm.spaceNumber, areaProportion: this.ruleForm.areaProportion, ruleId: this.ruleForm.ruleId, remark: this.ruleForm.remark })
            console.log(res);
            this.$message({
              type: 'success', // success error warning
              message: '编辑',
            })
            this.$refs[formName].resetFields();
            this.get()
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
    this.get()
    this.aaa()
  }
};

</script>

<style lang='scss' scoped>
.el-popover {
  z-index: 3000;
  background-color: rgba(65, 60, 60, 0.612);
}

.popoverDiv {
  color: #fff;
  background-color: #409EFF;

  .div1 {
    .span1 {

      margin-right: 20px;
    }
  }
}

/* .el-popper[x-placement^=left] .popper__arrow::after{
    border-left-color: #409EFF;
  } */
.el-popper[x-placement^=right] .popper__arrow::after {
  border-right-color: #409EFF;
}

/* .el-popper[x-placement^=bottom] .popper__arrow::after{
    border-bottom-color: #409EFF;
  }
  .el-popper[x-placement^=top] .popper__arrow::after{
    border-top-color: #409EFF;
  } */
.el-popper[x-placement^=right] {
  margin-left: 0px;
}
</style>
