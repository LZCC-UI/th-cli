<template>
  <div>
    <h4>新建区域</h4>
    <section class="formBlock">
      <el-form ref="form" :model="areaForm" :rules="rules" label-width="120px">
        <el-form-item label="区域名称:" prop="areaName">
          <el-input
            placeholder="请输入区域名称"
            v-model="areaForm.areaName"
            :maxlength="20"
          ></el-input>
        </el-form-item>
        <li class="markTip">（最多可输入20个汉字）</li>
        <el-form-item label="英文缩写:" prop="areaNameEn">
          <el-input
            placeholder="请输入英文缩写"
            v-model="areaForm.areaNameEn"
            :maxlength="50"
          ></el-input>
        </el-form-item>
        <li class="markTip">（最多可输入50个字符）</li>
        <el-form-item label="区域简介:" prop="areaIntroduction">
          <el-input
            v-model="areaForm.areaIntroduction"
            type="textarea"
            :maxlength="400"
            :autosize="{ minRows: 8, maxRows: 10 }"
            placeholder="请输入区域简介"
          ></el-input>
        </el-form-item>
        <li class="markTip">（最多可输入400字）</li>
        <el-form-item label="区域背景图片:">
          <singleImgUpload
            v-model="areaForm.areaBackgroundImg"
          ></singleImgUpload>
          <i class="markTip">(图片需大于150*150像素，文件小于1M)</i>
        </el-form-item>
      </el-form>
    </section>

    <p>下辖学校</p>
    <section class="schoolList">
      <el-button type="primary" @click="getSchoolList(-1)">添加学校</el-button>
      <el-table :data="areaForm.areaSchoolList" border>
        <el-table-column label="序号" align="center">
          <template slot-scope="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column label="学校名称" align="center">
          <template slot-scope="scope">{{ scope.row.schoolName }}</template>
        </el-table-column>
        <el-table-column label="英文缩写" align="center">
          <template slot-scope="scope">{{ scope.row.schoolNameEn }}</template>
        </el-table-column>
        <el-table-column label="背景图片" align="center">
          <template slot-scope="scope">
            <div v-if="!scope.row.schoolBackgroundImg" class="imgStyle"></div>
            <img
              v-else
              class="imgStyle"
              :src="scope.row.schoolBackgroundImg"
              alt=""
            />
          </template>
        </el-table-column>
        <el-table-column label="学校校徽" align="center">
          <template slot-scope="scope">
            <img class="imgStyle" :src="scope.row.schoolBadge" alt="" />
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="removeSchoolItem(scope.$index)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <div class="footer">
      <el-button type="primary" @click="commit">
        {{ $route.params.id ? '保存' : '创建' }}
      </el-button>
      <el-button type="info" @click="cancel">取消</el-button>
    </div>
    <el-dialog :visible.sync="schoolDia" align="center" width="900px">
      <section class="_inline">
        <el-input
          v-model="schoolDiaData.searchParam"
          placeholder="请输入想要搜索的学校"
          clearable
          @keyup.enter.native="getAreaSelectSchool(0)"
        ></el-input>
        <el-button type="primary" @click="getSchoolList(0)">搜索</el-button>
      </section>
      <el-table
        :data="schoolDiaData.schoolList"
        border
        :empty-text="'未搜索到相关学校信息'"
        ref="multipleTable"
        style="height: 500px; overflow-y: scroll"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          label="选择"
          type="selection"
          width="55"
          prop="id"
          align="center"
        ></el-table-column>
        <el-table-column
          label="学校名称"
          prop="schoolName"
          align="center"
        ></el-table-column>
        <el-table-column
          label="英文缩写"
          prop="schoolNameEn"
          align="center"
        ></el-table-column>
        <el-table-column label="背景图片" align="center">
          <template slot-scope="scope">
            <div v-if="!scope.row.schoolBackgroundImg" class="imgStyle"></div>
            <img
              v-else
              class="imgStyle"
              :src="scope.row.schoolBackgroundImg"
              alt=""
            />
          </template>
        </el-table-column>
        <el-table-column label="学校校徽" align="center">
          <template slot-scope="scope">
            <img class="imgStyle" :src="scope.row.schoolBadge" alt="" />
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="schoolDiaData.currentPage"
        :page-size="20"
        layout="total,prev, pager, next, jumper"
        :total="schoolDiaData.total"
      ></el-pagination>

      <el-button type="primary" @click="confirmAddSchoolToArea(1)">
        添加
      </el-button>
    </el-dialog>
  </div>
