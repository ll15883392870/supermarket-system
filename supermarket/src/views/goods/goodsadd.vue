<template>
  <div class="goodsadd">
    <!-- 头部 -->
    <Header></Header>
    <!-- 主体 -->
    <el-main>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>添加商品</span>
        </div>
        <div class="text item">
          <!-- 添加账户表单 -->
          <el-form
            :model="addgoodsForm"
            status-icon
            :rules="addgoodsrule"
            ref="addgoodsForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="所属分类" prop="cateName">
              <el-select v-model="addgoodsForm.cateName" placeholder="请选择分类">
                <el-option label="酒水类" value="酒水类"></el-option>
                <el-option label="电子类" value="电子类"></el-option>
                <el-option label="食品类" value="食品类"></el-option>
                <el-option label="生活用品类" value="生活用品类"></el-option>
                <el-option label="水果类" value="水果类"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="条形码" prop="barCode">
              <el-input type="text" v-model="addgoodsForm.barCode" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="商品名称" prop="goodsName">
              <el-input type="text" v-model="addgoodsForm.goodsName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="商品进价" prop="costPrice">
              <el-input type="text" v-model.number="addgoodsForm.costPrice" @blur="autocomplate"></el-input>
            </el-form-item>
            <el-form-item label="商品市场价" prop="marketPrice">
              <el-input type="text" v-model.number="addgoodsForm.marketPrice" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="商品售价" prop="salePrice">
              <el-input type="text" v-model.number="addgoodsForm.salePrice" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goodsNum">
              <el-input type="text" v-model.number="addgoodsForm.goodsNum" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goodsWeight">
              <el-input type="text" v-model.number="addgoodsForm.goodsWeight" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="商品单位" prop="unit">
              <el-select v-model="addgoodsForm.unit" placeholder="请选择单位">
                <el-option label="个" value="个"></el-option>
                <el-option label="斤" value="斤"></el-option>
                <el-option label="袋" value="袋"></el-option>
                <el-option label="瓶" value="瓶"></el-option>
                <el-option label="箱" value="箱"></el-option>
                <el-option label="千克" value="千克"></el-option>
                <el-option label="件" value="件"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否打折">
              <el-radio-group v-model="addgoodsForm.discount">
                <el-radio label="是"></el-radio>
                <el-radio label="否"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="会员优惠">
              <el-radio-group v-model="addgoodsForm.promotion">
                <el-radio label="享受"></el-radio>
                <el-radio label="不享受"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="商品描述">
              <el-input type="textarea" v-model="addgoodsForm.goodsDesc"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('addgoodsForm')">添加</el-button>
              <el-button @click="resetForm('addgoodsForm')">重置</el-button>
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
    return {
      addgoodsForm: {
        cateName: "",
        barCode: "",
        goodsName: "",
        costPrice: "",
        marketPrice: "",
        salePrice: "",
        goodsNum: "",
        goodsWeight: "",
        unit: "",
        discount: "",
        promotion: "",
        goodsDesc: ""
      },
      addgoodsrule: {
        //商品分类
        cateName: [
          { required: true, message: "分类不能为空", trigger: "change" },
          {
            min: 3,
            max: 6,
            message: "长度在3到6个字符之间",
            trigger: "blur"
          }
        ],
        //条形码
        barCode: [
          { required: true, message: "条形码不能为空", trigger: "blur" }
        ],
        //    商品名称
        goodsName: [
          { required: true, message: "商品名称不能为空", trigger: "blur" }
        ],
        //    进价
        costPrice: [
          { required: true, message: "进价不能为空", trigger: "blur" }
        ],
        //   市场价
        marketPrice: [
          { required: true, message: "市场价不能为空", trigger: "blur" }
        ],
        // 售价
        salePrice: [
          { required: true, message: "售价不能为空", trigger: "blur" }
        ],
        //   商品数量
        goodsNum: [
          { required: true, message: "商品数量不能为空", trigger: "blur" }
        ],
        //   商品重量
        goodsWeight: [
          { required: true, message: "商品重量不能为空", trigger: "blur" }
        ],
        //   商品单位
        unit: [
          { required: true, message: "商品单位不能为空", trigger: "change" }
        ],
        // 是否打折
        discount: [
          { required: true, message: "请选择是否打折", trigger: "change" }
        ],
        // 会员优惠
        promotion: [
          { required: true, message: "请选择是否促销", trigger: "change" }
        ],
        //  商品描述
        goodsDesc: [
          { required: true, message: "商品描述不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //自动填充价格
    autocomplate() {
      this.addgoodsForm.marketPrice = this.addgoodsForm.costPrice * 4;
      this.addgoodsForm.salePrice = this.addgoodsForm.costPrice * 3;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //收集添加商品信息
          let parms = {
            cateName: this.addgoodsForm.cateName,
            barCode: this.addgoodsForm.barCode,
            goodsName: this.addgoodsForm.goodsName,
            costPrice: this.addgoodsForm.costPrice,
            marketPrice: this.addgoodsForm.marketPrice,
            salePrice: this.addgoodsForm.salePrice,
            goodsNum: this.addgoodsForm.goodsNum,
            goodsWeight: this.addgoodsForm.goodsWeight,
            unit: this.addgoodsForm.unit,
            discount: this.addgoodsForm.discount,
            promotion: this.addgoodsForm.promotion,
            goodsDesc: this.addgoodsForm.goodsDesc
          };
          this.axios
            .post("http://127.0.0.1:3000/goods/addgoods", qs.stringify(parms), {
              headers: { "Content-Type": "application/x-www-form-urlencoded" }
            })
            .then(Response => {
              //接收后端响应数据
              if (Response.data.Code == 1) {
                this.$message({
                  type: "success",
                  message: Response.data.Msg
                });

                // 跳转页面
                this.$router.push("/goodsmanage");
              } else {
                this.$message.err(`${Response.data.errMsg}`);
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
  },
  components: {
    Header,
    Footer
  }
};
</script>
<style lang="less">
.goodsadd {
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
              margin-top: 20px;
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