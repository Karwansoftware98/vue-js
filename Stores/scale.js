import { defineStore } from 'pinia';

export const scaleStore = defineStore('store', {
  state() {
    return {
      result: 0,
    };
  },
  actions: {
    setResult(value) {
      this.result = value;
    },
  },
});