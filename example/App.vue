<template>
  <int-manage-table
    :get-table-data="getTableData"
    :get-total="getTotal"
  />
</template>

<script>
import IntManageTable from '../src/int-manage-table/IntManageTable.vue';
import manageTableUtils from './manageTableUtils';

export default {
  name: 'App',
  components: {
    IntManageTable
  },
  methods: {
    ...manageTableUtils
  }
};
</script>

<style lang="scss" scoped></style>
