
let bombeiro = document.getElementById("bombeiro");
let victims = document.querySelectorAll(".victim");
let fires = document.querySelectorAll(".fire");
let scoreDisplay = document.getElementById("score");
let startButton = document.getElementById("start-btn");
let gameContainer = document.getElementById("game");

let score = 0;
let gameInterval;

function moveBombeiro(event) {
    const step = 10;
    let rect = bombeiro.getBoundingClientRect();
    let containerRect = gameContainer.getBoundingClientRect();

    switch (event.key) {
        case "ArrowUp":
            if (rect.top > containerRect.top + step) {
                bombeiro.style.top = bombeiro.offsetTop - step + "px";
            }
            break;
        case "ArrowDown":
            if (rect.bottom < containerRect.bottom - step) {
                bombeiro.style.top = bombeiro.offsetTop + step + "px";
            }
            break;
        case "ArrowLeft":
            if (rect.left > containerRect.left + step) {
                bombeiro.style.left = bombeiro.offsetLeft - step + "px";
            }
            break;
        case "ArrowRight":
            if (rect.right < containerRect.right - step) {
                bombeiro.style.left = bombeiro.offsetLeft + step + "px";
            }
            break;
    }
    checkCollisions();
}

function checkCollisions() {
    victims.forEach((victim) => {
        if (isColliding(bombeiro, victim)) {
            victim.style.display = "none";
            score += 10;
            scoreDisplay.textContent = `Pontuação: ${score}`;
        }
    });

    fires.forEach((fire) => {
        if (isColliding(bombeiro, fire)) {
            fire.style.display = "none";
            score += 20;
            scoreDisplay.textContent = `Pontuação: ${score}`;
        }
    });
}

function isColliding(a, b) {
    const rect1 = a.getBoundingClientRect();
    const rect2 = b.getBoundingClientRect();

    return !(
        rect1.top > rect2.bottom ||
        rect1.bottom < rect2.top ||
        rect1.right < rect2.left ||
        rect1.left > rect2.right
    );
}

function startGame() {
    score = 0;
    scoreDisplay.textContent = "Pontuação: 0";
    victims.forEach((victim) => (victim.style.display = "block"));
    fires.forEach((fire) => (fire.style.display = "block"));
    bombeiro.style.top = "185px";
    bombeiro.style.left = "185px";
    window.addEventListener("keydown", moveBombeiro);
    startButton.disabled = true;
}

startButton.addEventListener("click", startGame);
