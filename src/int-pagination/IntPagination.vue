<template>
  <el-pagination
    background
    :total="1000"
    :current-page="1"
    :page-size="20"
    layout="total, sizes, prev, pager, next, jumper"
    @current-change="currentChangeHandle"
  />
</template>

<script>
// 外界接收到翻页状态：页数、分页大小
// 从外界接收总页数、
import { ElPagination } from 'element-plus';


export default {
  components: { ElPagination },
  props: {
    currentPage: {
      type: Number,
      required: true
    }
  },
  methods: {
    currentChangeHandle(...args) {
      this.$emit('current-change', ...args);
    }
  }
};
</script>

<style lang="scss" scoped></style>
