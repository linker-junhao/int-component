/**
 * 从请求返回的数据中获取到表格对应的数据和这一数据的总条目数
 */

import { computed } from 'vue';

export default function getStartupDataFromPrimitiveData(props, primitiveData) {
  // 对应表格的数据
  const tableData = computed(() => props.getTableData(primitiveData));
  // 对应数据总条目数
  const total = computed(() => props.getTotal(primitiveData));

  return {
    tableData, total
  };
}
