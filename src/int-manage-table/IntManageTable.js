import { reactive, h } from 'vue';
import { ElTable } from 'element-plus';
import testData from './test/testData.json';
import getStartupDataFromPrimitiveData from './func/getStartupDataFromPrimitiveData';
import analyzeColumnsDefinition from './func/analyzeColumnsDefinition';
import TableColumns from './func/TableColumns';
import TablePagination from './func/TablePagination';

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
        return [];
      }
    },
    /**
     * 从原始返回数据获取该数据的总条目数
     */
    getTotal: {
      type: Function,
      required: true,
      default() {
        return 0;
      }
    },
    /** 每一列对应数据的渲染表示 */
    columnsDefinition: {
      type: [Array],
      required: true
    },
    tableProps: {
      type: Object,
      default() {
        return {};
      }
    },
    paginationProps: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  setup(props) {
    const primitiveData = reactive(testData);
    const { tableData, total } = getStartupDataFromPrimitiveData(props, primitiveData);
    const { accessibleCols, visibleCols } = analyzeColumnsDefinition(props);

    return {
      tableData, total, accessibleCols, visibleCols
    };
  },
  render() {
    // 翻页部分
    const pagination = new TablePagination({
      total: this.total,
      currentPage: 1,
      pageSize: 10
    }, (() => {}));

    // 表格部分
    const tableColumns = new TableColumns(this.visibleCols);
    const table = h(ElTable, {
      data: this.tableData,
      ...this.tableProps
    }, tableColumns.VNode);

    const layout = h('div', [table, pagination.VNode]);
    return layout;
  }
};
