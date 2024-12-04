import { defineStore } from 'pinia'

export const useWinnerStore = defineStore('Winner', {
  state: () => ({ hasStart: false }),
  actions: {
    start() {
      this.hasStart = true
    },
  },
})
