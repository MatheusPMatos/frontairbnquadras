<template>
  <div>
    <q-input class="full-width" hide-bottom-space outlined stack-label type="date" bottom-slots v-bind="$attrs"
      :class="classAtrrs" :value="cValue" v-on="listeners" :error="cError" :error-message="cErrorMessage"
      :ruler="[val => dateIsValid(val) || 'Data inválida!']">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer q-mr-sm" @click="toggleDatePopup">
          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
            <q-date :model-value="cQDate" today-btn mask="DD/MM/YYYY" @update:model-value="emitDate" />
          </q-popup-proxy>
        </q-icon>
      </template>

      <!-- Aceitar Demais Slots -->
      <template v-for="(_, slot) in $slots" v-slot:[slot]="scope">
        <slot :name="slot" v-bind="scope" />
      </template>
    </q-input>
  </div>
</template>

<script>
import { format, parse, isValid } from 'date-fns';

export default {
  name: 'ccInputDate',
  inheritAttrs: false,
  data() {
    return {
      dateSelect: null,
    };
  },
  props: {
    value: [String, Date],
    initValue: {
      type: [String, Date],
      default: null,
    },
    error: {
      type: [String, Boolean, Number],
      default: false,
    },
    errorMessage: {
      type: String,
      default: '',
    },
    classAtrrs: {
      type: String,
      default: '',
    },
    icon: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    cValue() {
      return this.value
        ? this.value
        : this.dateSelect
          ? format(parse(this.dateSelect, 'dd/MM/yyyy', new Date()), 'yyyy-MM-dd')
          : null;
    },
    cQDate() {
      return isValid(this.cValue)
        ? format(new Date(this.cValue), 'dd/MM/yyyy')
        : format(new Date(), 'dd/MM/yyyy');
    },
    cError() {
      return !!this.error;
    },
    cErrorMessage() {
      return this.errorMessage || (this.cError ? 'Data inválida!' : '');
    },
  },
  methods: {
    toggleDatePopup() {
      this.$refs.qDateProxy.show();
    },
    emitDate(date) {
      const parsedDate = parse(date, 'dd/MM/yyyy', new Date());
      if (isValid(parsedDate)) {
        this.$emit('update:model-value', format(parsedDate, 'yyyy-MM-dd'));
      }
      this.$refs.qDateProxy.hide();
    },
    dateIsValid(date) {
      return isValid(parse(date, 'dd/MM/yyyy', new Date()));
    },
  },
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
