import { defineStore } from 'pinia'
import { ref } from 'vue'
import { GameStatus, type Pokemon } from '../interfaces'
import { usePokemonGame } from '../composables/usePokemonGame'

export const useWinnerStore = defineStore('winner', {
  state: () => ({
    gameStatus: ref<GameStatus>(GameStatus.loading),
    winner: ref<Pokemon>({
      id: -1,
      name: 'Desconocido',
    }),
  }),
  getters: {
    getStatus(state) {
      return state.gameStatus
    },
    getWiner(state) {
      return state.winner
    },
  },
  actions: {
    async setWinner() {
      try {
        const { pokemonsOptions } = usePokemonGame()
        console.log(pokemonsOptions)
        this.winner =
          pokemonsOptions.value[Math.floor(Math.random() * pokemonsOptions.value.length)]
      } catch (error) {
        console.log(error)
        return error
      }
    },
    startGame(aStatus: GameStatus) {
      this.gameStatus = aStatus
    },
    restartGame() {
      this.gameStatus = GameStatus.loading
    },
  },
})

// const start = async () => {
//   gameStatus.value = GameStatus.playing
//   await startGame()
//   console.log('Estado: ', gameStatus.value)
// }
//return { gameStatus, winner, start }
