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
            {{username}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <span @click="person">个人中心</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <span @click="exitlogin">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <!-- 用户头像 -->
        <div class="avator"></div>
      </div>
    </el-header>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username:'',
    };
  },
  methods: {
    person() {
      this.$router.push("/personal");
    },
    exitlogin() {
      // 设置axios允许携带cookie
      // this.axios.defaults.withCredentials = true;
      this.axios.get("http://127.0.0.1:3000/users/exitlogin").then(Response => {
        if (Response.data.Code == 1) {
          this.$message({
            type: "success",
            message: Response.data.Msg
          });
          setTimeout(() => {
            this.$router.push("/login");
          }, 2000);
        }
      });
    }
  },
  created() {
    //发送请求 获取用户名
    this.axios.get("http://127.0.0.1:3000/users/getusername").then(Response=>{
      this.username=Response.data
    })
  },
};
</script>
<style lang="less">
.header {
  .el-dropdown {
    cursor: pointer;
  }
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
        width: 50px;
        height: 50px;
        line-height: 60px;
        border-radius: 50%;
        text-align: center;
        background-image: url("../assets/head.png");
        background-size: cover;
      }
    }
  }
}
</style>