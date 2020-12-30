import { ElTableColumn } from 'element-plus';
import { h } from 'vue';

export default function genTableColumns(visibleCols) {
  return visibleCols.map((colDef) => h(ElTableColumn, {
    ...colDef.tableColumnProps
  }));
}
