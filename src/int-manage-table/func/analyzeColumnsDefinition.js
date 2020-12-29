/**
 * 1.提取用户可见可控的字段，accessibility，默认可见，除非为false
 * 2.提取默认显示的字段，visibility，在accessibility可见的基础上，增加用户控制是否显示
 */
import { computed } from 'vue';


function getAccessibleCols(defs) {
  return computed(() => defs.fitler((colDef) => colDef.accessibility !== false));
}


function getVisibleCols(defs) {
  return computed(() => defs.fitler((colDef) => colDef.visibility !== false));
}

export default function analyzeColumnsDefinition(props) {
  const accessibleCols = getAccessibleCols(props.columnsDefinition);
  const visibleCols = getVisibleCols(accessibleCols);
  return {
    accessibleCols, visibleCols
  };
}
