/**
 * html element constants
 */

let view          // control de vista de la app
let pokeHidden    // nombre del pokemon que hay que adivinar
let playerLife    // vida del jugador

const textKey = document.getElementById('textKey')
const drawCanvas = document.getElementById('draw')
const name_poke = document.getElementById('name_poke')
const url_poke = document.getElementById('url_poke')
const quien_es = document.getElementById('quien_es')
const lineas_letras = document.getElementById('lineas_letras')

/**
 * Function that gets a list of pokemon's
 */

const getPokemon = async (numberRandom) => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100&offset=0')
  const results = await res.json()
  const namePokemon = await results.results[numberRandom].name.toUpperCase()
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

/**
 * Function that draws a line for each letter of the word
 */

const lineDraws = (namePokemon) => {
  let lineas = "";

  [...namePokemon].map( name => {
    /* lineas += `<li>${name}</li>` */
    lineas += `<li></li>`
  })
  lineas_letras.innerHTML = lineas
}

/**
 * draw hangman
 */

const drawHangman = (myDraw) => {
  var ctx = drawCanvas.getContext('2d');
  switch (myDraw) {
    case 1: // horca
      ctx.moveTo(10,130)
      ctx.lineTo(200,130)
      ctx.moveTo(70,130)
      ctx.lineTo(70,20)
      ctx.lineTo(160,20)
      ctx.lineTo(160,35)
      break;
      
    case 2: // cabeza
      ctx.beginPath()
      ctx.arc(160,45,10,0,Math.PI*2)
      break;
      
    case 3: // cuerpo
      ctx.moveTo(160,55)
      ctx.lineTo(160,95)
      break;
    
    case 4: // brazo izquierdo
      ctx.beginPath()
      ctx.moveTo(160,60)
      ctx.lineTo(150,80)
      break;
    
    case 5: // brazo derecho
      ctx.beginPath()
      ctx.moveTo(160,60)
      ctx.lineTo(170,80)
      break;
    
    case 6: // pierna izquierda
      ctx.beginPath()
      ctx.moveTo(160,95)
      ctx.lineTo(150,120)
      break;
    
    case 7: // pierna derecha
      ctx.beginPath()
      ctx.moveTo(160,95)
      ctx.lineTo(170,120)
      break;
  
    default:
      break;
  }
  ctx.stroke()
  return
}

const myKey = (e) => {
  let myLetter = textKey.value.toUpperCase();
  //myLetter = myLetter.toUpperCase
  console.log(myLetter);
  [...pokeHidden].map( (letter, index) => {
    if (letter === myLetter) {
      lineas_letras.childNodes[index].innerHTML = myLetter
    }
  })
  textKey.value = ''  
}

/**
 * Main function
 */
const Main = async () => {
  view = 0

  textKey.focus()
  textKey.onkeyup = myKey
  
  const random = Math.round(Math.random() * 99)
  const { namePokemon, urlPokemon} = await getPokemon(random)
  pokeHidden = namePokemon;

  name_poke.innerHTML = namePokemon
  quien_es.alt=`Pokemon ${namePokemon}`
  quien_es.src=`${await getImgPokemon(urlPokemon)}`
  lineDraws(namePokemon)
  drawHangman(0)
  drawHangman(1)
  drawHangman(2)
  drawHangman(3)
  drawHangman(4)
  drawHangman(5)
  drawHangman(6)
  drawHangman(7)
}

window.onload = Main()

// https://pokeapi.co/
// https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0
// https://pokeapi.co/api/v2/pokemon/1/
