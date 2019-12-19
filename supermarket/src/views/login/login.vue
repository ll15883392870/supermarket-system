<template>
  <div class="login">
    <div class="login-form">
      <!-- 登陆表单 -->
      <h1 class="title">
        <i class="el-icon-info"></i>
        家乐美超市系统登录
      </h1>
      <el-form
        :model="loginForm"
        status-icon
        :rules="loginRules"
        ref="loginForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="username">
          <el-input type="text" v-model="loginForm.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        //用户名
        username: [
          { required: true, message: "请输入账户名", trigger: "blur" },
          { min: 3, max: 12, message: "长度在3到12个字符之间", trigger: "blur" }
        ],
        //密码
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 12, message: "长度在3到12个字符之间", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //收集账号密码
          let userlogin = {
            username: this.loginForm.username,
            password: this.loginForm.password
          };
          // 设置axios允许携带cookie
          this.axios.defaults.withCredentials=true;
          this.axios
            .post(
              "http://127.0.0.1:3000/users/checklogin",
              qs.stringify(userlogin),
              {
                headers: { "Content-type": "application/x-www-form-urlencoded" }
              }
            )
            .then(Response => {
              if (Response.data.errCode == 1) {
                this.$message({
                  type: "success",
                  message: Response.data.Msg
                });
                //路由跳转
                setTimeout(() => {
                  this.$router.push("/");
                }, 1500);
              } else {
                this.$message.error(`${Response.data.errMsg}`);
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="less">
.login {
  background-color: #29313d;
  height: 100%;
  .login-form {
    width: 500px;
    height: 300px;
    position: fixed;
    padding-right: 40px;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    border-radius: 10px;
    background-color: rgba(42, 142, 155, 0.9);
    .title {
      text-align: center;
      color: #fff;
      font-size: 20px;
      margin-bottom: 25px;
    }
    .el-form-item__label {
      color: #fff;
    }
  }
}
</style>