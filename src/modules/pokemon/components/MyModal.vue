<template>
  <Dialog
    :draggable="false"
    :closable="false"
    class="modal"
    v-model:visible="visible"
    modal
    header="Selecciona la dificultad"
    :style="{ width: '25rem' }"
  >
    <span class="text-surface-500 dark:text-surface-400 block mb-8"
      >El juego tiene 3 dificultades distintas. Selecciona alguna para poder comenzar:</span
    >
    <div class="flex gap-5 flex-row">
      <div v-for="dificult in dificults" :key="dificult">
        <RadioButton :dificult="dificult" />
      </div>
    </div>
    <div class="flex gap-2 pt-6 justify-end">
      <Button
        disabled
        class="bg-blue-500 text-[#28282]"
        type="button"
        label="Confirmar"
        severity="info"
        @click="visible = true"
      ></Button>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import RadioButton from './RadioButton.vue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { ref } from 'vue'
import type { Dificulty } from '../interfaces'

const visible = ref(true)

interface Props {
  dificults: Dificulty[]
}

defineProps<Props>()
</script>

<style scoped></style>
