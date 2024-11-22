import { computed, onMounted, ref } from 'vue'
import { GameStatus, type Pokemon, type PokemonListResponse } from '../interfaces'
import pokemonApi from '../api/pokemonApi'
import confeti from 'canvas-confetti'

export const usePokemonGame = () => {
  const gameStatus = ref<GameStatus>(GameStatus.playing)
  const pokemons = ref<Pokemon[]>([])
  const pokemonsOptions = ref<Pokemon[]>([])

  const winner = computed(
    () => pokemonsOptions.value[Math.floor(Math.random() * pokemonsOptions.value.length)],
  )
  const isLoading = computed(() => pokemons.value.length == 0)

  const getPokemonsIds = async (): Promise<Pokemon[]> => {
    const response = await pokemonApi.get<PokemonListResponse>('/?limit=151')

    const pokemonsArray = response.data.results.map((pokemon) => {
      const urlParts = pokemon.url.split('/')
      const id = urlParts.at(-2) ?? 0
      return {
        name: pokemon.name.charAt(0).toLocaleUpperCase() + pokemon.name.slice(1),
        id: +id,
      }
    })

    return pokemonsArray.sort(() => Math.random() - 0.5)
  }

  const getNextOptions = (howMany: number = 4) => {
    gameStatus.value = GameStatus.playing
    pokemonsOptions.value = pokemons.value.slice(0, howMany)
    pokemons.value = pokemons.value.slice(howMany)
  }

  const checkAnswer = (id: number) => {
    const hasWon = winner.value.id == id
    if (hasWon) {
      gameStatus.value = GameStatus.won
      confeti({
        particleCount: 400,
        spread: 150,
        origin: { y: 0.6 },
        colors: ['#ef4444 ', '#1d4ed8   '],
      })
    } else {
      gameStatus.value = GameStatus.lost
    }
    return hasWon
  }

  const resetGame = async () => {
    pokemons.value = await getPokemonsIds()
    getNextOptions()
    gameStatus.value = GameStatus.playing
  }

  onMounted(async () => {
    // await new Promise((r) => setTimeout(r, 1000))
    pokemons.value = await getPokemonsIds()
    getNextOptions()
  })

  return {
    gameStatus,
    isLoading,
    pokemonsOptions,
    winner,

    // Methods
    getNextOptions,
    checkAnswer,
    resetGame,
  }
}
