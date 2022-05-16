/**
 * html element constants
 */

let view                // control de vista de la app
let pokeHidden          // nombre del pokemon que hay que adivinar
let playerLife          // vida del jugador
let wrongLetters = ''   // letras incorrectas
let myWin = false       // verifica si ganamos

// palabra secreta introducida por el usuario
let myPlayerSecret = document.getElementById('myPlayerSecret')
myPlayerSecret.value = ''

const poke_body = document.getElementById('poke_body')

const textKey = document.getElementById('textKey')
const textKeyAux = document.getElementById('textKeyAux')
const drawCanvas = document.getElementById('draw')
const h2wrongLetters = document.getElementById('h2wrongLetters')
const url_poke = document.getElementById('url_poke')
const quien_es = document.getElementById('quien_es')
const lineas_letras = document.getElementById('lineas_letras')

const loser = document.getElementById('loser') // modal de fin del juego

const SVG_NS = 'http://www.w3.org/2000/svg';
let svg = document.createElementNS(SVG_NS, 'svg');
svg.setAttributeNS(null, "viewBox", "0 0 125 130");
svg.setAttributeNS(null, "width", "125");
svg.setAttributeNS(null, "height", "130");


/******************************************************************
  FUNCIONES PARA VISTA 2
******************************************************************/
const playerSecret = () => {
  let myLetter = myPlayerSecret.value.toUpperCase();
  console.log(myLetter.length)

  if (noCharacters( myLetter.slice(myLetter.length - 1, myLetter.length)) ) {
    myPlayerSecret.value = myLetter
  } else {
    myPlayerSecret.value = myLetter.slice(0, myLetter.length - 1)
  }

  if (myPlayerSecret.value.length > 10) myPlayerSecret.value = myPlayerSecret.value.slice(0, 10)

}

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
    lineas += `<li></li>`
  })
  lineas_letras.innerHTML = lineas
}

/**
 * draw hangman
 */

