let ataqueJugador;
let ataqueEnemigo;
let resultado;
let vidasJugador = 3;
let vidasEnemigo = 3;

document.addEventListener("DOMContentLoaded", function () {
  let botonMascota = document.getElementById("boton-mascota");
  let botonFuego = document.getElementById("boton-fuego");
  let botonAgua = document.getElementById("boton-agua");
  let botonTierra = document.getElementById("boton-tierra");
  let botonReiniciar = document.getElementById("boton-reiniciar");
  let ganarModal = document.getElementById("ganaste-modal");
  let span = document.getElementsByClassName("cerrar")[0];
  let botonAgain = document.getElementById("again");

  botonMascota.addEventListener("click", seleccionarMascotaJugador);
  botonFuego.addEventListener("click", ataqueFuego);
  botonAgua.addEventListener("click", ataqueAgua);
  botonTierra.addEventListener("click", ataqueTierra);
  botonReiniciar.addEventListener("click", reiniciarJuego);
  botonAgain.addEventListener("click", function () {
    ganarModal.style.display = "none";
    reiniciarJuego();
  });

  span.addEventListener("click", function () {
    ganarModal.style.display = "none";
  });

  function seleccionarMascotaJugador() {
    let hipodoge = document.getElementById("hipodoge");
    let capipepo = document.getElementById("capipepo");
    let ratigueya = document.getElementById("ratigueya");
    let spanMascotaJugador = document.getElementById("mascota-jugador");

    if (hipodoge.checked) {
      spanMascotaJugador.innerHTML = "Hipodoge";
    } else if (capipepo.checked) {
      spanMascotaJugador.innerHTML = "Capipepo";
    } else if (ratigueya.checked) {
      spanMascotaJugador.innerHTML = "Ratigueya";
    } else {
      alert("SELECCIONA UNA MASCOTA");
    }
    seleccionarMascotaEnemigo();
  }

  function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(1, 3);
    let spanMascotaEnemigo = document.getElementById("mascota-enemigo");

    if (mascotaAleatoria == 1) {
      spanMascotaEnemigo.innerHTML = "Hipodoge";
    } else if (mascotaAleatoria == 2) {
      spanMascotaEnemigo.innerHTML = "Capipepo";
    } else {
      spanMascotaEnemigo.innerHTML = "Ratigueya";
    }
  }

  function ataqueFuego() {
    ataqueJugador = "FUEGO";
    ataqueEnemigoAleatorio();
  }

  function ataqueAgua() {
    ataqueJugador = "AGUA";
    ataqueEnemigoAleatorio();
  }

  function ataqueTierra() {
    ataqueJugador = "TIERRA";
    ataqueEnemigoAleatorio();
  }

  function ataqueEnemigoAleatorio() {
    let ataqueAleatorio = aleatorio(1, 3);

    if (ataqueAleatorio == 1) {
      ataqueEnemigo = "FUEGO";
    } else if (ataqueAleatorio == 2) {
      ataqueEnemigo = "AGUA";
    } else {
      ataqueEnemigo = "TIERRA";
    }
    combate();
    crearMensaje();
  }

  function crearMensaje() {
    let parrafo = document.createElement("p");

    let contenido = document.createTextNode(
      `Tu mascota atacó con ${ataqueJugador}, la mascota del enemigo atacó con ${ataqueEnemigo} - ${resultado}`
    );
    parrafo.appendChild(contenido);
    let pActual = document.getElementById("p1");
    let seccionMensajes = document.getElementById("mensajes");
    seccionMensajes.insertBefore(parrafo, pActual);

    /* Otra forma de hacer lo mismo es:
    let parrafo = document.createElement("p");
    let seccionMensajes = document.getElementById("mensajes");
    parrafo.innerHTML(`Tu mascota atacó con ${ataqueJugador}, la mascota del enemigo atacó con ${ataqueEnemigo}`)
    seccionMensajes.appendChild(parrafo)
    */
  }

  function combate() {
    let spanVidasEnemigo = document.getElementById("vidas-enemigo");
    let spanVidasJugador = document.getElementById("vidas-jugador");

    if (ataqueJugador == "FUEGO" && ataqueEnemigo == "TIERRA") {
      resultado = "GANASTE";
      vidasEnemigo--;
      spanVidasEnemigo.innerHTML = vidasEnemigo;
    } else if (ataqueJugador == "AGUA" && ataqueEnemigo == "FUEGO") {
      resultado = "GANASTE";
      vidasEnemigo--;
      spanVidasEnemigo.innerHTML = vidasEnemigo;
    } else if (ataqueJugador == "TIERRA" && ataqueEnemigo == "AGUA") {
      resultado = "GANASTE";
      vidasEnemigo--;
      spanVidasEnemigo.innerHTML = vidasEnemigo;
    } else if (ataqueJugador == ataqueEnemigo) {
      resultado = "EMPATE";
    } else {
      resultado = "PERDISTE";
      vidasJugador--;
      spanVidasJugador.innerHTML = vidasJugador;
    }
    gameOver();
  }

  function gameOver() {
    if (vidasEnemigo == 0) {
      ganarModal.style.display = "block";
    } else if (vidasJugador == 0) {
      perdiste();
    }
  }

  function perdiste() {
    ganarModal.style.display = "block";
    let texto = document.getElementById("texto");
    let modalContenido = document.getElementsByClassName("modal-content")[0];
    texto.innerHTML = "HAS PERDIDO 😭.";
    modalContenido.style.backgroundColor = "#ed6d52";
  }

  function reiniciarJuego() {
    let spanVidasEnemigo = document.getElementById("vidas-enemigo");
    let spanVidasJugador = document.getElementById("vidas-jugador");
    let seccionMensajes = document.getElementById("mensajes");

    vidasEnemigo = 3;
    vidasJugador = 3;
    spanVidasEnemigo.innerHTML = vidasEnemigo;
    spanVidasJugador.innerHTML = vidasJugador;

    while (seccionMensajes.firstChild) {
      seccionMensajes.removeChild(seccionMensajes.lastChild);
    }
  }

  function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
});
