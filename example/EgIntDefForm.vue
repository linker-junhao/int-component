<template>
  <div>
    {{ theData }}
  </div>
  <int-def-form
    v-model="theData"
    :form-fields="fields"
  />
</template>

<script>
import { h, resolveComponent } from 'vue';
import IntDefForm from '../src/int-def-form/IntDefForm.vue';

export default {
  name: 'EgIntDefForm',
  components: { IntDefForm },
  props: {},
  data() {
    return {
      hello: '1',
      theData: {}
    };
  },
  created() {},
  methods: {
    fields(fd) {
      return [
        {
          prop: 'p1',
          label: 'p1'
        },
        {
          prop: 'p2',
          label: 'p2',
          input: () => h(resolveComponent('el-select'), {
            modelValue: fd.p2,
            onChange: (e) => {
              console.log(e);
              fd.p2 = e;
              console.log(fd);
            }
          }, {
            default: () => [
              'val1', 'val2', 'val3'
            ].map((itemVal) => h(resolveComponent('el-option'), {
              key: itemVal,
              label: itemVal,
              value: itemVal
            }))
          })
        }
      ];
    }
  }
};
</script>

<style lang="scss" scoped></style>
