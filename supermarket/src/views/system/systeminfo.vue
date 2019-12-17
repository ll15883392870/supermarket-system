<template>
  <div class="systeminfo">
    <!-- 头部 -->
    <Header></Header>
    <!-- 主体 -->
    <el-main>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>系统信息</span>
        </div>
        <div class="text item">
          <el-alert title="成功提示的文案" type="success"></el-alert>
          <el-alert title="消息提示的文案" type="info"></el-alert>

          <el-row :gutter="20">
            <el-col :span="12">
              <!-- 左侧表格 -->
              <el-card>
                <div slot="header" class="clearfix">
                  <span>销售排行</span>
                </div>
                <div class="text item">
                  <el-table :data="tableDataLeft" style="width: 100%">
                    <el-table-column prop="goodsname" label="商品名称"></el-table-column>
                    <el-table-column prop="sales" label="销量"></el-table-column>
                  </el-table>
                </div>
              </el-card>
            </el-col>
            <el-col :span="12">
              <!-- 右侧表格 -->
              <el-card>
                <div slot="header" class="clearfix">
                  <span>缺货的商品</span>
                </div>
                <div class="text item">
                  <el-table :data="tableDataRight" style="width: 100%">
                    <el-table-column prop="goodsname" label="商品名称"></el-table-column>
                    <el-table-column prop="repertoryCount" label="库存"></el-table-column>
                    <el-table-column label="操作" prop="option"></el-table-column>
                  </el-table>
                </div>
              </el-card>
            </el-col>
          </el-row>
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
      // 左侧表格数据
      tableDataLeft: [
        {
          goodsname: "海飞丝",
          sales: 100
        },
        {
          goodsname: "康王",
          sales: 80
        }
      ],
      // 右侧表格数据
      tableDataRight: [
        {
          goodsname: "海飞丝",
          repertoryCount: 10,
          option: "入库"
        },
        {
          goodsname: "康王",
          repertoryCount: 20,
          option: "入库"
        }
      ]
    };
  },
  components: {
    Header,
    Footer
  }
};
</script>
<style lang="less">
.systeminfo {
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