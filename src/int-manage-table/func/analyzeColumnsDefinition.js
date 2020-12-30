/**
 * 1.提取用户可见可控的字段，accessibility，默认可见，除非为false
 * 2.提取默认显示的字段，visibility，在accessibility可见的基础上，增加用户控制是否显示
 */
import { computed } from 'vue';


function getAccessibleCols(props) {
  const defs = props.columnsDefinition;
  return computed(() => defs.filter((colDef) => colDef.accessibility !== false));
}


function getVisibleCols(defs) {
  return computed(() => defs.value.filter((colDef) => colDef.visibility !== false));
}

export default function analyzeColumnsDefinition(props) {
  const accessibleCols = getAccessibleCols(props);
  const visibleCols = getVisibleCols(accessibleCols);
  return {
    accessibleCols, visibleCols
  };
}
