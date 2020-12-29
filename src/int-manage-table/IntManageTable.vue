<template>  
<div>
  <el-table :data="tableData">

  </el-table>
</div>
</template>

<script>
import { reactive, computed } from 'vue'
import testData from './test/testData.json'
import getStartupDataFromPrimitiveData from './func/getStartupDataFromPrimitiveData'

export default {
  name: 'IntManageTable',
  props: {
    /** 
     * 从原始返回数据获取对应到表格的数据
     */
    getTableData: {
      type: Function,
      required: true,
      default() {
        return []
      }
    },
    /** 
     * 从原始返回数据获取该数据的总条目数
     */
    getTotal: {
      type: Function,
      required: true,
      default() {
        return 0
      }
    },
    /** 每一列对应数据的渲染表示 */
    columnsDefinition: {
      type: [Array],
      required: true
    }
  },
  setup(props) {
    const primitiveData = reactive(testData)
    const { tableData, total } = getStartupDataFromPrimitiveData(props, primitiveData)

    

    return {
      tableData, total
    }
  }
}
</script>

<style lang="less" scoped>

</style>