</template>
<script>
import singleImgUpload from '@/components/customer-component/singleImgUpload'
export default {
  components: { singleImgUpload },
  data() {
    let checkName = async (rule, value, callback) => {
      if (value) {
        let check = /^\p{Unified_Ideograph}{1,20}$/gu.test(value)
        if (!check) {
          callback('仅支持汉字且长度不超过20')
        } else {
          let res = await this.validatName('ch', value)
          if (res) {
            callback('该区域名称已被占用，请更改')
          }
        }
        callback()
      }
    }
    let checkEnName = async (rule, value, callback) => {
      if (value) {
        let check = /^[a-zA-Z]+$/.test(value)
        if (!check || value.length > 50) {
          callback('仅支持英文且长度不超过50')
        } else {
          let res = await this.validatName('en', value)
          if (res) {
            callback('该区域英文名已被占用，请更改')
          }
        }
        callback()
      }
    }
    let checkIntro = (rule, value, callback) => {
      if (/^\s+$/.test(value)) {
        callback('学校简介不支持只输入空格')
      }
      callback()
    }
    return {
      schoolDia: false,
      schoolDiaData: {
        total: 0,
        searchParam: '',
        currentPage: 1,
        schoolTotal: 100,
        schoolList: [],
      },
      schoolTotalChecked: [], //当前区域，所属学校的全部内容
      schoolCurrentPageChecked: [], //弹框，当前页的默认勾选项
      areaForm: {
        areaName: '',
        areaNameEn: '',
        areaIntroduction: '',
        areaBackgroundImg: '',
        areaSchoolList: [],
      },
      rules: {
        areaName: [
          { required: true, message: '请输入区域名称', trigger: 'blur' },
          { validator: checkName, trigger: 'blur' },
        ],
        areaNameEn: [
          { required: true, message: '请输入英文名称', trigger: 'blur' },
          { validator: checkEnName, trigger: 'blur' },
        ],
        areaIntroduction: [
          { required: true, message: '请输入区域简介', trigger: 'change' },
          { validator: checkIntro, trigger: 'blur' },
        ],
      },
    }
  },
  watch: {
    schoolDia(newVal, oldVal) {
      if (!newVal) {
        this.schoolDiaData.searchParam = ''
      }
    },
  },
  created() {
    if (this.$route.params.id) {
      this.getAreaItemData(this.$route.params.id)
    }
  },
  methods: {
    //   编辑时，初始化函数
    getAreaItemData(id) {
      this.fetchData('getAreaById', { id: id }).then(res => {
        if (res.data) {
          this.areaForm = res.data
          delete this.areaForm.createTime
          delete this.areaForm.updateTime
          delete this.areaForm.status
          this.areaForm.areaSchoolList = []
          this.getAreaSchoolList(this.$route.params.id)
        }
      })
    },
    // 编辑时，初始换区域中学校列表
    getAreaSchoolList(id) {
      this.fetchData('getAreaSchoolList', { areaId: id }).then(res => {
        this.$nextTick(() => {
          this.$set(this.areaForm, 'areaSchoolList', res.data)
          this.$forceUpdate()
        })
        //this.schoolTotalChecked，areaSchoolList赋值
      })
    },
    removeSchoolItem(index) {
      this.$confirm('确认要删除此学校', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.areaForm.areaSchoolList.splice(index, 1)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    handleSelectionChange(list) {
      this.schoolCurrentPageChecked = list
    },
    // 编辑时，点击添加学校，弹框显示 调用接口 areaId=1&schoolName=1&pageIndex=1&
    async getAreaSelectSchool(tag) {
      if (tag == -1 || tag === 0) {
        this.schoolDiaData.currentPage = 1
      }
      let res = await this.fetchData('getAreaSelectSchool', {
        areaId: this.$route.params.id,
        schoolName: this.schoolDiaData.searchParam,
        pageIndex: this.schoolDiaData.currentPage,
      })
      this.schoolDiaData.total = res.data.totalSize
      this.$set(this.schoolDiaData, 'schoolList', res.data.pageData)
    },
    // tag -1 标识点击添加学校按钮，0为搜索，1是切页
    async getSchoolList(tag) {
      if (tag === -1 || tag === 0) {
        this.schoolDiaData.currentPage = 1
        tag === -1 &&
          (this.schoolTotalChecked = this.areaForm.areaSchoolList.concat([]))
      }
      //   切页或者搜索
      if (tag === 0 || tag === 1) {
        console.log('搜索')
        this.confirmAddSchoolToArea(-1)
      }
      //  0. 勾选数据初始化
      this.schoolCurrentPageChecked = []
      // 1.发送请求
      await this.getAreaSelectSchool(tag)
      // 2.出现弹框
      if (!this.schoolDia) {
        this.schoolDia = true
      }
      // 3.清理上次选中状态
      this.$nextTick(() => {
        this.$refs.multipleTable.clearSelection()
      })
      // 4.根据获取当前页数据,设置默认勾选项,并从总勾选中清除
      //   console.log(this.schoolDiaData.schoolList)
      this.schoolDiaData.schoolList.forEach(item => {
        this.schoolTotalChecked.map((checkedItem, index) => {
          if (checkedItem.id === item.id) {
            // console.log('chencked')
            this.schoolTotalChecked.splice(index, 1)
            this.$nextTick(() => {
              this.$refs.multipleTable.toggleRowSelection(item)
            })
          }
        })
      })
    },
    // taregt -1 当前页勾选和totle合并,切页或搜索  1 合并并且赋值给学校列表(点击添加按钮)
    confirmAddSchoolToArea(target) {
      // 合并
      this.schoolTotalChecked = [
        ...this.schoolTotalChecked,
        ...this.schoolCurrentPageChecked,
      ]
      this.schoolCurrentPageChecked = []
      if (target === 1) {
        this.schoolDia = false
        this.$set(this.areaForm, 'areaSchoolList', this.schoolTotalChecked)
      }
    },
    handleCurrentChange(currentPage) {
      this.schoolDiaData.currentPage = currentPage
      this.getSchoolList(1)
    },
    async validatName(type, value) {
      let res = await this.fetchData(
        'checkAreaName',
        {
          id: this.$route.params.id || undefined,
          name: value,
          checkType: type === 'en' ? 1 : 0,
        },
        false
      )
      return !res.data
    },
    commit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let params = Object.assign({}, this.areaForm)
          params.areaSchoolList = []
          for (let item of this.areaForm.areaSchoolList) {
            params.areaSchoolList.push(item.id)
          }
          this.fetchData('addOrUpdateArea', params).then(res => {
            this.$message.success(
              this.$route.params.id ? '更新成功' : '新建成功'
            )
            this.$router.push({
              name: 'area-manage',
              params: { pageIndex: this.$route.params.pageIndex },
            })
          })
        } else {
          this.$message.warning('请填写必填项并保证中英文名称之前未使用')
          return false
        }
      })
    },
    cancel() {
      this.$router.push({
        name: 'area-manage',
        params: { pageIndex: this.$route.params.pageIndex },
      })
    },
  },
}
</script>
<style scoped lang="scss">
.imgStyle {
  display: inline-block;
  width: 128px;
  height: 128px;
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  font-size: 28px;
  color: #8c939d;
  text-align: center;
}
.markTip {
  list-style-type: none;
  font-size: 12px;
  text-align: right;
  margin-bottom: 12px;
}
.schoolList {
  padding: 10px 50px;
}
</style>
