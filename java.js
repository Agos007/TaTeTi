let jugador = "X";
let juegoTerminado = false;
let modo = "2jugadores";

// Elegir el modo de juego
function seleccionarModo(tipo) {
    modo = tipo;
}

// Jugar en una casilla
function jugar(boton) {

    if (boton.innerHTML !== "" || juegoTerminado) {
        return;
    }

    // En modo máquina, la persona juega con X
    if (modo === "maquina" && jugador !== "X") {
        return;
    }

    boton.innerHTML = jugador;
    boton.style.color = jugador === "X" ? "deeppink" : "dodgerblue";

    if (verificarGanador()) {
        mostrarMensaje("✨ ¡Ganó " + jugador + "! ✨");
        return;
    }

    if (tableroLleno()) {
        mostrarMensaje("🤝 ¡Empate!");
        return;
    }

    cambiarJugador();

    if (modo === "maquina" && jugador === "O") {
        setTimeout(jugarMaquina, 500);
    }
}

// Cambiar el turno
function cambiarJugador() {
    jugador = jugador === "X" ? "O" : "X";

    document.getElementById("turno").innerHTML =
        "Turno: " + jugador;
}

// La máquina elige dónde jugar
function jugarMaquina() {

    if (juegoTerminado) {
        return;
    }

    const botones = document.querySelectorAll("#tablero button");
    let libres = [];

    for (let i = 0; i < botones.length; i++) {
        if (botones[i].innerHTML === "") {
            libres.push(i);
        }
    }

    if (libres.length === 0) {
        return;
    }

    // Primero intenta ganar
    let posicion = buscarJugada("O");

    // Si no puede ganar, intenta bloquear a X
    if (posicion === -1) {
        posicion = buscarJugada("X");
    }

    // Si no necesita ganar ni bloquear, elige al azar
    if (posicion === -1) {
        posicion = libres[Math.floor(Math.random() * libres.length)];
    }

    botones[posicion].innerHTML = "O";
    botones[posicion].style.color = "dodgerblue";

    if (verificarGanador()) {
        mostrarMensaje("🤖 ¡Ganó la máquina! 🤖");
        return;
    }

    if (tableroLleno()) {
        mostrarMensaje("🤝 ¡Empate!");
        return;
    }

    cambiarJugador();
}

// Buscar una jugada ganadora o un bloqueo
function buscarJugada(ficha) {

    const botones = document.querySelectorAll("#tablero button");

    const combinaciones = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let combo of combinaciones) {

        let valores = combo.map(i => botones[i].innerHTML);
        let cantidad = valores.filter(valor => valor === ficha).length;
        let vacias = combo.filter(i => botones[i].innerHTML === "");

        if (cantidad === 2 && vacias.length === 1) {
            return vacias[0];
        }
    }

    return -1;
}

// Revisar si alguien ganó
function verificarGanador() {

    const botones = document.querySelectorAll("#tablero button");

    const combinaciones = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let combo of combinaciones) {

        let a = combo[0];
        let b = combo[1];
        let c = combo[2];

        if (
            botones[a].innerHTML !== "" &&
            botones[a].innerHTML === botones[b].innerHTML &&
            botones[b].innerHTML === botones[c].innerHTML
        ) {
            return true;
        }
    }

    return false;
}

// Revisar si se llenó el tablero
function tableroLleno() {
    const botones = document.querySelectorAll("#tablero button");

    return Array.from(botones).every(
        boton => boton.innerHTML !== ""
    );
}

// Mostrar el cartel animado
function mostrarMensaje(texto) {

    let mensaje = document.getElementById("mensajeGanador");

    mensaje.innerHTML = texto;
    mensaje.classList.remove("animacionGanador");

    void mensaje.offsetWidth;

    mensaje.classList.add("animacionGanador");

    juegoTerminado = true;
}

// Reiniciar el juego
function reiniciarJuego() {

    const botones = document.querySelectorAll("#tablero button");

    botones.forEach(boton => {
        boton.innerHTML = "";
        boton.style.color = "";
    });

    jugador = "X";
    juegoTerminado = false;

    document.getElementById("turno").innerHTML = "Turno: X";
    document.getElementById("mensajeGanador").innerHTML = "";
    document.getElementById("mensajeGanador").classList.remove("animacionGanador");
}






























    
