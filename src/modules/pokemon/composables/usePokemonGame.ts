import { ref } from 'vue'
import { GameStatus, type Pokemon, type PokemonListResponse } from '../interfaces'
import pokemonApi from '../api/pokemonApi'
import confeti from 'canvas-confetti'
import { Dificulty } from '../interfaces'
import { useWinnerStore } from '../store/pokemonStore'

export const usePokemonGame = () => {
  const pokemons = ref<Pokemon[]>([])
  const dificult = ref<Dificulty>(Dificulty.unselected)
  const store = useWinnerStore()

  const setDificult = (dificulty: Dificulty = Dificulty.easy) => {
    dificult.value = dificulty
    store.setLimit(dificulty)
  }

  const getPokemonsIds = async (): Promise<Pokemon[]> => {
    const limitPokemons = store.getLimit
    const response = await pokemonApi.get<PokemonListResponse>(`/?limit=${limitPokemons}`)
    const pokemonsArray = response.data.results.map((pokemon) => {
      const urlParts: string[] = pokemon.url.split('/')
      const id = urlParts[urlParts.length - 2] || '0'
      return {
        name: pokemon.name.charAt(0).toLocaleUpperCase() + pokemon.name.slice(1),
        id: +id,
      }
    })
    return pokemonsArray.sort(() => Math.random() - 0.5)
  }

  const checkAnswer = (id: number) => {
    const winner = store.getWiner
    const hasWon = winner!.id == id
    if (hasWon) {
      store.gameStatus = GameStatus.won
      store.addWinner(winner!)
      confeti({
        particleCount: 400,
        spread: 150,
        origin: { y: 0.6 },
        colors: ['#ef4444 ', '#1d4ed8   '],
      })
    } else {
      setTimeout(() => {
        store.startGame()
      }, 300)
    }
    return hasWon
  }

  const setNextOptions = async (howMany: number = 4) => {
    pokemons.value = await getPokemonsIds()
    store.pokemonsOptions = pokemons.value.slice(0, howMany)
    pokemons.value = pokemons.value.slice(howMany)
  }

  const getNextOptions = () => {
    return store.pokemonsOptions
  }

  const resetGame = async () => {
    pokemons.value = await getPokemonsIds()
    getNextOptions()
  }

  return {
    pokemons,
    dificult,

    // Methods
    getPokemonsIds,
    setNextOptions,
    setDificult,
    getNextOptions,
    checkAnswer,
    resetGame,
  }
}
