<template>
  <div class="salescharts">
    <!-- 头部 -->
    <Header></Header>
    <!-- 主体 -->
    <el-main>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>销售统计</span>
        </div>
        <div class="text item">
          <div id="saleCharts" style="width: 600px;height:400px;"></div>
        </div>
      </el-card>
    </el-main>
    <!-- 尾部 -->
    <Footer></Footer>
  </div>
</template>
<script>
// 引入qs库，对axios参数做处理
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";
import echarts from "echarts";
export default {
  data() {},
  methods: {},
  components: {
    Header,
    Footer
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("saleCharts"));

    // 指定图表的配置项和数据
    var option = {
      title: {
        text: "2019年销售统计"
      },
      tooltip: {},
      legend: {
        data: ["销量"]
      },
      toolbox: {
        show: true,
        feature: {
          dataZoom: {
            yAxisIndex: "none"
          },
          dataView: { readOnly: false },
          magicType: { type: ["line", "bar"] },
          restore: {},
          saveAsImage: {}
        }
      },
      xAxis: {
        data: [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月"
        ]
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [
            10000,
            13000,
            16000,
            15600,
            17800,
            13200,
            15900,
            17230,
            14692,
            16852,
            14863,
            12386
          ]
        }
      ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }
};
</script>
<style lang="less">
.salescharts {
  width: 100%;
  display: flex;
  flex-direction: column;
  // 主体
  .el-main {
    flex: 1; //自动增长
  }
}
</style>