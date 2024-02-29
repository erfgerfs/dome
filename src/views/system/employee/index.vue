<template>
  <div>
    <div>
      <el-form :inline="true" style="border-bottom: 1px solid #ccc;" :model="formInline" class="demo-form-inline">
        <el-form-item label="员工姓名：">
          <el-input v-model="formInline.name" placeholder="请输入员工姓名"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <el-button style="margin: 20px 0;" type="primary" @click="add1" v-n="'sys:user:add_edit'">添加员工</el-button>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号">
        </el-table-column>
        <el-table-column prop="name" label="员工姓名">
        </el-table-column>
        <el-table-column prop="userName" label="登录账号">
        </el-table-column>
        <el-table-column prop="phonenumber" label="联系方式">
        </el-table-column>
        <el-table-column prop="roleName" label="角色">
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template v-slot="{ row }">
            <div v-if="row.status == 1">启用</div>
            <div v-else>禁用</div>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="添加时间">
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template v-slot="{ row }">
            <el-button type="text" @click="bj(row)" v-n="'sys:user:add_edit'">编辑</el-button>
            <el-button type="text" @click="open(row.id)" v-n="'sys:user:remove'">删除</el-button>
            <el-button type="text" @click="pass(row.id)" v-n="'sys:user:resetPwd'">重置密码</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination style="float: right;" @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page="page" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="total, sizes, jumper"
      :total="total">
    </el-pagination>
    <el-dialog :title='this.text' :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="员工姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="登录账号" prop="userName">
          <el-input v-model="ruleForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="phonenumber">
          <el-input v-model="ruleForm.phonenumber"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <div>默认密码:123456</div>
        </el-form-item>
        <el-form-item label="分配角色" prop="roleId">
          <el-select v-model="ruleForm.roleId" placeholder="请选择分配角色">
            <el-option :label="item.roleName" v-for="(item, index) in rolelist" :key="index"
              :value="item.roleId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="员工状态" prop="status">
          <el-radio v-model="ruleForm.status" :label="0">禁用</el-radio>
          <el-radio v-model="ruleForm.status" :label="1">启用</el-radio>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { listemployeeApi, getemployeeApi, addemployeeApi, delemployeeApi, updateemployeeApi, passemployeeApi } from '@/api/user'
export default {
  name: "employee",
  data() {
    return {
      formInline: {
        name: ''
      },
      ruleForm: {
        name: '',
        phonenumber: '',
        roleId: null,
        status: null,
        userName: ''
      },
      text: '',
      page: 1,
      pageSize: 10,
      tableData: [],
      total: null,
      dialogVisible: false,
      rolelist: [],

      id: null,
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
        phonenumber: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
        roleId: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
        status: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
        userName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
      }
    }
  },
  methods: {
    async pass(id) {
      this.$confirm('此操作将目标重置密码, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await passemployeeApi({ id: id })
        console.log(res);
        this.add()
        this.$message({
          type: 'success', // success error warning
          message: '重置密码成功!',
          duration: 2000,
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    bj(data) {
      this.dialogVisible = true
      this.text = '编辑员工'
      this.id = data.id
      this.ruleForm = JSON.parse(JSON.stringify(data))
    },
    add1() {
      this.dialogVisible = true
      this.text = '添加员工'
    },
    open(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await delemployeeApi(id)
        console.log(res);
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.add()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    onSubmit() {

      this.add()
    },
    async add() {
      const { data } = await listemployeeApi({ page: this.page, pageSize: this.pageSize, name: this.formInline.name })
      // console.log(res);
      this.tableData = data.data.rows
      this.total = data.data.total
      const res = await getemployeeApi()
      console.log(res);
      this.rolelist = res.data.data

    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val
      this.add()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val
      this.add()
    },
    handleClose() {
      this.ruleForm = {}
      this.dialogVisible = false
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (this.id) {
            const data = {
              name: this.ruleForm.name,
              phonenumber: this.ruleForm.phonenumber,
              roleId: this.ruleForm.roleId,
              roleName: this.ruleForm.roleName,
              status: this.ruleForm.status,
              userName: this.ruleForm.userName,
              id: this.id
            }
            const res = await updateemployeeApi(data)
            console.log(res);

            this.$message({
              type: 'success', // success error warning
              message: '编辑!',
              duration: 2000,
            })
          } else {
            // for (let i = 2000; i < 100000; i++) {

            // this.ruleForm.userName = i
            const res = await addemployeeApi(this.ruleForm)
            console.log(res);
            // }

            this.$message({
              type: 'success', // success error warning
              message: '添加!',
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
    }
  },
  created() {
    this.add()
  }
};

</script>

<style lang='scss' scoped></style>
