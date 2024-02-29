<template>
  <div class="box">
    <div class="box1">
      <img src="../../assets/bj.jpg" style="width: 100%;height: 100%;border-radius: 0 60px 0 0;" alt="">
    </div>
    <div class="box2">
      <div class="box3">

        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item>
            <h2>智慧园区-登录</h2>

          </el-form-item>
          <el-form-item>
            <div>账号</div>
            <el-input v-model="form.name" style="width: 300px;"></el-input>
          </el-form-item>
          <el-form-item label-width="80px">
            <div>密码</div>
            <el-input type="password" style="width: 300px;" v-model="form.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-checkbox-group v-model="type1">
            <el-checkbox label="记住我" style="margin-bottom: 40px;width: 300px;margin-left: 80px;"></el-checkbox>
          </el-checkbox-group>
          <el-form-item>
            <el-button style="width: 300px;" type="primary" @click="onSubmit">登录</el-button>

          </el-form-item>

        </el-form>
      </div>

    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      form: {
        // name: '17274817283',//demo
        // pass: '123456' //zh@hm#23
        name: 'gzk',
        pass: '123456'
      },
      type1: false,
      // aaa:localStorage.getItem('form_item')
    }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('user/login', { username: this.form.name, password: this.form.pass }).then(() => {
        if (this.type1 == true) {

          localStorage.setItem('form_item', JSON.stringify(this.form))

        } else {
          localStorage.removeItem('form_item')
        }
        this.$message({
          type: 'success', // success error warning
          message: '登录成功',

        })
        this.$router.push('/')
      })
    }
  },
  created() {
    const form1 = localStorage.getItem('form_item')
    if (form1) {
      const fff = JSON.parse(form1)
      this.form = fff
    }
  }
}
</script>

<style lang="scss">
.box {
  display: flex;
  width: 100%;
  height: 100vh;

  .box1 {
    width: 60%;
    background-color: #fff;
  }

  .box2 {
    width: 40%;
    background-color: #fff;
    // text-align: center;
    margin: auto;

    .box3 {
      width: 100%;
      height: 100%;
      background-color: #fff;
      display: flex;
      justify-content: start;
    }
  }
}
</style>
