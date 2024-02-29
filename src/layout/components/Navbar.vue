<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
    <div class="right-menu">
      <button style="margin-right: 20px;" class="bo">可视化大屏</button>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <b>{{ name }}</b>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">


          <el-dropdown-item @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span style="display:block;" @click="dialogVisible = true">修改密码</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dialog title="修改密码" :visible.sync="dialogVisible" width="30%">

        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="旧密码">
            <el-input v-model="form.oldpass"></el-input>
          </el-form-item>


          <el-form-item label="新密码">
            <el-input v-model="form.newpass"></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input v-model="form.newpass1"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
            <el-button @click="qx">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { getinfo, uplogin } from '@/api/user'
export default {
  components: {
    Breadcrumb,
    Hamburger,

  },
  data() {
    return {
      dialogVisible: false,
      form: {
        oldpass: '',
        newpass: '',
        newpass1: ''
      },

    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push('/login');
    },
    async onSubmit(form) {
      if (this.form.newpass == this.form.newpass1) {
        const res = await uplogin({ oldPassword: this.form.oldpass, newPassword: this.form.newpass })
        console.log(res);
        this.dialogVisible = false
        this.$refs[form].resetFields();
        await this.$store.dispatch("user/logout");
        this.$router.push('/login')
      }
      this.dialogVisible = false
      this.$refs[form].resetFields();
      alert("两次密码不一致")
    },
    qx() {
      this.dialogVisible = false
    },
    // async aaa() {
    //   const res = await getinfo()
    //   console.log(res);
    //   this.name = res.data.data.name
    // }
  },
  created() {

  }
}
</script>

<style lang="scss" scoped>
.bo {
  border-radius: 5px;
  border: 1px solid #4971ff;
  color: #4971ff;
  background-color: #f4f6f8;
  padding: 7px 13px;
}

.navbar {

  height: 70%;
  overflow: hidden;
  position: relative;
  background: #f4f6f8;

  // box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
