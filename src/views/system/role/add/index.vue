<template>
  <div>
    <Header :content="nnn"></Header>
    <div style="height: 100vh;width: 100vw;background-color: #f4f6f8;display: flex;justify-content: space-between;">
      <div style="margin-top: 20px;">
        <div style="height: 300px;">
          <el-steps direction="vertical" :active="active" finish-status="success">
            <el-step title="角色信息"></el-step>
            <el-step title="权限信息"></el-step>
            <el-step title="检查并完成"></el-step>
          </el-steps>
        </div>
      </div>
      <div v-show="this.yc == 1"
        style="margin: 0 auto;margin-top: 20px;background-color: #fff;padding: 20px;height: 200px;">
        <span>角色信息</span>
        <div style="margin: auto;">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="角色名称" prop="roleName">
              <el-input v-model="ruleForm.roleName"></el-input>
            </el-form-item>
            <el-form-item label="角色描述">

              <el-input type="textarea" v-model="ruleForm.remark"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div v-show="this.yc == 2"
        style="margin: 0 auto;margin-top: 20px;background-color: #fff;padding: 20px;height: 100vh;">
        <span>权限配置</span>
        <div style="height: 100vh;display: flex;justify-content: space-around;flex-wrap: wrap;">
          <div
            style="display: flex;flex-direction: column;border-left: 1px solid #ccc;border-right: 1px solid #ccc;padding: 15px 10px;"
            v-for="(ite, indx) in list1" :key="ite.id">
            <button style="border: 0;padding: 20px;">{{ ite.title }}</button>
            <div style="padding: 10px;">

              <el-tree :data="ite.children" show-checkbox default-expand-all node-key="id" ref="tree" highlight-current
                :props="defaultProps" :default-checked-keys="perms2">
              </el-tree>
            </div>
          </div>
        </div>
      </div>

      <div v-show="this.yc == 3"
        style="margin: 0 auto;margin-top: 20px;background-color: #fff;padding: 20px;height: 100vh;">

        <div>
          角色名称:{{ this.ruleForm.roleName }}
          角色描述:{{ this.ruleForm.remark }}
          角色权限:
          <div
            style="display: flex;flex-direction: column;border-left: 1px solid #ccc;border-right: 1px solid #ccc;padding: 15px 10px;"
            v-for="(ite, indx) in list1" :key="ite.id">
            <button style="border: 0;padding: 20px;">{{ ite.title }}</button>
            <div style="padding: 10px;">

              <el-tree :data="ite.children" show-checkbox :default-checked-keys="bbb" default-expand-all node-key="id"
                ref="tree" highlight-current :props="defaultProps">
              </el-tree>
            </div>
          </div>
        </div>
      </div>
      <div
        style="width: 100vw;height: 60px;line-height: 60px;position: fixed;bottom: 0;background-color: #fff;text-align: center;">
        <el-button @click="goone" v-show="this.yc == 2">上一步</el-button>
        <el-button @click="goone1" v-show="this.yc == 3">上一步</el-button>
        <el-button type="primary" v-show="this.yc == 1" @click="submitForm('ruleForm')">下一步</el-button>
        <el-button type="primary" v-show="this.yc == 2" @click="getCheckedKeys">下一步</el-button>
        <el-button type="primary" v-show="this.yc == 3" @click="addtj">确认添加</el-button>
      </div>
    </div>
  </div>
</template>


<script>
import Header from "@/components/user/header.vue"
import { getroleApi, addroleApi, updateroleApi } from '@/api/user'
import { addDisabled } from '@/utils/index'
export default {
  components: {
    Header
  },
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      yc: 1,
      nnn: '',
      lll: [],
      xgid: '',
      list1: [],
      bbb: [],
      perms2: [],
      active: 1,
      mode: this.$route.query.mode,
      xglist: this.$route.query.list,
      xgperms: null,
      ruleForm: {
        roleName: '',
        remark: '',
      },
      rules: {
        roleName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },

        ],
      }
    }
  },
  methods: {
    async addtj() {
      if (this.mode == 'edit') {

        const res = await updateroleApi({ ...this.ruleForm, roleId: this.xgid, perms: this.lll })
        console.log(res);
        this.$message({
          type: 'success', // success error warning
          message: '编辑成功',
          duration: 2000,
        })
      } else {
        const res = await addroleApi({ remark: this.ruleForm.remark, roleName: this.ruleForm.roleName, perms: this.lll })
        console.log(res);
        this.$message({
          type: 'success', // success error warning
          message: '添加成功',
          duration: 2000,
        })
      }
      this.$router.push('/system/permission')
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.active = 2
          this.yc = 2
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    goone() {
      this.active = 1
      this.yc = 1
    },
    goone1() {
      this.active = 2
      this.yc = 2
    },
    getCheckedKeys() {
      this.bbb = []
      this.lll = []
      for (var i = 0; i < this.list1.length; i++) {
        this.lll.push(this.$refs.tree[i].getCheckedKeys())
        console.log('this.$refs.tree[i].getCheckedKeys()', this.$refs.tree[i].getCheckedKeys());
      }


      this.lll.forEach(item => {
        item.forEach(itm => {
          this.bbb.push(itm)
        })
      })
      console.log('this.bbb', this.bbb);


      console.log(this.lll);
      this.active = 3
      this.yc = 3
      // if (this.active == 3 && this.yc == 3) {
      //   addDisabled(this.lll)
      // }
    },
    async add() {
      this.nnn = '添加角色'
      const res = await getroleApi()
      console.log(res);
      this.list1 = res.data.data
      console.log('xglist', this.xglist);
      console.log('mode', this.mode);
      if (this.mode == 'edit') {
        this.nnn = '修改角色'
        this.ruleForm.roleName = this.xglist.roleName
        this.ruleForm.remark = this.xglist.remark
        //roleId
        this.xgid = this.xglist.roleId
        this.xgperms = this.xglist.perms
        console.log('this.xgperms', this.xgperms);
        this.xgperms.map(item => {
          console.log('item', item);
          item.filter(itm => {
            this.perms2.push(itm)
          })
        })
        console.log(this.perms2);
      }
    }
  },
  created() {
    this.add()
  },
}

</script>

<style lang='scss' scoped></style>
