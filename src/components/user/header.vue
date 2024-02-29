<template>
  <div style="width: 100%;display: flex;justify-content: space-between;align-items: center;background-color: #fff;">
    <el-page-header style="height: 100px;line-height: 100px;" @back="$router.go(-1)" :content="content">
    </el-page-header>

    <div>
      黑马管理员

    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    content: {
      type: String,
      default: ''
    }
  }
};
</script>
<style lang="scss" scoped></style>
