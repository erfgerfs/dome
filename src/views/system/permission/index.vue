<template>
  <div>
    <el-button @click="$router.push('/system/role/add')">添加角色</el-button>
    <div class="box">
      <el-tabs :tab-position="'left'" style="height: 100vh;" type="card">
        <el-tab-pane v-for="(item, index) in list" :key="index">
          <span slot="label" class="aaa" @click="add1(item.roleId)"><i class="el-icon-user"></i>
            <el-tooltip class="item" effect="dark" :content="item.remark" placement="top-start">
              <a href="#"> {{ item.roleName }}</a></el-tooltip>
            <el-popover placement="top" width="100px" :v-model="visible" trigger="click">
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="bj">编辑角色</el-button>
                <el-button type="danger" size="mini" @click="open">删除</el-button>
              </div>
              <i @click="aaa(item.roleId)" :slot="reference1" class="el-icon-more"></i>
            </el-popover>
          </span>
        </el-tab-pane>
        <el-tabs v-model="activeName">
          <el-tab-pane label="功能权限" name="first">
            <div style="height: 100vh;display: flex;justify-content: space-around;">
              <div
                style="display: flex;flex-direction: column;border-left: 1px solid #ccc;border-right: 1px solid #ccc;padding: 15px 10px;"
                v-for="(ite, indx) in listsz" :key="ite.id">
                <button style="border: 0;padding: 20px;">{{ ite.title }}</button>
                <div style="padding: 10px;">

                  <el-tree :data="ite.children" :default-checked-keys="bg" show-checkbox default-expand-all node-key="id"
                    ref="tree" highlight-current :props="defaultProps">
                  </el-tree>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane :label="dt" name="second">
            <el-table :data="listlb" style="width: 100%">
              <el-table-column type="index" label="序号" width="180">
              </el-table-column>
              <el-table-column prop="name" label="员工姓名" width="180">
              </el-table-column>
              <el-table-column prop="userName" label="登录账号" width="180">
              </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
              :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </el-tab-pane>
        </el-tabs>


      </el-tabs>
    </div>

  </div>
</template>

<script>
import { listroleApi, gnroleApi, getroleApi, cyroleApi, delroleApi } from '@/api/user'
import { addDisabled } from '@/utils/index'
export default {
  name: "permission",
  data() {
    return {
      delid: '',
      total: 0,
      reference1: 'reference',
      dt: '成员',
      list: [],
      activeName: 'aaa',
      list1: [],
      listsz: [],
      listlb: [],
      list77: [],
      visible: false,
      bg: [],
      bg1: [],
      defaultProps: {
        children: 'children',
        label: 'title',

      },
      page: 1,
      pageSize: 10
    }
  },
  methods: {

    open() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await delroleApi(this.delid)
        console.log(res);
        this.add()

        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        console.log(111);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    bj() {
      // this.visible = false  mode=edit
      this.$router.push({
        path: '/system/role/add', query: {
          mode: 'edit',
          list:this.list77
        },
      })
      console.log('list77', this.list77);

    },
    aaa(id) {
      this.visible = true
      // console.log(1);
      this.delid = id
      // console.log(id);
    },
    hq(id) {
      console.log(id);
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.page = val
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageSize = val
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    async add1(id) {
      this.bg = []
      console.log(id);
      const res = await gnroleApi(id)
      console.log(res);

      this.list1 = res.data.data.perms
      this.list77 = res.data.data
      // this.bg = this.list1.filter(item => item.length != 0)
      this.list1.forEach(item => {
        item.forEach(ite => {

          this.bg.push(ite)
        })
      })
      this.add()
      console.log('item', this.bg);
      // console.log('bbb', this.bg);
      const res1 = await cyroleApi(id, { page: this.page, pageSize: this.pageSize })
      // this.$refs.tree.setCheckedKeys([this.bg]);
      this.listlb = res1.data.data.rows
      this.total = res1.data.data.total
      this.dt = `成员(${this.listlb.length})`

    },
    async add() {
      const res = await listroleApi()
      console.log(res);
      this.list = res.data.data
      const res1 = await getroleApi()
      console.log(res1);
      this.listsz = res1.data.data
      addDisabled(this.listsz)
    }
  },
  created() {
    this.add()
  }

};

</script>

<style lang='scss' scoped>
.el-tabs__header is-top {
  margin: 0 !important;
}

.box {
  height: 100vh;
  width: 100%;
  border: 1px solid #ccc;
}

.el-tabs__item is-left is-active {
  :hover {
    background-color: #edf5ff;
    border: 0;
  }
}

.el-tabs--left .el-tabs__header.is-left,
.el-tabs--left .el-tabs__header.is-right,
.el-tabs--left .el-tabs__nav-scroll,
.el-tabs--left .el-tabs__nav-wrap.is-left,
.el-tabs--left .el-tabs__nav-wrap.is-right,
.el-tabs--right .el-tabs__header.is-left,
.el-tabs--right .el-tabs__header.is-right,
.el-tabs--right .el-tabs__nav-scroll,
.el-tabs--right .el-tabs__nav-wrap.is-left,
.el-tabs--right .el-tabs__nav-wrap.is-right {
  height: 100px !important;
}

.el-tabs__nav is-left {
  height: 500px;
  width: 300px;
}

.el-tabs__nav-wrap is-left {
  width: 400px;
}

.el-icon-more {
  margin-left: 20px;
  transform: rotate(90deg);
}

.box .el-tabs__item.is-active {

  background-color: #edf5ff !important;
}
</style>
