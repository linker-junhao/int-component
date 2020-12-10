<template>
  <eg-int-def-form />
  <int-pagination
    background
    layout="prev, pager, next"
    :total="1000"
  />
  <el-pagination
    background
    layout="prev, pager, next"
    :total="1000"
  />
</template>

<script>
import IntPagination from '../src/int-pagination/IntPagination.vue';
import EgIntDefForm from './EgIntDefForm.vue';

export default {
  name: 'App',
  components: { EgIntDefForm, IntPagination }
};
</script>

<style lang="scss" scoped></style>
