<template>
  <div @click="$emit('click', dificult, 'click')" class="flex items-center gap-2 justify-center">
    <RadioButton :inputId="dificult" name="dificulty" :value="dificult" />
    <label for="easy">{{ dificult }}</label>
  </div>
</template>

<script setup lang="ts">
import RadioButton from 'primevue/radiobutton'

interface Props {
  dificult: string
}

defineProps<Props>()
</script>
