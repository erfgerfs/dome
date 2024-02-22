<template>
  <div>
    <div style="width: 600px;justify-content: space-between;align-items: center;margin: 20px 0;">
      企业名称：<el-input v-model="input" placeholder="请输入企业名称" style="width: 250px;"></el-input>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </div>
    <el-button type="primary" @click="go">添加企业</el-button>
    <div>
      <template>


        <el-table :data="list" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" @click.native="ppp(props.row.id)" class="demo-table-expand">

                <el-table :data="list1" style="width: 100%">
                  <el-table-column prop="buildingName" label="租聘楼宇" width="180">
                  </el-table-column>
                  <el-table-column prop=startTime,endTime label="租聘起止时间" width="180">
                  </el-table-column>
                  <el-table-column prop=status label="合同状态" width="180">
                    <template v-slot="scope">
                      <button v-show="scope.row.status == 0" style="background-color: orange;">待生效</button>
                      <button v-show="scope.row.status == 1" style="background-color: darkcyan;">生效中</button>
                      <button v-show="scope.row.status == 2" style="background-color: chartreuse;">已到期</button>
                      <button v-show="scope.row.status == 3" style="background-color: khaki;">已退租</button>
                    </template>
                  </el-table-column>
                  <el-table-column prop=status label="操作" width="180">
                    <template v-slot="scope">
                      <span>续租</span>
                      <span>退租</span>
                      <span>删除</span>
                    </template>
                  </el-table-column>

                </el-table>

              </el-form>
            </template>
          </el-table-column>
          <el-table-column type="index" label="序号" width="50">
          </el-table-column>
          <el-table-column prop="name" label="企业名称" width="200">
          </el-table-column>
          <el-table-column prop="contact" label="联系人">
          </el-table-column>
          <el-table-column prop="contactNumber" label="电话">
          </el-table-column>


          <el-table-column label="操作">
            <template v-slot="scope">
              <a style="margin:0 5px;color: #7094ff;" href="#">添加合同</a>
              <a style="margin:0 5px;color: #7094ff;" href="#" @click="ck(scope.row.id)">查看</a>
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


  </div>
</template>

<script>
import { qyApi, qydelApi, qyaddApi, qyzyApi } from '@/api/user'
export default {
  name: "billing",
  data() {
    return {
      list1: [],
      page: 1,
      pageSize: 10,
      list: [],
      input: '',
      total1: '',
      name: '',
      rules: {
        name: [
          { required: true, message: '请输入楼宇名称', trigger: 'blur' },
          { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
        ],
        contact: [
          { required: true, message: '请输入层数名称', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        contactNumber: [
          { required: true, message: '请输入在管面积', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],

      }
    }

  },
  methods: {
    async ppp(id) {
      const res = await qyzyApi(id)
      console.log(res);
      // console.log(id);
      this.list1 = res.data.data
    },
    ck(id) {
      this.$router.push({ path: '/detail', query: { id: id } })
    },
    bj(id) {
      this.$router.push({ path: '/bj', query: { id: id } })
    },
    go() {
      this.$router.push({ path: '/add' })
    },
    async add() {
      const res = await qyApi({ page: this.page, pageSize: this.pageSize, name: this.name })
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
        const res = await qydelApi(id)
        console.log(res);
        this.$message({
          message: '恭喜你,删除成功',
          type: 'success'
        });
        this.add()
      }
    },

  },
  created() {
    this.add()
  }
};


</script>

<style lang='scss' scoped></style>
