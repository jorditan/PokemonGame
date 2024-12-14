<template>
  <div class="flex flex-wrap justify-center px-10">
    <button
      v-for="{ name, id } in options"
      :key="id"
      :disabled="blockSelection"
      @click="$emit('selectedOptions', id)"
      :class="[
        'mt-5 disabled:shadow-none disabled:bg-gray-100',
        {
          correct: id == correckAnswer && blockSelection,
          incorrect: id != correckAnswer && blockSelection,
        },
      ]"
    >
      {{ name }}
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Pokemon } from '../interfaces'

interface Props {
  options: Pokemon[]
  blockSelection: boolean
  correckAnswer: number
}

defineProps<Props>()
</script>

<style lang="css" scoped>
@import url('https://fonts.googleapis.com/css2?family=Funnel+Display:wght@300..800&display=swap');

button {
  font-weight: 500;
  @apply bg-red-500 shadow-md rounded-lg p-3 m-2 cursor-pointer w-40 text-center transition-all hover:bg-red-600;
}

.correct {
  @apply bg-blue-700 hover:bg-blue-700;
}

.incorrect {
  @apply bg-red-100 opacity-70  hover:bg-red-100;
}
</style>
