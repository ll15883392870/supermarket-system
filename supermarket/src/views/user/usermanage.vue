<template>
  <div class="usermanage">
    <!-- 头部 -->
    <Header></Header>
    <!-- 主体 -->
    <el-main>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>账号管理</span>
        </div>
        <div class="text item">
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="username" label="用户名称"></el-table-column>
            <el-table-column prop="usergroup" label="用户组"></el-table-column>

            <el-table-column label="创建时间">
              <template slot-scope="scope">{{ scope.row.date|dataFormat }}</template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="handleEdit( scope.row.id)">
                  <i class="el-icon-edit"></i>修改
                </el-button>
                <el-button size="mini" type="danger" @click="handleDelete( scope.row.id)">
                  <i class="el-icon-delete"></i>删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>

          <!-- 弹出修改框 -->
          <el-dialog title="修改用户" :visible.sync="dialogFormVisible" width="40%">
            <el-form
              :model="editForm"
              status-icon
              :rules="editrules"
              ref="editForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="账号" prop="username">
                <el-input type="text" v-model="editForm.username" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input type="text" v-model="editForm.password" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="活动区域" prop="usergroup">
                <el-select v-model="editForm.usergroup" placeholder="请选择活动区域">
                  <el-option label="超级管理员" value="超级管理员"></el-option>
                  <el-option label="普通用户" value="普通用户"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="submitForm('editForm')">确 定</el-button>
            </div>
          </el-dialog>

          <!-- 分页 -->
          <div style="margin-top: 20px;text-align: center;">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[1,2,3,4,5,20, 25]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalcount"
            ></el-pagination>
          </div>

          <!-- 删除勾选 -->
          <div style="margin-top: 20px">
            <el-button type="danger" @click="deleteall()">删除勾选</el-button>
            <el-button @click="toggleSelection()">取消选择</el-button>
          </div>
        </div>
      </el-card>
    </el-main>
    <!-- 尾部 -->
    <Footer></Footer>
  </div>
</template>
<script>
import qs from "qs";
import Store from "@/store/index.js";
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";
export default {
  data() {
    return {
      pageSize: 3, //默认每页显示条数
      currentPage: 1, //当前页
      totalcount: 10, //数据总条数
      selecteduser: [], //保存选择用户
      dialogFormVisible: false,
      editid: "",
      tableData: [
        {
          username: "",
          password: "",
          usergroup: "",
          date: ""
        }
      ],
      editForm: {
        //修改账户数据
        username: "",
        password: "",
        usergroup: ""
      },
      editrules: {
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
        //验证用户组
        usergroup: [
          { required: true, message: "请选择用户组", trigger: "change" }
        ]
      }
    };
  },
  components: {
    Header,
    Footer
  },
  created() {
    this.getuserlist();
    // console.log(Store.state.usergroup);
    // for (let line in document.cookie.split(";")) {
    //   var value = line.split("=", 8)
    // }

    // console.log(value);
 
  },
  methods: {
    //每页显示多少条改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.getuserlist();
      console.log(`每页 ${val} 条`);
    },
    //当前页（即页码数改变）
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getuserlist();
      console.log(`当前页: ${val}`);
    },

    toggleSelection() {
      //取消选择
      this.$refs.multipleTable.clearSelection();
    },
    // 选择状态改变函数
    handleSelectionChange(val) {
      this.selecteduser = val;
    },
    // 修改函数
    handleEdit(id) {
      this.editid = id;
      this.axios
        .get(`http://127.0.0.1:3000/users/edituser?id=${id}`)
        .then(Response => {
          this.editForm.username = Response.data[0].username;
          this.editForm.password = Response.data[0].password;
          this.editForm.usergroup = Response.data[0].usergroup;
          this.dialogFormVisible = true;
        });
    },
    //   删除函数
    handleDelete(id) {
      if (Store.state.usergroup == "超级管理员") {
        this.axios
          .get(`http://127.0.0.1:3000/users/deleuser?id=${id}`)
          .then(Response => {
            //接收后端响应数据
            if (Response.data.errCode == 1) {
              this.$message({
                type: "success",
                message: Response.data.errMsg
              });
            } else {
              this.$message.err(`${Response.data.errMsg}`);
            }
          });
        this.getuserlist();
      } else {
        this.$message.error(`对不起您的权限不够`);
        return;
      }
    },
    // 利用分页获取所有数据
    getuserlist() {
      // 当前页码
      let currentPage = this.currentPage;
      //每页显示多少条
      let pageSize = this.pageSize;
      this.axios
        .get(
          `http://127.0.0.1:3000/users/userslist?pageSize=${pageSize}&currentPage=${currentPage}`
        )
        .then(Response => {
          if (!Response.data.data.length && this.currentPage != 1) {
            this.currentPage -= 1;
            this.getuserlist();
          } else {
            this.tableData = Response.data.data;
            this.totalcount = Response.data.totalcount;
          }
        });
    },
    // 修改表单提交函数
    submitForm(editForm) {
      this.$refs[editForm].validate(valid => {
        if (valid) {
          // 收集新数据
          let data = {
            username: this.editForm.username,
            password: this.editForm.password,
            usergroup: this.editForm.usergroup,
            editid: this.editid
          };

          this.axios
            .post("http://127.0.0.1:3000/users/saveedit", qs.stringify(data), {
              Header: { "Content-Type": "application/x-www-form-urlencoded" }
            })
            .then(Response => {
              if (Response.data.errCode == 1) {
                this.$message({
                  type: "success",
                  message: Response.data.errMsg
                });
              } else {
                this.$message.err(`${Response.data.errMsg}`);
              }
            });
          this.getuserlist();
          this.dialogFormVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 删除勾选
    deleteall() {
      if (Store.state.usergroup == "超级管理员") {
        let idArr = this.selecteduser.map(value => {
          return value.id;
        });

        // 判断数据
        if (!idArr.length) {
          this.$message.error(`请选择再操作`);
          return;
        }
        let params = { idArr: JSON.stringify(idArr) };
        this.axios
          .post("http://127.0.0.1:3000/users/deteleall", qs.stringify(params), {
            Header: { "Content-Type": "application/x-www-form-urlencoded" }
          })
          .then(Response => {
            if (Response.data.errCode == 1) {
              this.$message({
                type: "success",
                message: Response.data.errMsg
              });
              this.getuserlist();
            } else {
              this.$message.err(`${Response.data.errMsg}`);
            }
          });
      } else {
        this.$message.error(`对不起您的权限不够`);
        return;
      }
    }
  }
};
</script>
<style lang="less">
.usermanage {
  width: 100%;
  display: flex;
  flex-direction: column;

  // 主体
  .el-main {
    flex: 1; //自动增长
    .el-card {
      .el-card__header {
        font-weight: 700;
        font-size: 15px;
      }
      .el-card__body {
        .item {
          .el-alert {
            margin: 10px 0;
          }
        }
        .el-dialog {
          .el-dialog__header {
            font-weight: 700;
          }
          .el-dialog__body {
            .el-form {
              width: 75%;
            }
          }
        }
      }
    }
  }
}
</style>