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
  const hasStart = ref(false)

  const setDificult = async (dificulty: Dificulty = Dificulty.easy) => {
    dificult.value = dificulty
    if (dificult.value == Dificulty.easy) {
      limitPokemons.value = 151
    } else if (dificult.value == Dificulty.medium) {
      limitPokemons.value = 200
    } else if (dificult.value == Dificulty.hard) {
      limitPokemons.value = 300
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
    console.log(pokemonsArray.sort(() => Math.random() - 0.5))
    return pokemonsArray.sort(() => Math.random() - 0.5)
  }

  const getNextOptions = async (howMany: number = 4) => {
    gameStatus.value = GameStatus.playing
    pokemonsOptions.value = pokemons.value.slice(0, howMany)
    console.log('Total pokemons:', pokemons.value)
    console.log('Opciones:', pokemonsOptions.value)
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

  const startGame = async () => {
    console.log('Ganador', winner.value)
    pokemons.value = await getPokemonsIds()
    await getNextOptions()
    console.log('Límite pokeones', limitPokemons.value)
    console.log('Estatus:', gameStatus.value)
    console.log('Ganador', winner.value.name)
  }

  const resetGame = async () => {
    hasStart.value = false
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
    hasStart,

    // Methods
    setDificult,
    getNextOptions,
    checkAnswer,
    resetGame,
    startGame,
  }
}
