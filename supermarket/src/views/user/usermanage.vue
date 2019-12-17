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
              <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i>修改</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                ><i class="el-icon-delete"></i>删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- <div style="margin-top: 20px">
            <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
            <el-button @click="toggleSelection()">取消选择</el-button>
          </div>-->
        </div>
      </el-card>
    </el-main>
    <!-- 尾部 -->
    <Footer></Footer>
  </div>
</template>
<script>
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";
export default {
  data() {
    return {
      tableData: [
        {
          username: "王小虎",
          date: "2019-05-03",
          usergroup: "超级管理员"
        },
        {
          username: "张晓",
          date: "2019-05-03",
          usergroup: "普通用户"
        }
      ]
    };
  },
  components: {
    Header,
    Footer
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 编辑函数
    handleEdit(index, row) {
      console.log("修改"+index, row);
    },
    //   删除函数
    handleDelete(index, row) {
      console.log("删除"+index, row);
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
      }
      .el-card__body {
        .item {
          .el-alert {
            margin: 10px 0;
          }
        }
      }
    }
  }
}
</style>