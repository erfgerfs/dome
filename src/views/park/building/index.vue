<template>
  <div>
    <div style="width: 600px;justify-content: space-between;align-items: center;margin: 20px 0;">
      楼宇名称：<el-input v-model="input" placeholder="请输入楼宇名称" style="width: 250px;"></el-input>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </div>
    <el-button type="success" @click="dialogVisible = true">添加楼宇</el-button>
    <div>
      <template>
        <el-table :data="list" style="width: 100%">
          <el-table-column type="index" label="序号" width="50">
          </el-table-column>
          <el-table-column prop="name" label="楼宇名称" width="200">
          </el-table-column>
          <el-table-column prop="floors" label="层数">
          </el-table-column>
          <el-table-column prop="area" label="在管面积(m²)">
          </el-table-column>
          <el-table-column prop="propertyFeePrice" label="物业费(元/m²)">
          </el-table-column>
          <el-table-column prop="status" label="状态">
            <template v-slot="scope">
              <p v-if="scope.row.status == 0">空置中</p>
              <p v-else>使用中</p>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot="scope">
              <a style="margin:0 5px;color: #7094ff;" href="#" @click="bj(scope.row.id)">编辑</a>
              <a style="margin:0 5px;color: #7094ff;" href="#" @click="del(scope.row.id)">删除</a>

            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
      :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="100">
    </el-pagination>
    <el-dialog title="添加楼宇" :visible.sync="dialogVisible" width="30%">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="楼宇名称" prop="name">
          <el-input placeholder="请输入楼宇名称" v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="楼宇层数" prop="floors">
          <el-input placeholder="请输入层数" v-model="ruleForm.floors"></el-input>
        </el-form-item>
        <el-form-item label="在管面积" prop="propertyFeePrice">
          <el-input placeholder="请输入在管面积" v-model="ruleForm.propertyFeePrice">
            <template slot="append">m²</template>
          </el-input>
        </el-form-item>
        <el-form-item label="物业费" prop="area">
          <el-input placeholder="请输入物业费" v-model="ruleForm.area">
            <template slot="append">元/m²</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>
    <el-dialog title="编辑楼宇" :visible.sync="dialogVisible1" width="30%">
      <el-form :model="ruleForm1" label-width="100px" class="demo-ruleForm">
        <el-form-item label="编辑楼宇名称">
          <el-input placeholder="请输入楼宇名称" v-model="ruleForm1.name"></el-input>
        </el-form-item>
        <el-form-item label="编辑楼宇层数">
          <el-input placeholder="请输入层数" v-model="ruleForm1.floors"></el-input>
        </el-form-item>
        <el-form-item label="编辑在管面积">
          <el-input placeholder="请输入在管面积" v-model="ruleForm1.propertyFeePrice">
            <template slot="append">m²</template>
          </el-input>
        </el-form-item>
        <el-form-item label="编辑物业费">
          <el-input placeholder="请输入物业费" v-model="ruleForm1.area">
            <template slot="append">元/m²</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm1()">确认修改</el-button>
          <el-button @click="resetForm2()">取消</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>
  </div>
</template>

<script>
import { lyglApi, lygldelApi, lygladdApi, lyglupApi, lyglxqApi } from '@/api/user'
export default {
  name: "billing",
  data() {
    return {
      page: 1,
      pageSize: 10,
      list: [],
      input: '',
      total1: '',
      name: '',
      list1: '',

      dialogVisible: false,
      dialogVisible1: false,
      ruleForm: {
        name: '',
        floors: '',
        propertyFeePrice: '',
        area: ''
      },
      ruleForm1: {
        id: 0,
        name: '',
        floors: '',
        propertyFeePrice: '',
        area: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入楼宇名称', trigger: 'blur' },
          { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
        ],
        floors: [
          { required: true, message: '请输入层数名称', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        propertyFeePrice: [
          { required: true, message: '请输入在管面积', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        area: [
          { required: true, message: '请输入物业费', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
      }
    }

  },
  methods: {

    async bj(id) {
      const res = await lyglxqApi(id)
      console.log('bbb', res);
      this.list1 = res.data.data
      this.ruleForm1.name = this.list1.name
      this.ruleForm1.floors = this.list1.floors
      this.ruleForm1.propertyFeePrice = this.list1.propertyFeePrice
      this.ruleForm1.area = this.list1.area

      this.ruleForm1.id = id
      this.dialogVisible1 = true

    },
    async add() {
      const res = await lyglApi({ page: this.page, pageSize: this.pageSize, name: this.name })
      console.log(res);
      this.list = res.data.data.rows
      this.total1 = res.data.data.total

    },
    onSubmit() {
      this.name = this.input
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
    async del(id) {
      if (confirm('确认删除吗')) {
        const res = await lygldelApi(id)
        console.log(res);
        this.$message({
          message: '恭喜你,删除成功',
          type: 'success'
        });
        this.add()
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await lygladdApi(this.ruleForm)
          console.log(res);
          this.$message({
            message: '恭喜你,添加成功',
            type: 'success'
          });
          this.dialogVisible = false
          this.$refs[formName].resetFields();
          this.add()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.dialogVisible = false
      this.$refs[formName].resetFields();
    },


    async submitForm1() {
      // console.log(this.ruleForm1.name);
      const res = await lyglupApi(this.ruleForm1)
      console.log(res);
      this.$message({
        message: '修改成功',
        type: 'success'
      });
      this.dialogVisible1 = false
      this.add()
    },
    resetForm1() {
      this.dialogVisible1 = false

    }

  },
  created() {
    this.add()
  }
};


</script>

<style lang='scss' scoped></style>
