<template>
  <div class="flex items-center gap-2 justify-center">
    <div @click="$emit('click', dificult, 'click')">
      <RadioButton :inputId="dificult" name="dificulty" :value="dificult" />
    </div>
    <label @click.stop for="easy">{{ dificult }}</label>
  </div>
</template>

<script setup lang="ts">
import RadioButton from 'primevue/radiobutton'

interface Props {
  dificult: string
}

defineProps<Props>()
</script>
