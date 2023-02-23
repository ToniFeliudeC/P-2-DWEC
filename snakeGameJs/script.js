
// Constantes del juego.
const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "white";
const snakeColour = "purple";
const snakeBorder = "black";
const foodColor = "red";
const unitSize = 25;

// Variables
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;

// La serpientes
let snake = [
    {x:unitSize * 4, y:0},
    {x:unitSize * 3, y:0},
    {x:unitSize * 2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0}
];

window.addEventListener("keydown", changeDirection);

resetBtn.addEventListener("click", resetGame);

gameStart();

// Esta es la función que inicia el juego, la cual llamará a las funciones iniciales, pero en especial a la
// función que se actualizará cada frame, "nextTick()"
function gameStart() {
    running = true;
    scoreText.textContent = score;
    createFood();
    drawFood();
    nextTick();
}

// Esta función se ejecuta cada 50 milisegundos y es la que hace que el juego ocurra, todo juego necesita
// algún tipo de bucle que se actualice cada frame, en este caso usaremos la funión "setTimeout()" para ello.
function nextTick() {
    if (running) {
        setTimeout(() => {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkPlayerLost();
            nextTick();
        }, 50);
    }
    else {
        showGameOver();
    }
}

// Con esta función vacíamos el canvas.
function clearBoard() {
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
}

// Para crear una nueva manzana en una coordenada aleatoria del canvas.
function createFood() {
    function randomFood(min, max) {
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randNum;
    }

    foodX = randomFood(0, gameWidth - unitSize);
    foodY = randomFood(0, gameWidth - unitSize);
    
    console.log(foodX / 25);
    console.log(foodY / 25);
}

// Dibuja la coordenada de la manzana con su color respondiente, esa coordenada la obtenemos
// accediendo a las variables foodX y foodY cuyo valor ha sido modificado en create
function drawFood() {
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
}

function moveSnake() {
    const head = {x: snake[0].x + xVelocity,
                  y: snake[0].y + yVelocity};

    snake.unshift(head);
    // Si come una manzana sumamos 1 a score y actualizamos el contenido, además creamos una nueva manzana.
    if (snake[0].x == foodX && snake[0].y == foodY) {
        score++;
        scoreText.textContent = score;
        createFood();
    }
    // Sinó, simplemente quitamos el último bloque de la serpiente
    else {
        snake.pop();
    }
}

// Función para mostrar la serpiente en el canvas.
function drawSnake() {
    ctx.fillStyle = snakeColour;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    });
}

// Función para cambiar la dirección
function changeDirection(event) {
    const keyPressed = event.keyCode;
    console.log(keyPressed);
    const LEFT = 65;
    const RIGHT = 68;
    const UP = 87;
    const DOWN = 83;

    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingRight = (xVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);

    switch (true) {
        case (keyPressed == LEFT && !goingRight):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        case (keyPressed == UP && !goingDown):
            xVelocity = 0;
            yVelocity = -unitSize;
            break;
        case (keyPressed == RIGHT && !goingLeft):
            xVelocity = unitSize;
            yVelocity = 0;
            break;
        case (keyPressed == DOWN && !goingUp):
            xVelocity = 0;
            yVelocity = unitSize;
            break;
    }
}

// Función para comprobar si el jugador ha perdido.
function checkPlayerLost() {

    // En este switch comprobamos si la cabeza de la serpiente ha tocado alguna pared del canvas
    switch (true) {
        case (snake[0].x < 0):
            running = false;
            break;
        case (snake[0].x >= gameWidth):
            running = false;
            break;
        case (snake[0].y < 0):
            running = false;
            break;
        case (snake[0].y >= gameHeight):
            running = false;
            break;
    }

    // En este for comprobamos si la cabeza de la serpiente ha tocado su propio cuerpo
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
            running = false;
        }
    }
}

// Función que simplemente rellena el contenido del canvas con GAME OVER cuando la llamemos.
function showGameOver() {
    ctx.font = "50px MC Boli";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", gameWidth / 2, gameHeight / 2);
    running = false;
}

// Función para resetear el juego asignando los valores iniciales a todas las variables.
function resetGame() {
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
        {x:unitSize * 4, y:0},
        {x:unitSize * 3, y:0},
        {x:unitSize * 2, y:0},
        {x:unitSize, y:0},
        {x:0, y:0}
    ];
    gameStart();

}