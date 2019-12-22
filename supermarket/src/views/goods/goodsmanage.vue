<template>
  <div class="usermanage">
    <!-- 头部 -->
    <Header></Header>
    <!-- 主体 -->
    <el-main>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>商品管理</span>
        </div>
        <div>
          <el-form :inline="true" :model="SearchForm" class="demo-form-inline">
            <el-form-item label="所属分类">
              <el-select v-model="SearchForm.cateName" placeholder="活动区域">
                <el-option label="全部" value="全部"></el-option>
                <el-option label="酒水类" value="酒水类"></el-option>
                <el-option label="电子类" value="电子类"></el-option>
                <el-option label="食品类" value="食品类"></el-option>
                <el-option label="生活用品类" value="生活用品类"></el-option>
                <el-option label="水果类" value="水果类"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="关键字">
              <el-input v-model="SearchForm.keyword" placeholder="商品名称或条形码"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="search">查询</el-button>
            </el-form-item>
          </el-form>
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
            <el-table-column prop="barCode" label="商品条形码"></el-table-column>
            <el-table-column prop="goodsName" label="商品名称"></el-table-column>
            <el-table-column prop="cateName" label="所属分类"></el-table-column>
            <el-table-column prop="salePrice" label="售价"></el-table-column>
            <el-table-column prop="discount" label="是否促销"></el-table-column>

            <el-table-column label="创建时间">
              <template slot-scope="scope">{{ scope.row.ctime|dataFormat }}</template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="handleEdit( scope.row.id)">
                  <i class="el-icon-edit"></i>
                </el-button>
                <el-button size="mini" type="danger" @click="handleDelete( scope.row.id)">
                  <i class="el-icon-delete"></i>
                </el-button>
              </template>
            </el-table-column>
          </el-table>

          <!-- 弹出修改框 -->
          <el-dialog title="修改商品信息" :visible.sync="dialogFormVisible" width="40%">
            <el-form
              :model="editgoodsForm"
              status-icon
              :rules="editrules"
              ref="editgoodsForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="所属分类" prop="cateName">
                <el-select v-model="editgoodsForm.cateName" placeholder="请选择分类">
                  <el-option label="酒水类" value="酒水类"></el-option>
                  <el-option label="电子类" value="电子类"></el-option>
                  <el-option label="食品类" value="食品类"></el-option>
                  <el-option label="生活用品类" value="生活用品类"></el-option>
                  <el-option label="水果类" value="水果类"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="条形码" prop="barCode">
                <el-input type="text" v-model="editgoodsForm.barCode" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="商品名称" prop="goodsName">
                <el-input type="text" v-model="editgoodsForm.goodsName" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="商品进价" prop="costPrice">
                <el-input type="text" v-model.number="editgoodsForm.costPrice"></el-input>
              </el-form-item>
              <el-form-item label="商品市场价" prop="marketPrice">
                <el-input
                  type="text"
                  v-model.number="editgoodsForm.marketPrice"
                  auto-complete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="商品售价" prop="salePrice">
                <el-input type="text" v-model.number="editgoodsForm.salePrice" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="商品数量" prop="goodsNum">
                <el-input type="text" v-model.number="editgoodsForm.goodsNum" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="商品重量" prop="goodsWeight">
                <el-input
                  type="text"
                  v-model.number="editgoodsForm.goodsWeight"
                  auto-complete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="商品单位" prop="unit">
                <el-select v-model="editgoodsForm.unit" placeholder="请选择单位">
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
                <el-radio-group v-model="editgoodsForm.discount">
                  <el-radio label="是"></el-radio>
                  <el-radio label="否"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="会员优惠">
                <el-radio-group v-model="editgoodsForm.promotion">
                  <el-radio label="享受"></el-radio>
                  <el-radio label="不享受"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="商品描述">
                <el-input type="textarea" v-model="editgoodsForm.goodsDesc"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="submitForm('editgoodsForm')">确 定</el-button>
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
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";
export default {
  data() {
    return {
      SearchForm: {
        cateName: "",
        keyword: ""
      }, // 查询表单
      pageSize: 3, //默认每页显示条数
      currentPage: 1, //当前页
      totalcount: 10, //数据总条数
      selectedgoods: [], //保存选择用户
      dialogFormVisible: false,
      editid: "",
      id: "",
      tableData: [
        {
          cateName: "",
          barCode: "",
          goodsName: "",
          salePrice: "",
          discount: "",
          ctime: ""
        }
      ],
      editgoodsForm: {
        //修改商品数据
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
      editrules: {
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
  components: {
    Header,
    Footer
  },
  created() {
    this.getgoodslist();
  },
  methods: {
    //每页显示多少条改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.getgoodslist();
      console.log(`每页 ${val} 条`);
    },
    //当前页（即页码数改变）
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getgoodslist();
      console.log(`当前页: ${val}`);
    },

    toggleSelection() {
      //取消选择
      this.$refs.multipleTable.clearSelection();
    },
    // 选择状态改变函数
    handleSelectionChange(val) {
      this.selectedgoods = val;
    },
    // 修改函数
    handleEdit(id) {
      this.id = id;
      this.axios
        .get(`http://127.0.0.1:3000/goods/editgoods?id=${id}`)
        .then(Response => {
          this.editgoodsForm.cateName = Response.data[0].cateName;
          this.editgoodsForm.barCode = Response.data[0].barCode;
          this.editgoodsForm.goodsName = Response.data[0].goodsName;
          this.editgoodsForm.costPrice = Response.data[0].costPrice;
          this.editgoodsForm.marketPrice = Response.data[0].marketPrice;
          this.editgoodsForm.salePrice = Response.data[0].salePrice;
          this.editgoodsForm.goodsNum = Response.data[0].goodsNum;
          this.editgoodsForm.goodsWeight = Response.data[0].goodsWeight;
          this.editgoodsForm.unit = Response.data[0].unit;
          this.editgoodsForm.discount = Response.data[0].discount;
          this.editgoodsForm.promotion = Response.data[0].promotion;
          this.editgoodsForm.goodsDesc = Response.data[0].goodsDesc;
          this.dialogFormVisible = true;
        });
    },
    //   删除函数
    handleDelete(id) {
      this.axios
        .get(`http://127.0.0.1:3000/goods/delegoods?id=${id}`)
        .then(Response => {
          //接收后端响应数据
          if (Response.data.Code == 1) {
            this.$message({
              type: "success",
              message: Response.data.Msg
            });
          } else {
            this.$message.err(`${Response.data.errMsg}`);
          }
        });
      this.getgoodslist();
    },
    // 获取商品分页数据
    getgoodslist() {
      // 当前页码
      let currentPage = this.currentPage;
      //每页显示多少条
      let pageSize = this.pageSize;
      // 把查询参数加入
      let cateName = this.SearchForm.cateName;
      let keyword = this.SearchForm.keyword;
      this.axios
        .get(
          `http://127.0.0.1:3000/goods/getgoodslist?pageSize=${pageSize}&currentPage=${currentPage}&cateName=${cateName}&keyword=${keyword}`
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
    submitForm(editgoodsForm) {
      this.$refs[editgoodsForm].validate(valid => {
        if (valid) {
          // 收集新数据
          let data = {
            cateName: this.editgoodsForm.cateName,
            barCode: this.editgoodsForm.barCode,
            goodsName: this.editgoodsForm.goodsName,
            costPrice: this.editgoodsForm.costPrice,
            marketPrice: this.editgoodsForm.marketPrice,
            salePrice: this.editgoodsForm.salePrice,
            goodsNum: this.editgoodsForm.goodsNum,
            goodsWeight: this.editgoodsForm.goodsWeight,
            unit: this.editgoodsForm.unit,
            discount: this.editgoodsForm.discount,
            promotion: this.editgoodsForm.promotion,
            goodsDesc: this.editgoodsForm.goodsDesc,
            editid: this.id
          };
          this.axios
            .post("http://127.0.0.1:3000/goods/saveedit", qs.stringify(data), {
              Header: { "Content-Type": "application/x-www-form-urlencoded" }
            })
            .then(Response => {
              if (Response.data.Code == 1) {
                this.$message({
                  type: "success",
                  message: Response.data.Msg
                });
              } else {
                this.$message.err(`${Response.data.errMsg}`);
              }
            });
          this.getgoodslist();
          this.dialogFormVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 删除勾选
    deleteall() {
      let idArr = this.selectedgoods.map(value => {
        return value.id;
      });

      // 判断数据
      if (!idArr.length) {
        this.$message.error(`请选择再操作`);
        return;
      }
      let params = { idArr: JSON.stringify(idArr) };
      this.axios
        .post(
          "http://127.0.0.1:3000/goods/detelegoodsall",
          qs.stringify(params),
          {
            Header: { "Content-Type": "application/x-www-form-urlencoded" }
          }
        )
        .then(Response => {
          if (Response.data.Code == 1) {
            this.$message({
              type: "success",
              message: Response.data.Msg
            });
            this.getgoodslist();
          } else {
            this.$message.err(`${Response.data.errMsg}`);
          }
        });
    },
    // 查询函数
    search() {
      // let cateName=this.SearchForm.cateName;
      // let keyword=this.SearchForm.keyword;
      // this.axios.get(`http://127.0.0.1:3000/goods/search?cateName=${cateName}&keyword=${keyword}`).then(Response=>{
      // this.tableData=Response.data
      // })
      this.getgoodslist();
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