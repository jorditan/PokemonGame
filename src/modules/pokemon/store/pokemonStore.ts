import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Dificulty, GameStatus, type Pokemon } from '../interfaces'
import { usePokemonGame } from '../composables/usePokemonGame'

export const useWinnerStore = defineStore('winner', {
  state: () => ({
    gameStatus: ref<GameStatus>(GameStatus.loading),
    winner: ref<Pokemon | null>(null),
    limitPokemons: ref<number>(0),
    pokemonsOptions: ref<Pokemon[]>([]),
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
        this.pokemonsOptions = getNextOptions()
        this.winner = this.pokemonsOptions[Math.floor(Math.random() * this.pokemonsOptions.length)]
        this.gameStatus = GameStatus.playing
      } catch (error) {
        return error
      }
    },
    startGame() {
      this.setWinner()
      this.gameStatus = GameStatus.playing
    },
    async restartGame() {
      try {
        const { setNextOptions, getNextOptions } = usePokemonGame()
        await setNextOptions()
        this.gameStatus = GameStatus.loading
        this.pokemonsOptions = getNextOptions()
        this.winner = this.pokemonsOptions[Math.floor(Math.random() * this.pokemonsOptions.length)]
        this.gameStatus = GameStatus.playing
      } catch (error) {
        return error
      }
    },
    setLimit(dificult: Dificulty) {
      if (dificult == Dificulty.easy) {
        this.limitPokemons = 151
      } else if (dificult == Dificulty.medium) {
        this.limitPokemons = 350
      } else if (dificult == Dificulty.hard) {
        this.limitPokemons = 550
      }
    },
  },
})
