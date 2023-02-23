const LongitudCircuito = 16;
let winnerChoice = "";
let score = 10000;
let bet = 0;

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

function clearCasillas() {
    let casillas = document.getElementsByClassName("casillas");
    for (let i = 0; i < casillas.length; i++) {
        casillas[i].innerHTML = "";
    }
}

function mostrarEnCasilla(capybaras) {

    let casillas = document.getElementsByClassName("casillas");

    for (let i = 0; i < capybaras.length; i++) {
        for (let j = 0; j < casillas.length; j++) {
            if (parseInt(casillas[j].id) === capybaras[i].casillaActual) {
                casillas[j].innerHTML +=  " " + capybaras[i].nombre + "<img width='100px' height='100px' "+"src='images/capy.png'"+">";
            }
        }
    }

}

function displayScore() {
    let scoreElement = document.getElementsByClassName("score")[0];
    scoreElement.innerHTML = "Score: " + score.toString();
}

function betWinner() {

    winnerChoice = prompt("Introduce el nombre del capybara que crees que va a ganar");
    bet = parseInt(prompt("Introduce la cantidad de puntos que deseas apostar por el capybara:"));

    score -= bet;

}

function checkWinner() {

    for (let i = 0; i < capybaras.length; i++) {
        if (capybaras[i].nombre === winnerChoice && capybaras[i].casillaActual >= LongitudCircuito) {
            score += bet * 10;
        }
    }

    

}