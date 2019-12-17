<template>
  <el-aside width="200px">
    <el-menu
      :default-active="$route.path"
      :unique-opened="true"
      active-text-color="rgb(65,160,255)"
      background-color="#2d3c4d" router
    >
      <el-submenu index="0">
        <template slot="title">
          <i class="el-icon-menu"></i>系统管理
        </template>
        <el-menu-item index="/">
          <i class="el-icon-s-grid"></i>
          系统信息
        </el-menu-item>
      </el-submenu>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-message"></i>账号管理
        </template>
        <el-menu-item index="/usermanage">账号管理</el-menu-item>
        <el-menu-item index="/useradd">添加账号</el-menu-item>
        <el-menu-item index="/editpassword">密码修改</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-menu"></i>商品管理
        </template>
        <el-menu-item index="/goodsmanage">商品管理</el-menu-item>
        <el-menu-item index="/goodsadd">添加商品</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-setting"></i>统计管理
        </template>
        <el-menu-item index="/salescharts">销售统计</el-menu-item>
        <el-menu-item index="/stockcharts">进货统计</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>
<script>
export default {};
</script>
<style lang="less">
// 左侧
    .el-aside {
      background-color: #2d3a4d;
      color: #333;
      .el-menu {
        border: none;
        .el-submenu__title {
          color: #fff;
        }
        .el-menu-item {
          color: #fff;
        }
      }
    }
</style>