const drawHangman = (myDraw) => {

  poke_body.classList.add(`body_background${playerLife}`)

  switch (myDraw) {
    case 1: // horca
      let horca = document.createElementNS(SVG_NS, 'path');
      horca.setAttributeNS(null, 'style', 'fill:none;stroke:#7137c8;stroke-width:3.56593204;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1')
      horca.setAttributeNS(null, 'd', 'm 53.403615,74.346585 c 0,0 15.08706,-11.424152 18.235313,-17.755439 7.763397,-15.612568 2.888131,-54.7321619 2.888131,-54.7321619')
      drawCanvas.childNodes[1].appendChild(horca)
      break;
      
    case 2: // cabeza
      let cabeza = document.createElementNS(SVG_NS, 'g');
      cabeza.setAttributeNS(null, 'transform', 'matrix(0.50941888,0,0,0.50941888,94.673002,72.157455)')

      let circulo = document.createElementNS(SVG_NS, 'path');
      circulo.setAttributeNS(null, 'transform', 'matrix(0.7239743,-0.68982694,0.6624649,0.74909296,0,0)')
      circulo.setAttributeNS(null, 'd', 'M 4.3380108,-90.674704 A 56.709579,35.852787 0 0 1 -51.214403,-54.107136 56.709579,35.852787 0 0 1 -109.058,-89.226088 56.709579,35.852787 0 0 1 -53.512719,-125.79799 56.709579,35.852787 0 0 1 4.3377275,-90.683544')
      circulo.setAttributeNS(null, 'style', 'opacity:1;fill:none;fill-opacity:1;fill-rule:nonzero;stroke:#7137c8;stroke-width:4.00138044;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1')
      
      let ojo_d1 = document.createElementNS(SVG_NS, 'path');
      ojo_d1.setAttributeNS(null, 'd', 'm -76.302622,-47.984129 8.47807,7.53606')
      ojo_d1.setAttributeNS(null, 'style', 'fill:none;stroke:#7137c8;stroke-width:4;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1')
      
      let ojo_d2 = document.createElementNS(SVG_NS, 'path');
      ojo_d2.setAttributeNS(null, 'd', 'm -68.766562,-47.984129 -8.00707,7.53606')
      ojo_d2.setAttributeNS(null, 'style', 'fill:none;stroke:#7137c8;stroke-width:4;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1')
      
      let ojo_i1 = document.createElementNS(SVG_NS, 'path');
      ojo_i1.setAttributeNS(null, 'd', 'm -113.04092,-7.0067989 -7.53607,7.53607001')
      ojo_i1.setAttributeNS(null, 'style', 'fill:none;stroke:#7137c8;stroke-width:4;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1')
      
      let ojo_i2 = document.createElementNS(SVG_NS, 'path');
      ojo_i2.setAttributeNS(null, 'd', 'm -122.461,-5.5937789 9.42008,6.12305001')
      ojo_i2.setAttributeNS(null, 'style', 'fill:none;stroke:#7137c8;stroke-width:4;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1')

      cabeza.appendChild(circulo)
      cabeza.appendChild(ojo_d1)
      cabeza.appendChild(ojo_d2)
      cabeza.appendChild(ojo_i1)
      cabeza.appendChild(ojo_i2)
      drawCanvas.childNodes[1].appendChild(cabeza)
      break;
      
    case 3: // cuerpo
      let cuerpo = document.createElementNS(SVG_NS, 'path');
      cuerpo.setAttributeNS(null, 'd', 'M 63.282435,92.469488 A 11.637005,15.356049 0 0 1 51.879582,108.12612 11.637005,15.356049 0 0 1 40.013046,93.081452 11.637005,15.356049 0 0 1 51.412274,77.420219 11.637005,15.356049 0 0 1 63.282292,92.460107')
      cuerpo.setAttributeNS(null, 'style', 'opacity:1;fill:none;fill-opacity:1;fill-rule:nonzero;stroke:#7137c8;stroke-width:2.03767562;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1')
      cuerpo.setAttributeNS(null, 'transform', 'rotate(-8.0164331)')
      drawCanvas.childNodes[1].appendChild(cuerpo)
      break;
    
    case 4: // brazo izquierdo
      let brazo_i = document.createElementNS(SVG_NS, 'path');
      brazo_i.setAttributeNS(null, 'd', 'm 53.403615,74.346585 -10.79722,24.71364 10.31734,-18.23532 z')
      brazo_i.setAttributeNS(null, 'style', 'fill:none;stroke:#7137c8;stroke-width:2.03767562;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1')
      drawCanvas.childNodes[1].appendChild(brazo_i)
      break;
    
    case 5: // brazo derecho
      let brazo_d = document.createElementNS(SVG_NS, 'path');
      brazo_d.setAttributeNS(null, 'd', 'm 69.479484,71.467315 -4.31889,16.31581 c 0,0 4.306982,-14.80668 6.860073,-14.31022 0.808298,0.15718 -2.541183,-2.00559 -2.541183,-2.00559 z')
      brazo_d.setAttributeNS(null, 'style', 'fill:none;stroke:#7137c8;stroke-width:2.03767562;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1')
      drawCanvas.childNodes[1].appendChild(brazo_d)
      break;
    
    case 6: // pierna izquierda
      let pierna_i = document.createElementNS(SVG_NS, 'path');
      pierna_i.setAttributeNS(null, 'd', 'm 61.137365,99.271045 c 3.817569,2.961885 -1.735289,28.581775 -1.735289,28.581775 l 4.798766,-27.83284 c 0,0 -3.761442,-1.290445 -3.063477,-0.748935 z')
      pierna_i.setAttributeNS(null, 'style', 'fill:none;stroke:#7137c8;stroke-width:2.03767562;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1')
      drawCanvas.childNodes[1].appendChild(pierna_i)
      break;
    
    case 7: // pierna derecha
      let pierna_d = document.createElementNS(SVG_NS, 'path');
      pierna_d.setAttributeNS(null, 'd', 'm 71.383186,97.904195 -0.464073,25.149855 c 0,0 0.884596,-24.304845 4.318888,-30.472165 0.874411,-1.57026 -3.854815,5.32231 -3.854815,5.32231 z')
      pierna_d.setAttributeNS(null, 'style', 'fill:none;stroke:#7137c8;stroke-width:2.03767562;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1')
      drawCanvas.childNodes[1].appendChild(pierna_d)
      break;
  
    default:
      break;
  }
  return
}


/**
 * listen for keys and check if it is in the hidden word
 */
