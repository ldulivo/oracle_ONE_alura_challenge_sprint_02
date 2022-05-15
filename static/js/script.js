/**
 * html element constants
 */

let view                // control de vista de la app
let pokeHidden          // nombre del pokemon que hay que adivinar
let playerLife          // vida del jugador
let wrongLetters = ''   // letras incorrectas
let myWin = false       // verifica si ganamos

const poke_body = document.getElementById('poke_body')

const textKey = document.getElementById('textKey')
const textKeyAux = document.getElementById('textKeyAux')
const drawCanvas = document.getElementById('draw')
const name_poke = document.getElementById('name_poke')
const url_poke = document.getElementById('url_poke')
const quien_es = document.getElementById('quien_es')
const lineas_letras = document.getElementById('lineas_letras')

const loser = document.getElementById('loser') // modal de fin del juego

/******************************************************************
  FUNCIONES PARA VISTA 3
******************************************************************/

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
  ctx.strokeStyle = '#3c59a8';
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.lineWidth = 5;

  poke_body.classList.add(`body_background${playerLife}`)

  switch (myDraw) {
    case 1: // horca
      ctx.moveTo(10,130)
      ctx.lineTo(200,130)
      ctx.moveTo(70,130)
      ctx.lineTo(70,20)
      ctx.lineTo(160,20)
      ctx.lineTo(160,35)
      ctx.strokeStyle = '#fff';
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


/**
 * listen for keys and check if it is in the hidden word
 */
const myKey = (e) => {

  if (!myWin) {
    if (playerLife < 7) {
      let correct = false;
      let myLetter = textKey.value.toUpperCase();
      [...pokeHidden].map( (letter, index) => {
        if (letter === myLetter) {
          lineas_letras.childNodes[index].innerHTML = myLetter
          correct = true
        }
      })
      
      if (!correct) {
        if (!wrongLetters.includes(myLetter)) {
          wrongLetters += myLetter
          playerLife++
          drawHangman(playerLife)
          console.log(wrongLetters)
        }
      }
      
      if (correct) myWin = checkPlayerWin()
  
    } 
    if (playerLife >= 7) {
      loser.childNodes[1].innerHTML = 'uff!! casi lo logras!'
      loser.classList.add('loser_active')
    }
  }


  textKey.value = ''
  textKeyAux.focus()
  textKey.focus()
}

/**
 * check player win
 */

const checkPlayerWin = () => {
  let win = true;
  [...lineas_letras.childNodes].map( (li, index) => {
    if (lineas_letras.childNodes[index].innerHTML === '') win = false;
  })

  if (win) {
    loser.childNodes[1].innerHTML = 'Ganaste!!'
    loser.classList.add('winer')
    loser.classList.add('loser_active')
    quien_es.classList.add('quien_es_pokemon')
  }

  return win
}

/******************************************************************
  UTILS
******************************************************************/

const pokeRotate = (id) => {
  const btn = document.getElementById(id)
  btn.childNodes[1].classList.add('pokeRotateFooter')

  setTimeout(() => {
    btn.childNodes[1].classList.remove('pokeRotateFooter')
  }, 1000);
}

/******************************************************************
  Main function
 ******************************************************************/
const Main = async () => {
  view = 0
  playerLife = 0

  poke_body.classList.add(`body_background${playerLife}`)

  textKey.focus()
  textKey.addEventListener("keyup", myKey)
  
  const random = Math.round(Math.random() * 99)
  const { namePokemon, urlPokemon} = await getPokemon(random)
  pokeHidden = namePokemon;

  name_poke.innerHTML = namePokemon
  quien_es.alt=`Pokemon ${namePokemon}`
  quien_es.src=`${await getImgPokemon(urlPokemon)}`
  lineDraws(namePokemon)
}

window.onload = Main()

// https://pokeapi.co/
// https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0
// https://pokeapi.co/api/v2/pokemon/1/
