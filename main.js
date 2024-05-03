// Iniciar Variables
let tarjetasDestapatas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let timerInicial = 30;
let tiempoRegresivo = null;

// apuntando a documentos HTML
let mostrarMovimientos = document.getElementById("movimientos");
let mostrarAciertos = document.getElementById("aciertos");
let mostrarTiempo = document.getElementById("t-restante");

// Generacion numeros aleatorios
let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numeros = numeros.sort(() => {
  return Math.random() - 0.5;
});
console.log(numeros);

function contarTiempo() {
  tiempoRegresivo = setInterval(() => {
    timer--;
    mostrarTiempo.innerHTML = `Tiempo: ${timer} Segundos`;
    if (timer === 0) {
      clearInterval(tiempoRegresivo);
      mostrarTarjetas();
    }
  }, 1000);
}

function mostrarTarjetas() {
  for (let i = 0; i <= 15; i++) {
    let tarjetaBloqueada = document.getElementById(i);
    tarjetaBloqueada.innerHTML = numeros[i];
    tarjetaBloqueada.disabled = true;
  }
}
// Funcion principal
function destapar(id) {
  if (temporizador == false) {
    contarTiempo();
    temporizador = true;
  }

  tarjetasDestapatas++;
  console.log(tarjetasDestapatas);

  if (tarjetasDestapatas == 1) {
    // Mostrar el primer numero

    tarjeta1 = document.getElementById(id);
    primerResultado = numeros[id];
    tarjeta1.innerHTML = primerResultado;

    tarjeta1.disabled = true;
  } else if (tarjetasDestapatas == 2) {
    // mostrar segundo numero
    tarjeta2 = document.getElementById(id);
    segundoResultado = numeros[id];
    tarjeta2.innerHTML = segundoResultado;

    tarjeta2.disabled = true;

    // Incrementar movimientos
    movimientos++;
    mostrarMovimientos.innerHTML = `Movimientos : ${movimientos}`;

    if (primerResultado == segundoResultado) {
      tarjetasDestapatas = 0;

      aciertos++;
      mostrarAciertos.innerHTML = `Aciertos : ${aciertos}`;
      if (aciertos == 8) {
        clearInterval(tiempoRegresivo);
        mostrarAciertos.innerHTML = `Aciertos : ${aciertos} 😡`;
        mostrarTiempo.innerHTML = `Enhorabuena ${
          timerInicial - timer
        } tardastes segundos`;
        mostrarMovimientos.innerHTML = `Movimientos : ${movimientos}👍`;
      }
    } else {
      setTimeout(() => {
        tarjeta1.innerHTML = "";
        tarjeta2.innerHTML = "";
        tarjeta1.disabled = false;
        tarjeta2.disabled = false;
        tarjetasDestapatas = 0;
      }, 800);
    }
  }
}
