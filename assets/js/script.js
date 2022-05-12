/**
 * html element constants
 */

const name_poke = document.getElementById('name_poke')
const url_poke = document.getElementById('url_poke')
const quien_es = document.getElementById('quien_es')

/**
 * Function that gets a list of pokemon's
 */

const getPokemon = async (numberRandom) => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100&offset=0')
  const results = await res.json()
  const namePokemon = await results.results[numberRandom].name
  const urlPokemon = await results.results[numberRandom].url
  return await { namePokemon, urlPokemon }
}

/**
 * Function that obtains imagen of the Pokemon
 */

const getImgPokemon = async (url) => {
  const res = await fetch(url)
  const results = await res.json()

  return await results.sprites.other.dream_world.front_default
}

const Main = async () => {
  /* quien_es.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg'
  quien_es.alt='Leonardo' */

  const random = Math.round(Math.random() * 99)
  const { namePokemon, urlPokemon} = await getPokemon(random)

  console.log({namePokemon, urlPokemon})

  name_poke.innerHTML = namePokemon
  quien_es.alt=`Pokemon ${namePokemon}`
  quien_es.src=`${await getImgPokemon(urlPokemon)}`
  console.log(await getImgPokemon(urlPokemon))
}

window.onload = Main()

// https://pokeapi.co/
// https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0
// https://pokeapi.co/api/v2/pokemon/1/
