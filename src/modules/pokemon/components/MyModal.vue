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
      >El juego tiene 3 dificultades distintas. Selecciona alguna para poder empezar:</span
    >
    <div class="flex gap-5 flex-row">
      <div
        v-for="dificulty in dificults"
        :key="dificulty"
        class="flex items-center gap-2 justify-center"
      >
        <RadioButton
          v-model="dificult"
          @click="setDificult(dificulty)"
          :dificult="dificulty"
          :inputId="dificulty"
          name="dynamic"
          :value="dificulty"
        />
        <label @click.stop for="dificult">{{ dificulty }}</label>
        <!-- <RadioButton @click="setDificult" :dificult="dificult" /> -->
      </div>
    </div>
    <div class="flex gap-2 pt-6 justify-end">
      <button
        :class="[
          {
            enabled: dificult !== 'Por definir',
            disabled: store.winner == null,
          },
        ]"
        type="button"
        severity="info"
        @click="dificult != 'Por definir' ? (handleVisible(), setWinner()) : null"
        class="p-2 rounded-lg mt-2"
      >
        Confirmar
      </button>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import RadioButton from 'primevue/radiobutton'
import Dialog from 'primevue/dialog'
import { ref } from 'vue'
import { type Dificulty } from '../interfaces'
import { usePokemonGame } from '../composables/usePokemonGame'
import { useWinnerStore } from '../store/pokemonStore'
const { setWinner } = useWinnerStore()
const { dificult, setDificult } = usePokemonGame()
const visible = ref(true)

const store = useWinnerStore()

const handleVisible = () => {
  visible.value = !visible.value
}

interface Props {
  dificults: Dificulty[]
}

defineProps<Props>()
</script>

<style scoped>
.disabled {
  border: none;
  color: #c0c0c0;
  background-color: #999999;
  cursor: not-allowed;
  @apply disabled:opacity-75;
}

.enabled {
  cursor: pointer;
  background-color: #1d4ed8;
  color: #fafafa;
}
.enabled:hover {
  background-color: #0231b3;
}
</style>
