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
  methods: {
    formDataChange(prop, e) {
      const tmp = this.modelValue;
      tmp[prop] = e;
      this.$emit('update:modelValue', tmp);
    },
    validate(outValid) {
      this.$refs['auto-form'].validate((val) => {
        outValid(val);
      });
    },
    resetFields() {
      this.$refs['auto-form'].resetFields();
    }
  }
};
</script>

<style scoped>

</style>
