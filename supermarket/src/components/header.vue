<template>
  <div class="header">
    <el-header>
      <h1 class="title">
        <i class="el-icon-menu"></i>
        家乐美超市管理系统
      </h1>
      <!-- 当前登陆用户 -->
      <div class="username">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            admin
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <!-- 用户头像 -->
        <div class="avator">11</div>
      </div>
    </el-header>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less">
.header {
  .el-header {
    position: relative;
    height: 60px;
    line-height: 60px;
    text-align: right;
    background-color: #fff;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    .title {
      margin: 0;
      line-height: 60px;
      position: absolute;
    }
    .username {
      height: 60px;
      line-height: 60px;
      display: flex;
      float: right;
      align-items: center;
      .avator {
        background-color: red;
        width: 50px;
        height: 50px;
        line-height: 60px;
        border-radius: 50%;
        text-align: center;
      }
    }
  }
}
</style>