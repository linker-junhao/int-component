<template>
  <el-form
    ref="auto-form"
    :model="modelValue"
    :rules="formRule"
    :label-width="labelWidthAuto"
  >
    <div
      v-for="(field) in computedColumnDefinition"
      :key="`${field.inputLabel || field.label}${field.prop}`"
    >
      <el-form-item
        :label="field.inputLabel || field.label"
        :prop="field.prop"
      >
        <el-input
          v-if="field.input === undefined"
          :model-value="modelValue[field.prop]"
          :readonly="field.readonly || false"
          :disabled="field.disabled || false"
          @input="formDataChange(field.prop, $event)"
        />
        <input-v-node-render
          v-else
          :form-data="modelValue"
          :gen-v-node="field.input"
        />
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
export default {
  name: 'IntDefForm',
  components: {
    InputVNodeRender: {
      name: 'InputVNodeRender',
      props: {
        genVNode: {
          type: [Object, Function]
        },
        formData: {
          type: Object
        }
      },
      render() {
        if (this.genVNode.constructor === Object) {
          return this.genVNode;
        }
        return this.genVNode(this.formData);
      }
    }
  },
  provide() {
    return {
      recurseRegist: this.recurseRegist || this.recurseRegistRoot
    };
  },
  inject: ['recurseRegist'],
  props: {
    formFields: {
      type: [Array, Function],
      required: true
    },
    modelValue: {
      type: Object,
      required: true
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      recurseRegistRoot: []
    };
  },
  computed: {
    computedColumnDefinition() {
      if (this.formFields.constructor === Array) {
        return this.formFields;
      }
      if (this.formFields.constructor === Function) {
        return this.formFields(this.modelValue);
      }
      return [];
    },
    formRule() {
      const ret = {};
      this.computedColumnDefinition.forEach((item) => {
        if (item.validRule) {
          ret[item.prop] = item.validRule;
        }
      });
      return ret;
    },
    labelWidthAuto() {
      let width = 36 + 12;
      this.computedColumnDefinition.forEach((item) => {
        const tmp = item.label.length * 18 + 12;
        if (tmp > width) {
          width = tmp;
        }
      });
      return `${width}px`;
    }
  },
  created() {
    (this.recurseRegist || this.recurseRegistRoot).push(this);
  },
  methods: {
    formDataChange(prop, e) {
      const tmp = this.modelValue;
      tmp[prop] = e;
      this.$emit('update:modelValue', tmp);
    },
    validSelf(outValid) {
      this.$refs['auto-form'].validate((valid) => {
        outValid(valid);
      });
    },
    validate(outValid) {
      let ret = true;
      this.recurseRegistRoot.forEach((childComponent) => {
        childComponent.validSelf((valid) => {
          if (!valid) {
            ret = false;
          }
        });
      });
      outValid(ret);
    },
    resetSelfFields() {
      this.$refs['auto-form'].resetFields()
    },
    resetFields() {
      this.recurseRegistRoot.forEach(comp => {
        comp.resetSelfFields()
      })
      this.recurseRegistRoot.splice(0, -1)
    }
  }
};
</script>

<style scoped>

</style>
