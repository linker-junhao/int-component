import { ElTableColumn } from 'element-plus';
import { h } from 'vue';

export default function tableColumns(visibleCols) {
  this.VNode = visibleCols.map((colDef) => h(ElTableColumn, {
    ...colDef.tableColumnProps
  }));
}
