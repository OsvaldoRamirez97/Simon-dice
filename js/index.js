//Traer elementos del DOM
let titulo = document.getElementById("estadoDelJuego");
let cuadros = document.querySelectorAll(".cuadro");
let numeroDeRonda = document.getElementById("ronda");
let puntos = document.getElementById("puntaje");

//Definir contardor de Ronda
let ronda = 0;

//Definir Puntos

let puntajeInicial = 0;


//Secuencias

let arrSimon = [];
let arrJugador = [];

//Comenzar Juego

actualizarEstado("Presione 'Empezar' para comenzar el juego");
contador("-");
bloquearInputUsuario();


function comenzarJuego() {
  reinicio();
}

//Reinciar Juego

function reinicio() {
  arrSimon = [];
  arrJugador = [];
  ronda = 0;
  puntajeInicial = 0;
  manejarRonda();
}

//Manejador de la Ronda

function manejarRonda() {
  bloquearInputUsuario();
  actualizarEstado("Turno de Simón");
  puntaje(0);
  const color = elegirUnColor();
  arrSimon.push(color);

  let tiempoDeEspera = (arrSimon.length + 1) * 1000;

  
  arrSimon.forEach((color, index) => {
    let delay = (index + 1) * 1000;
    setTimeout(() => {
      resaltarColor(color);
    }, delay);
  });

  setTimeout( () => {
    actualizarEstado("Turno del jugador");
    desbloquearInputUsuario();
  }, tiempoDeEspera);

  arrJugador = [];
  ronda++;
  contador(ronda);
}

//Turno del Jugador

function movimientoJugador(e) {
  const cuadroClickeado = e.target;
  resaltarColor(cuadroClickeado);
  arrJugador.push(cuadroClickeado);
  
  const colorSimon = arrSimon[arrJugador.length - 1];
  if(cuadroClickeado.id !== colorSimon.id) {
    perder();
    return;
  } else {
    puntaje(10)
  }
  if(arrJugador.length === arrSimon.length) {
    bloquearInputUsuario();
    setTimeout(manejarRonda, 1000);
  }
}

//Elegir un color

function elegirUnColor() {
  const indice = Math.floor(Math.random() * cuadros.length);
  return cuadros[indice];
}

//Resaltar un color

function resaltarColor(cuadro) {
  cuadro.style.opacity = "1";
  setTimeout(() => {
    cuadro.style.opacity = ".5";
  }, 500);
}

//Ronda

function contador() {
  numeroDeRonda.textContent = ronda;
}

//Actualizar estado

function actualizarEstado(estado, error = false) {
  titulo.textContent = estado;
  if (error) {
    titulo.classList.remove("alert-primary");
    titulo.classList.add("alert-danger");
  } else {
    titulo.classList.remove("alert-danger");
    titulo.classList.add("alert-primary");
  }
}

//Desbloquear clicks 

function desbloquearInputUsuario() {
  cuadros.forEach((cuadro) => cuadro.onclick = movimientoJugador);
}

//Bloquear clicks

function bloquearInputUsuario() {
  cuadros.forEach((cuadro) => cuadro.onclick = null );
}

//Perder

function perder() {
  bloquearInputUsuario();
  actualizarEstado('Perdiste! Tocá "Empezar" para jugar de nuevo!', true);
}

//Sumar puntos

function puntaje(sumarPuntos) {
  puntajeInicial += sumarPuntos;
  puntos.textContent = `${puntajeInicial}`
}