import { toRefs, h } from 'vue';
import IntPagination from '../../int-pagination/IntPagination';

function TablePagination(pageStatus = {}, pageStatusChangeHandle, paginationProps = {}) {
  let changeHandle = pageStatusChangeHandle;

  // 分页部分
  this.pageStatus = toRefs({
    currentPage: paginationProps.currentPage || pageStatus.currentPage || 1,
    pageSize: paginationProps.pageSize || pageStatus.pageSize || 10,
    total: paginationProps.total || pageStatus.total || 0
  });

  if (!changeHandle) {
    // eslint-disable-next-line func-names
    changeHandle = function () {};
  }

  this.VNode = h(IntPagination, {
    total: this.pageStatus.total.value,
    pageSizes: [10, 20, 50, 100, 200],
    pageSize: this.pageStatus.pageSize,
    layout: 'total, sizes, prev, pager, next, jumper',
    currentPage: this.pageStatus.currentPage,
    onCurrentChange: (e) => {
      this.pageStatus.currentPage.value = e;
      changeHandle.call(this);
    },
    onSizeChange: (e) => {
      this.pageStatus.pageSize.value = e;
      changeHandle.call(this);
    },
    ...paginationProps
  });
}

export default TablePagination;
