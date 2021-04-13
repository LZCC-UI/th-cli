<template>
  <div>
    <el-upload
      :class="['avatar-uploader', uploadDisable ? 'disableClass' : '']"
      style="cursor: not-allowed"
      :action="pic"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :disabled="uploadDisable"
      :before-upload="beforeUpload"
    >
      <div v-if="imageUrl">
        <img
          :src="imageUrl"
          class="avatar"
          @mouseover="hover = 1"
          @mouseleave="hover = -1"
        />
        <div
          v-show="showDelete && hover == 1"
          class="upload_hover_del"
          @mouseover="hover = 1"
          @mouseleave="hover = -1"
          @click="
            e => {
              e.preventDefault()
              e.stopPropatation || (e.cancelBubble = true)
            }
          "
        >
          <i class="el-icon-delete" @click="handleRemove"></i>
        </div>
      </div>
      <i
        v-else
        :class="[{ 'el-icon-plus': showPlus }, 'avatar-uploader-icon']"
      ></i>
    </el-upload>
  </div>
</template>

<script>
import * as picture from '@/utils/picUrl'
import _global_checkFile from '@/utils/imgUploadVal'
export default {
  props: {
    imgAttrs: {
      type: Object,
      default: function () {
        return { w: '', h: '', k: 1024, compTag: -1 }
      },
    },
    showPlus: {
      type: Boolean,
      default: () => true,
    },
    showDelete: {
      type: Boolean,
      default: () => true,
    },
    uploadDisable: {
      type: Boolean,
      default: () => false,
    },
    // 图片上传项
    imgUrl: {
      required: true,
    },
  },
  model: {
    prop: 'imgUrl',
    event: 'change',
  },
  data() {
    return {
      hover: 0,
      imageUrl: null,
    }
  },
  created() {
    this.pic = picture.BASE_PICTURE_URL
  },
  watch: {
    imgUrl: {
      handler(newValue, oldValue) {
        this.imageUrl = newValue
      },
      immediate: true,
    },
  },
  methods: {
    beforeUpload(file) {
      return _global_checkFile(file, {
        i: 'jpg,png,gif',
        w: this.imgAttrs.w,
        h: this.imgAttrs.h,
        compTag: this.imgAttrs.compTag,
        k: this.imgAttrs.k,
      })
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = res.data[0]
      this.hover = -1
      this.$emit('change', this.imageUrl)
    },
    handleRemove(e) {
      e.stopPropatation || (e.cancelBubble = true)
      e.preventDefault()
      this.imageUrl = ''
      this.$emit('change', this.imageUrl)
    },
  },
}
</script>
<style>
.disableClass .el-upload {
  cursor: not-allowed !important;
}
</style>
<style lang="scss" scoped>
.upload_hover_del {
  width: 127px;
  height: 127px;
  display: inline-block;
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 6px;
  .el-icon-delete {
    color: white;
    pointer-events: auto;
    margin-top: 50px;
  }
}
.avatar-uploader .el-upload {
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  width: 128px;
  height: 128px;
  display: block;
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  font-size: 28px;
  color: #8c939d;
  line-height: 128px;
  text-align: center;
}
.avatar {
  border: 1px dashed #d9d9d9 !important;
  width: 126px;
  height: 126px;
  border-radius: 6px;
  display: block;
}
</style>
