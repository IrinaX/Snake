let btnSet = document.getElementById('btnSet');
let lvlSet = document.getElementById('lvlSet');
let btnStart = document.getElementById('btnStart');

btnSet.onclick = toggleSettings;

function toggleSettings() {
    lvlSet.classList.toggle('block');
}

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
let box = 32;
let newScore = document.getElementById('score');
let score = 0;
newScore.innerHTML = score;

let food = {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box
};
while (food.x === 288 && food.y === 320) {
    food.x = Math.floor((Math.random() * 17 + 1)) * box;
    food.y = Math.floor((Math.random() * 15 + 3)) * box;
}

let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
};

document.addEventListener("keydown", direction);
let dir;

function direction(event) {
    if (event.keyCode === 37 && dir !== 'right')
        dir = 'left';
    else if (event.keyCode === 38 && dir !== 'down')
        dir = 'up';
    else if (dir !== 'left' && event.keyCode === 39)
        dir = 'right';
    else if (dir !== 'up' && event.keyCode === 40)
        dir = 'down';
}

let game;
function setLevel() {
    let form = document.forms.choseLevel;
    let timeout = Number(form.elements.level.value);
    console.log(timeout);

    canvas.style.display = 'block';
    if (timeout === 100) {
        game = setInterval(drawGame, 100);
    } else if (timeout === 200) {
        game = setInterval(drawGame, 200);
    } else if (timeout === 300) {
        game = setInterval(drawGame, 300);
    }
    toggleSettings();
}

btnStart.onclick = setLevel;

function restartGame() {
    clearInterval(game);
    setTimeout(() => alert('you lose'), 0);
    location.reload();
}

function eatTail(head, snakeBody) {
    for (let i = 0; i < snakeBody.length; i++) {
        if (head.x === snakeBody[i].x && head.y === snakeBody[i].y) {
            restartGame();
        }
    }
}


function drawGame() {

    ctx.clearRect(0, 0, 608, 608);
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "yellow" : "green";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }
    // ctx.fillStyle = "white";
    // ctx.font = "50px Arial";
    // ctx.fillText(score, box * 1.5, box * 1.5);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;


    if ((snakeX > 576) || (snakeX < 0) || (snakeY < 0) || (snakeY > 576)) {
        restartGame();
    }
    if (snakeX === food.x && snakeY === food.y) {
        score++;
        newScore.innerHTML = score;
        food = {
            x: Math.floor((Math.random() * 17 + 1)) * box,
            y: Math.floor((Math.random() * 15 + 3)) * box,
        };
        for (let i = 0; i < snake.length; i++) {
            while (food.x === snake[i].x && food.y === snake[i].y) {
                food.x = Math.floor((Math.random() * 17 + 1)) * box;
                food.y = Math.floor((Math.random() * 15 + 3)) * box;
            }
        }
    } else {
        snake.pop();
    }

    console.log(dir);
    if (dir === "left") snakeX -= box;
    if (dir === "right") snakeX += box;
    if (dir === "up") snakeY -= box;
    if (dir === "down") snakeY += box;

    let newHead = {
        x: snakeX,
        y: snakeY
    };
    eatTail(newHead, snake);

    snake.unshift(newHead);/*добавляет элем в начало массива*/
}

// let game = setInterval(drawGame, 300);
