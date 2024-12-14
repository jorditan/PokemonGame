<template>
  <section>
    <MyModal :dificults="[Dificulty.easy, Dificulty.medium, Dificulty.hard]" />
  </section>

  <section
    v-if="store.gameStatus == GameStatus.loading"
    class="flex flex-col justify-center items-center w-screen h-screen"
  >
    <h1 class="text-3xl">Espere por favor</h1>
    <h3 class="animate-pulse">Cargando pókemons</h3>
  </section>

  <section v-else class="gap-10 flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="text-5xl font-bold text-slate-800 text-center">¿Quién es este pokemon?</h1>
    <h3 class="capitalize text-2xl font-bold">{{ store.gameStatus }}</h3>
    <PokemonPicture
      :poekmon-id="store.winner!.id"
      :show-pokemon="store.gameStatus == GameStatus.won"
    />
    <PokemonOptions
      :options="store.pokemonsOptions"
      :blockSelection="store.gameStatus != GameStatus.playing"
      :correckAnswer="store.winner!.id"
      @selected-options="checkAnswer"
    />
    <button
      @click="store.restartGame"
      class="w-[400px] fixed bottom-5 left-50 right-50 rounded-lg bg-blue-900 hover:shadow-md m-2 p-4 text-[#fafafa]"
      v-if="store.gameStatus == GameStatus.won"
    >
      Haga click para reiniciar la partida
    </button>
  </section>
</template>

<style scoped lang="css">
@import url('https://fonts.googleapis.com/css2?family=Funnel+Display:wght@300..800&display=swap');
h1 {
  color: #fafafa;
  font-family: 'Funnel Display', sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
}
</style>

<script setup lang="ts">
import MyModal from '../components/MyModal.vue'
import { Dificulty, GameStatus } from '../interfaces'
import { usePokemonGame } from '../composables/usePokemonGame'
import PokemonPicture from '../components/PokemonPicture.vue'
import PokemonOptions from '../components/PokemonOptions.vue'
import { useWinnerStore } from '../store/pokemonStore'
const { checkAnswer } = usePokemonGame()
const store = useWinnerStore()
</script>
