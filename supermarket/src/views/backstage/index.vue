<template>
  <div class="index">
    <el-container>
      <!-- 左侧 -->
      <Navmenu></Navmenu>
      <!-- 右侧 -->
      <el-container>
        <router-view></router-view>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Navmenu from '../../components/nav.vue'
export default {
    components:{
        Navmenu
    }
};
</script>

<style lang="less">
.index {
  height: 100%;
  //   总体
  .el-container {
    height: 100%;
  }
}
</style>
</style>