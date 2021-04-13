<template>
  <div class="shool-manage">
    <div class="search-line">
      <el-input
        class="search-input"
        v-model="searchKey"
        placeholder="请输入搜索学校的全称"
        clearable
        @keyup.enter.native="getSchoolList(1)"
        :maxlength="20"
      ></el-input>
      <el-button type="primary" id="scrollHere" @click="getSchoolList(1)">
        搜索
      </el-button>
      <el-button type="primary" @click="reset">清空</el-button>
      <el-button type="primary" @click="creatShool">新建学校主页</el-button>
    </div>
    <div class="tab-list">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column
          prop="schoolName"
          label="学校名称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="schoolNameEn"
          label="英文缩写"
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
            <div v-if="!scope.row.schoolBadge" class="imgStyle"></div>

            <img v-else class="imgStyle" :src="scope.row.schoolBadge" alt="" />
          </template>
        </el-table-column>
        <el-table-column
          prop="pricePlanName"
          label="价格方案名称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="priceDescription"
          label="价格方案描述"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="操作"
          width="200px"
          align="center"
        >
          <template slot-scope="scope">
            <el-button @click="editSchool(scope.row.id)" type="text">
              编辑
            </el-button>
            <el-button
              type="text"
              style="color: #f56c6c"
              @click="delSchoolById(scope.row.id)"
            >
              删除
            </el-button>
            <el-button
              type="text"
              class="copyBtn"
              @click="copyUrl(scope.row.id)"
            >
              复制链接
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="20"
      layout="total,prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import Clipboard from 'clipboard'
export default {
  name: 'shool-manage',
  data() {
    return {
      currentPage: 1,
      total: 0,
      searchKey: '',
      tableData: [
        {
          id: null,
          priceDescription: null,
          pricePlanName: null,
          schoolBackgroundImg: null,
          schoolBadge: null,
          schoolName: null,
          schoolNameEn: null,
        },
      ],
    }
  },
  created() {
    this.getSchoolList(this.$route.params.pageIndex || 1)
  },
  mounted() {
    // console.log('scroll')
    // document.getElementById('scrollHere').scrollIntoView()
  },
  methods: {
    reset() {
      this.searchKey = ''
    },
    getSchoolList(tag) {
      if (tag) {
        this.currentPage = tag
      }
      this.fetchData('getSchoolList', {
        pageIndex: this.currentPage,
        schoolName: this.searchKey,
      }).then(res => {
        this.tableData = res.data.pageData
        this.total = res.data.totalSize
        this.dealWithData()
      })
    },
    dealWithData() {
      for (let item of this.tableData) {
        if (item.schoolNameEn.length > 15) {
          item.schoolNameEnCopy = item.schoolNameEn
          item.schoolNameEn = item.schoolNameEn.slice(0, 15) + '……'
        }
      }
    },
    delSchoolById(id) {
      this.$confirm('确认要删除此学校', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.fetchData('delSchoolById', { id: id }).then(res => {
            if (this.tableData.length == 1) {
              this.getSchoolList(
                this.currentPage != 0 ? this.currentPage - 1 : undefined
              )
            } else {
              this.getSchoolList()
            }
            this.$message.success('删除成功')
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    creatShool() {
      this.$router.push({ name: 'addSchool' })
    },
    editSchool(id) {
      this.$router.push({
        name: 'editSchool',
        params: { pageIndex: this.currentPage, id: id },
      })
    },
    handleCurrentChange(pageIndex) {
      this.currentPage = pageIndex
      this.getSchoolList()
    },
    copyUrl(id) {
      const clipboard = new Clipboard('.copyBtn', {
        text: function () {
          let reg = /^(.+)yunke./
          reg.test(window.location.host)
          return `https://${RegExp.$1}yunke.youdao.com/shool-page?schoolId=${id}`
        },
      })
      clipboard.on('success', e => {
        this.$message({ type: 'success', message: '复制成功' })
        clipboard.destroy() // 释放内存
      })
      clipboard.on('error', e => {
        this.$message({ type: 'waning', message: '该浏览器不支持自动复制' })
        clipboard.destroy()
      })
    },
  },
}
</script>

<style scoped lang="scss">
.shool-manage {
  .search-line {
    .search-input {
      width: 300px;
      margin-right: 20px;
    }
  }
  .tab-list {
    margin-top: 20px;
    .operation-btn {
      margin-left: 20px;
      &:nth-of-type(1) {
        margin-left: 0px;
      }
    }
  }
  .pagination {
    text-align: right;
    margin-top: 20px;
  }
}
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
</style>
