import { computed, ref } from 'vue'
import { GameStatus, type Pokemon, type PokemonListResponse } from '../interfaces'
import pokemonApi from '../api/pokemonApi'
import confeti from 'canvas-confetti'
import { Dificulty } from '../interfaces'

export const usePokemonGame = () => {
  const gameStatus = ref<GameStatus>(GameStatus.playing)
  const pokemons = ref<Pokemon[]>([])
  const pokemonsOptions = ref<Pokemon[]>([])
  const limitPokemons = ref<number>(0)
  const dificult = ref<Dificulty>(Dificulty.unselected)

  const setDificult = async (dificulty: Dificulty = Dificulty.easy) => {
    dificult.value = dificulty
    if (dificult.value == Dificulty.easy) {
      limitPokemons.value = 151
    } else if (dificult.value == Dificulty.medium) {
      limitPokemons.value = 201
    } else if (dificult.value == Dificulty.hard) {
      limitPokemons.value = 301
    }
  }

  const winner = computed(
    () => pokemonsOptions.value[Math.floor(Math.random() * pokemonsOptions.value.length)],
  )

  const isLoading = computed(() => pokemons.value.length == 0)

  const getPokemonsIds = async (): Promise<Pokemon[]> => {
    const response = await pokemonApi.get<PokemonListResponse>(`/?limit=${limitPokemons.value}`)
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

  const getNextOptions = async (howMany: number = 4) => {
    pokemonsOptions.value = pokemons.value.slice(0, howMany)
    pokemons.value = pokemons.value.slice(howMany)
  }

  const startGame = async () => {
    pokemons.value = await getPokemonsIds()
    await getNextOptions()
    gameStatus.value = GameStatus.playing
    console.log('Ganador: ', winner.value.name)
    console.log('Estado: ', gameStatus.value)
  }

  const resetGame = async () => {
    pokemons.value = await getPokemonsIds()
    getNextOptions()
    gameStatus.value = GameStatus.playing
  }

  return {
    limitPokemons,
    gameStatus,
    isLoading,
    pokemonsOptions,
    winner,
    dificult,

    // Methods
    setDificult,
    getNextOptions,
    checkAnswer,
    resetGame,
    startGame,
  }
}
