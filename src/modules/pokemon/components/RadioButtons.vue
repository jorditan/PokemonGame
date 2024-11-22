<template>
  <div class="card flex justify-left">
    <div class="flex flex-wrap gap-4">
      <div class="flex items-center gap-2">
        <RadioButton inputId="easy" name="dificulty" value="easy" />
        <label for="easy">Fácil</label>
      </div>
      <div class="flex items-center gap-2">
        <RadioButton inputId="medium" name="dificulty" value="medium" />
        <label for="mediom">Media</label>
      </div>
      <div class="flex items-center gap-2">
        <RadioButton inputId="hard" name="dificulty" value="hard" />
        <label for="hard">Difícil</label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RadioButton from 'primevue/radiobutton'
</script>
