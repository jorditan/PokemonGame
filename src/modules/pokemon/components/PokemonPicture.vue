<template>
  <div>
    <img v-if="!showPokemon" class="brightness-0" :src="pokemonImage" alt="Pokemon image" />
    <img v-else :src="pokemonImage" class="fade-in" alt="Pokemon image" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  poekmonId: number
  showPokemon: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showPokemon: false,
})

const pokemonImage = computed(
  () =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${props.poekmonId}.svg`,
)
</script>

<style lang="css" scoped>
img {
  height: 200px;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
</style>
