<template>
  <div class="flex items-center gap-2 justify-center">
    <RadioButton :inputId="dificult" name="dificulty" :value="dificult" />
    <label for="easy">{{ dificult }}</label>
  </div>
</template>

<script setup lang="ts">
import RadioButton from 'primevue/radiobutton'
import { selectDificult } from '../composables/selectDificult'

interface Props {
  dificult: string
}

defineProps<Props>()
</script>
