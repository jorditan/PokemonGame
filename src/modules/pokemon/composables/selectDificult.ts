import { ref } from 'vue'
import type { Dificulty } from '../interfaces'

export const selectDificult = (dificulty: Dificulty) => {
  const dificult = ref(dificulty)
  return {
    dificult,
  }
}
