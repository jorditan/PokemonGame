import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Dificulty, GameStatus, type Pokemon } from '../interfaces'
import { usePokemonGame } from '../composables/usePokemonGame'

export const useWinnerStore = defineStore('winner', {
  state: () => ({
    gameStatus: ref<GameStatus>(GameStatus.loading),
    winner: ref<Pokemon>({
      id: -1,
      name: 'Desconocido',
    }),
    limitPokemons: ref<number>(0),
  }),
  getters: {
    getStatus(state) {
      return state.gameStatus
    },
    getWiner(state) {
      return state.winner
    },
    getLimit(state) {
      return state.limitPokemons
    },
  },
  actions: {
    async setWinner() {
      try {
        const { setNextOptions, getNextOptions } = usePokemonGame()
        await setNextOptions()
        const pokemonsOptions = getNextOptions()
        this.winner =
          pokemonsOptions.value[Math.floor(Math.random() * pokemonsOptions.value.length)]
        console.log(pokemonsOptions)
        console.log(this.winner)
      } catch (error) {
        return error
      }
    },
    startGame(aStatus: GameStatus) {
      this.gameStatus = aStatus
    },
    async restartGame() {
      try {
        const { setNextOptions } = usePokemonGame()
        await setNextOptions()
        this.gameStatus = GameStatus.loading
      } catch (error) {
        return error
      }
    },
    setLimit() {
      const { dificult } = usePokemonGame()
      if (dificult.value == Dificulty.easy) {
        this.limitPokemons = 151
      } else if (dificult.value == Dificulty.medium) {
        this.limitPokemons = 201
      } else if (dificult.value == Dificulty.hard) {
        this.limitPokemons = 301
      }
    },
  },
})
