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
          <el-button type="primary" @click="register()">注册</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import Store from '@/store/index.js'
export default {
  data() {
    return {
      flag: true,
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

    // 登录
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //收集账号密码
          let userlogin = {
            username: this.loginForm.username,
            password: this.loginForm.password
          };
          // 设置axios允许携带cookie
          this.axios.defaults.withCredentials = true;
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
                this.id=Response.data.id
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
              };
              this.lookusergroup()
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 查询用户是否存在并且注册
    register(flag) {
      let username = this.loginForm.username;
      let password = this.loginForm.password;
      this.axios.get(`http://127.0.0.1:3000/users/lookuser`).then(Response => {
        // Response.data.forEach(item => {
        //   if (item.username == username) {
        //     this.$message.error("用户已存在");
        //     this.loginForm.username = "";
        //     this.loginForm.password = "";
        //     return;
        //   }
        //   return;
        // });

        let nameArr = Response.data.map(v => {
          return v.username;
        });
        for (let i = 0; i < nameArr.length; i++) {
          if (username == nameArr[i]) {
            this.$message.error("用户已存在");
            return;
          }
        }
        this.insert();
      });
    },

    //插入用户名和密码方法
    insert() {
      if (this.loginForm.username == "" || this.loginForm.password == "") {
        return;
      } else {
        let username = this.loginForm.username;
        let password = this.loginForm.password;
        let usergroup="普通用户"
        this.axios
          .get(
            `http://127.0.0.1:3000/users/insertuser?username=${username}&password=${password}&usergroup=${usergroup}`
          )
          .then(Response => {
            if (Response.data.Code == 1) {
              this.$message({
                type: "success",
                message: Response.data.Msg
              });
            } else {
              this.$message.error(Response.data.errMsg);
            }
          });
        this.flag = false;
      }
    },
    // 查看用户组
    lookusergroup(){
      let id=this.id
     this.axios.get(`http://127.0.0.1:3000/users/lookusergroup?id=${id}`).then(Response=>{
       if(Response.data.length>0){
        //将usergroup传给vuex
         Store.commit('changeval',Response.data[0].usergroup)
       }else{
         console.log("设置vuex用户组失败");
       }
     })
    }

  },
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