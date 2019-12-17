<template>
  <div class="useradd">
    <!-- 头部 -->
    <Header></Header>
    <!-- 主体 -->
    <el-main>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>添加账号</span>
        </div>
        <div class="text item">
          <!-- 添加账户表单 -->
          <el-form
            :model="adduserForm"
            status-icon
            :rules="adduserRules"
            ref="adduserForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="账号" prop="username">
              <el-input type="text" v-model="adduserForm.username" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="adduserForm.password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkpw">
              <el-input type="password" v-model="adduserForm.checkpw"></el-input>
            </el-form-item>
            <el-form-item label="活动区域" prop="usergroup">
              <el-select v-model="adduserForm.usergroup" placeholder="请选择活动区域">
                <el-option label="超级管理员" value="超级管理员"></el-option>
                <el-option label="普通管理员" value="普通管理员"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('adduserForm')">添加</el-button>
              <el-button @click="resetForm('adduserForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </el-main>
    <!-- 尾部 -->
    <Footer></Footer>
  </div>
</template>
<script>
// 引入qs库，对axios参数做处理
import qs from "qs";
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";
export default {
  data() {
    //自定义验证密码函数
    var checkpassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.adduserForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      adduserForm: {
        username: "",
        password: "",
        checkpw: "",
        usergroup: ""
      },
      adduserRules: {
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
        ],
        //验证用户组
        usergroup: [
          { required: true, message: "请选择用户组", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //收集账号密码
          let user = {
            username: this.adduserForm.username,
            password: this.adduserForm.password,
            usergroup: this.adduserForm.usergroup
          };

          // console.log(user.username + user.password + user.usergroup);
          // console.log(this.axios);
          this.axios
            .post("/url", qs.stringify(user), {
              "headers": {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .then(Response => {
              console.log(Response);
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
  },
  components: {
    Header,
    Footer
  }
};
</script>
<style lang="less">
.useradd {
  width: 100%;
  display: flex;
  flex-direction: column;

  // 主体
  .el-main {
    flex: 1; //自动增长
    .el-card__body {
      .item {
        .el-form {
          width: 300px;
          .el-form-item {
            .el-form-item__label {
              height: 30px;
              line-height: 30px;
            }
            .el-form-item__content {
              height: 30px;
              line-height: 30px;
              .el-input__inner {
                height: 30px;
                line-height: 30px;
              }
            }
          }
        }
      }
    }
  }
}
</style>