let jugador = "X";
let juegoTerminado = false;

function jugar(boton) {

    if (boton.innerHTML !== "" || juegoTerminado) {
        return;
    }

    boton.innerHTML = jugador;

    if (verificarGanador()) {
        document.getElementById("mensajeGanador").innerHTML = "🎉¡Gano " + jugador + "!🎉";
        juegoTerminado = true;
        return;
    }

    if (jugador === "X") {
        jugador = "O";
    } else {
        jugador = "X";
    }
    document.getElementById("turno").innerHTML = "Turno: " + jugador;
}

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















































    