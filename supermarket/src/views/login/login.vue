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
        <el-form-item label="确认密码" prop="checkpw">
          <el-input type="password" v-model="loginForm.checkpw"></el-input>
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
export default {
  data() {
    //自定义验证密码函数
    var checkpassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.loginForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      loginForm: {
        username: "",
        password: "",
        checkpw: ""
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
        ],
        //验证密码--自定义验证规则
        checkpw: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          {
            min: 3,
            max: 12,
            message: "长度在3到12个字符之间",
            trigger: "blur"
          },
          { validator: checkpassword, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //收集账号密码
          let username = this.loginForm.username;
          let password = this.loginForm.password;

          //路由跳转
          this.$router.push('/')

          alert("登录成功!");
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
    height: 350px;
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