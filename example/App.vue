<template>
  <int-manage-table
    :get-table-data="getTableData"
    :get-total="getTotal"
    :columns-definition="defs"
  />
</template>

<script>
import IntManageTable from '../src/int-manage-table/IntManageTable';
import manageTableUtils from './manageTableUtils';

export default {
  name: 'App',
  components: {
    IntManageTable
  },
  data() {
    return {
      defs: [
        {
          tableColumnProps: {
            prop: 'id',
            label: 'id'
          }
        }
      ]
    };
  },
  methods: {
    ...manageTableUtils
  }
};
</script>

<style lang="scss" scoped></style>
