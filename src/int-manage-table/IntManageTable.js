import { reactive, h } from 'vue';
import { ElTable } from 'element-plus';
import testData from './test/testData.json';
import getStartupDataFromPrimitiveData from './func/getStartupDataFromPrimitiveData';
import analyzeColumnsDefinition from './func/analyzeColumnsDefinition';
import genTableColumns from './func/genTableColumns';
import IntPagination from '../int-pagination/IntPagination';

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
    // 表格部分
    const tableColumns = genTableColumns(this.visibleCols);
    const table = h(ElTable, {
      data: this.tableData,
      ...this.tableProps
    }, tableColumns);

    // 分页部分
    const pagination = h(IntPagination, {
      total: this.total,
      pageSizes: [3, 10, 20, 50, 100, 200],
      pageSize: 3,
      layout: 'total, sizes, prev, pager, next, jumper',
      currentPage: 1,
      ...this.paginationProps
    });

    const layout = h('div', [table, pagination]);
    return layout;
  }
};
