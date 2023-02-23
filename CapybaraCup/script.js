// Constantes
const LongitudCircuito = 16;

//Variables
let winnerChoice = "";
let score = 100;
let bet = 0;

// Array de onjetos que harán de capybaras.
let capybaras = [

    {
        nombre: "Abril",
        casillaActual: 0,
    },
    {
        nombre:"Toni",
        casillaActual: 0,
    },
    {
        nombre:"Alberto",
        casillaActual: 0,
    },
    {
        nombre:"Rafa",
        casillaActual: 0,
    }

]

// Función auxiliar que usaremos para generar un número aleatorio en un determinado rango.
function generateRandom(min = 0, max = 100) {

    // find diff
    let difference = max - min;

    // generate random number 
    let rand = Math.random();

    // multiply with difference 
    rand = Math.floor( rand * difference);

    // add with min value 
    rand = rand + min;

    return rand;
}

// Función que inicia el juego
function start() {


    capybaras = [

        {
            nombre: "Abril",
            casillaActual: 0
        },
        {
            nombre:"Toni",
            casillaActual: 0
        },
        {
            nombre:"Alberto",
            casillaActual: 0
        },
        {
            nombre:"Rafa",
            casillaActual: 0
        }
    
    ]

    displayScore()
    betWinner()

    // Este intervalo será nuestro bucle principal en el que se ejecutará el juego.
    let intervalo = setInterval(function() {

        let avance = generateRandom(-2, 6);
        let avance2 = generateRandom(-2, 6);
        let avance3 = generateRandom(-2, 6);
        let avance4 = generateRandom(-2, 6);
    
        let ganador = document.getElementsByClassName("ganador")[0];
    
        capybaras[0].casillaActual += avance;
        capybaras[1].casillaActual += avance2;
        capybaras[2].casillaActual += avance3;
        capybaras[3].casillaActual += avance4;
    
        for (let i = 0; i < capybaras.length; i++) {
            console.log("El capybara " + capybaras[i].nombre + " está en la casilla " + capybaras[i].casillaActual);
        }
    
        clearCasillas();
        mostrarEnCasilla(capybaras);
    
        for (let i = 0; i < capybaras.length; i++) {
            if (capybaras[i].casillaActual >= LongitudCircuito) {
                console.log("El capybara " + capybaras[i].nombre + " ha ganado.");
                ganador.innerHTML = "El capybara " + capybaras[i].nombre + " ha ganado."
                clearInterval(intervalo);
            }
        }

        checkWinner();
        displayScore();

    }, 500)

    displayScore();
}

// Función que elimina todo el contenido de las casillas del tablero
function clearCasillas() {
    let casillas = document.getElementsByClassName("casillas");
    for (let i = 0; i < casillas.length; i++) {
        casillas[i].innerHTML = "";
    }
}

// Función que recorre todas las casillas, y si un capybara está en ella, lo dibuja.
function mostrarEnCasilla(capybaras) {

    let casillas = document.getElementsByClassName("casillas");

    for (let i = 0; i < capybaras.length; i++) {
        for (let j = 0; j < casillas.length; j++) {
            if (parseInt(casillas[j].id) === capybaras[i].casillaActual) {
                casillas[j].innerHTML +=  " " + capybaras[i].nombre + "<img width='30px' height='30px' "+"src='images/capy.png'"+">";
            }
        }
    }

}

// Función para mostrar el estado actual del score
function displayScore() {
    let scoreElement = document.getElementsByClassName("score")[0];
    scoreElement.innerHTML = "Score: " + score.toString();
}

// Función para realizar apuestas, lo que hayamos apostado se nos resta al score
function betWinner() {

    winnerChoice = prompt("Introduce el nombre del capybara que crees que va a ganar");
    bet = parseInt(prompt("Introduce la cantidad de puntos que deseas apostar por el capybara:"));

    score -= bet;

}

// Función que recorre cada capybara y comprueba si alguno ya ha pasado la línea de meta
function checkWinner() {

    for (let i = 0; i < capybaras.length; i++) {
        if (capybaras[i].nombre.toLowerCase() === winnerChoice.toLowerCase() && capybaras[i].casillaActual >= LongitudCircuito) {
            score += bet * 10;
        }
    }

}