const myKey = (e) => {
  let myLetter = textKey.value.toUpperCase();

  if (!myWin && noCharacters(myLetter)) {
    if (playerLife < 7) {
      let correct = false;
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
          h2wrongLetters.innerText = wrongLetters
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
/**
 * hace girar pokeball
 */
const pokeRotate = (id) => {
  const btn = document.getElementById(id)
  btn.childNodes[1].classList.add('pokeRotateFooter')

  setTimeout(() => {
    btn.childNodes[1].classList.remove('pokeRotateFooter')

    if (id === 'btn1') {
      if (view === 2 && myPlayerSecret.value !== '') {
        view = 1
      } else {
        view = 2
      }
    } else {
      myPlayerSecret.value = '';
      (view === 0) ? view = 1 : view = 0
    }
    resetStates()
    viewFunction()

  }, 1000);
}

/**
 * detecta si la palabra tiene solo letras mayusculas o signo de guión ( - )
 */
const noCharacters = (t) => {
  let re = /[A-Z]/;
  const mayusculas = (re.test(t)); //return true si es mayuscula
  
  const minus = (t === '-')

  if ( mayusculas || minus ) return true;

  return false;
}

/**
 * reset states
 */
const resetStates = () => {
  textKey.removeEventListener("keyup", myKey)
  myPlayerSecret.removeEventListener("keyup", playerSecret)

  playerLife = 0
  wrongLetters = ''
  myWin = false

  for (let index = 0; index < 7; index++) {
    poke_body.classList.remove(`body_background${index}`)
  }

  loser.classList.remove('winer')
  loser.classList.remove('loser_active')
  quien_es.classList.remove('quien_es_pokemon')
  
  lineas_letras.innerHTML = ''
  h2wrongLetters.innerText = ''
  if (drawCanvas.childElementCount > 0) {
    if (drawCanvas.childNodes[1].childElementCount > 0) {
      [...drawCanvas.children[0].childNodes].map(d =>{
        drawCanvas.children[0].removeChild(d)
      })
    }
    drawCanvas.removeChild(svg)
  }
}

/******************************************************************
  View function
 ******************************************************************/
const viewFunction = async () => {
  switch (view) {
    case 0:
      document.getElementById('view_0').classList.add('view_activate')
      document.getElementById('view_1').classList.remove('view_activate')
      document.getElementById('view_2').classList.remove('view_activate')
      document.getElementById('allBtn').classList.add('allBtn')

      document.getElementById('btn1').childNodes[3].innerText = 'Iniciar juego'
      document.getElementById('btn2').childNodes[3].innerText = 'Agregar nueva palabra'
      break;

    case 1:
      document.getElementById('view_0').classList.remove('view_activate')
      document.getElementById('view_1').classList.add('view_activate')
      document.getElementById('view_2').classList.remove('view_activate')
      document.getElementById('allBtn').classList.remove('allBtn')

      document.getElementById('btn1').childNodes[3].innerText = 'Guardar y empezar'
      document.getElementById('btn2').childNodes[3].innerText = 'Cancelar'
      myPlayerSecret.focus()
      myPlayerSecret.addEventListener("keyup", playerSecret)
      break;
    
    case 2:
      document.getElementById('view_0').classList.remove('view_activate')
      document.getElementById('view_1').classList.remove('view_activate')
      document.getElementById('view_2').classList.add('view_activate')
      document.getElementById('allBtn').classList.remove('allBtn')

      document.getElementById('btn1').childNodes[3].innerText = 'Nuevo juego'
      document.getElementById('btn2').childNodes[3].innerText = 'Desistir'

      drawCanvas.appendChild(svg)
      
      poke_body.classList.add(`body_background${playerLife}`)
      
      textKey.focus()
      textKey.addEventListener("keyup", myKey)
      
      if (myPlayerSecret.value !== '') {
        pokeHidden = myPlayerSecret.value.toUpperCase()
        lineDraws(pokeHidden)
        break;
      }
      const random = Math.round(Math.random() * 99)
      const { namePokemon, urlPokemon} = await getPokemon(random)
      pokeHidden = namePokemon;
      
      quien_es.alt=`Pokemon ${namePokemon}`
      quien_es.src=`${await getImgPokemon(urlPokemon)}`
      //
      //
      lineDraws(namePokemon)
      break;
  
    default:
      break;
  }
}

/******************************************************************
  Main function
 ******************************************************************/
const Main = () => {
  view = 0
  viewFunction()
}

/******************************************************************
  onLoad
 ******************************************************************/
window.onload = Main()
