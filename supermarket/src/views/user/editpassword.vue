<template>
  <div class="useradd">
    <!-- 头部 -->
    <Header></Header>
    <!-- 主体 -->
    <el-main>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>修改密码</span>
        </div>
        <div class="text item">
          <!-- 添加账户表单 -->
          <el-form
            :model="editpwForm"
            status-icon
            :rules="editpwRule"
            ref="editpwForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="旧密码" prop="oldpassword">
              <el-input type="text" v-model="editpwForm.oldpassword" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newpassword">
              <el-input type="text" v-model="editpwForm.newpassword" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" prop="surepassword">
              <el-input type="text" v-model="editpwForm.surepassword"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('editpwForm')">修改</el-button>
              <el-button @click="resetForm('editpwForm')">重置</el-button>
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
    //自定义验证旧密码是否正确
    const checkoldpassword = (rule, value, callback) => {
      this.axios
        .get(`http://127.0.0.1:3000/users/checkoldpw?oldpwd=${value}`)
        .then(Response => {
          if (Response.data.Code == 1) {
            callback(); //调用直接通过
          } else {
            callback(new Error(Response.data.errMsg));
          }
        });
    };

    //自定义验证密码函数
    var checkpassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.editpwForm.newpassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      editpwForm: {
        oldpassword: "",
        newpassword: "",
        surepassword: ""
      },
      editpwRule: {
        //旧密码
        oldpassword: [
          { required: true, message: "请输入旧密码", trigger: "blur" },
          { validator: checkoldpassword, trigger: "blur" }
        ],
        //新密码
        newpassword: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { min: 3, max: 12, message: "长度在3到12个字符之间", trigger: "blur" }
        ],
        //验证新密码--自定义验证规则
        surepassword: [
          { required: true, message: "请再次输入新密码", trigger: "blur" },
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
          this.axios
            .get(
              `http://127.0.0.1:3000/users/updateoldpwd?newpwd=${this.editpwForm.newpassword}`
            )
            .then(Response => {
              if (Response.data.Code == 1) {
                this.$message({
                  type: "success",
                  message: Response.data.Msg
                });
                setTimeout(() => {
                  this.$router.push("/login");
                }, 1500);
              } else {
                this.$message.error(Response.data.errMsg);
              }
            });
        } else {
          console.log("submit err");
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