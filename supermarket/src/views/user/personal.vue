<template>
  <div class="personal">
    <Header></Header>
    <div class="main">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>个人用户</span>
        </div>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-upload action="#" list-type="picture-card" :auto-upload="false">
                <i slot="default" class="el-icon-plus"></i>
                <div slot="file" slot-scope="{file}">
                  <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
                  <span class="el-upload-list__item-actions">
                    <span
                      class="el-upload-list__item-preview"
                      @click="handlePictureCardPreview(file)"
                    >
                      <i class="el-icon-zoom-in"></i>
                    </span>
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleDownload(file)"
                    >
                      <i class="el-icon-download"></i>
                    </span>
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleRemove(file)"
                    >
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
                </div>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt />
              </el-dialog>
             
              <input type="button" value="上传头像">
            </div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple">
              <span>用户名：{{userlist.username}}</span>
              <br />
              <br />
              <span>用户id:{{userlist.id}}</span>
              <br />
              <br />
              <span>用户类型：{{userlist.usergroup}}</span>
              <br />
              <br />
              <span>创建时间：{{userlist.date|dataFormat}}</span>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </div>

    <Footer></Footer>
  </div>
</template>
<script>
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: true,
      userlist: {
        username: "",
        id: "",
        usergroup: "",
        date: ""
      }
    };
  },
  methods: {
    getuserinformation() {
      this.axios
        .get("http://127.0.0.1:3000/users/getinformation")
        .then(Response => {
          console.log(Response.data[0]);
          if (Response.data.length > 0) {
            this.userlist = Response.data[0];
          }
        });
    },

    //图片上传相关
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    }
  },
  created() {
    this.getuserinformation();
  },
  components: {
    Header,
    Footer
  }
};
</script>
<style lang="less">
.personal {
  width: 100%;
  display: flex;
  flex-direction: column;
  .main {
    flex: 1;
    .clearfix {
      span {
        font-size: 18px;
        font-weight: bold;
      }
    }

    .box-card {
      width: 100%;
      .el-row {
        .el-col {
          border-radius: 10px;
        }
        .bg-purple {
          background: #d3dce6;
          span {
            margin: 30px;
            text-align: center;
            line-height: 40px;
          }
        }
        .grid-content {
          border-radius: 4px;
          min-height: 236px;
        }
      }
    }
  }
}
</style>