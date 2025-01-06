
let bombeiro = document.getElementById("bombeiro");
let victims = document.querySelectorAll(".victim");
let fires = document.querySelectorAll(".fire");
let scoreDisplay = document.getElementById("score");
let startButton = document.getElementById("start-btn");
let gameContainer = document.getElementById("game");

let score = 0;
let speed = 10;
let gameInterval;
let touchStartX = 0;
let touchStartY = 0;

function moveBombeiro(event) {
    const step = speed;
    let rect = bombeiro.getBoundingClientRect();
    let containerRect = gameContainer.getBoundingClientRect();

    if (event.key) {
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
    } else if (event.type === "touchmove") {
        const touch = event.touches[0];
        const deltaX = touch.clientX - touchStartX;
        const deltaY = touch.clientY - touchStartY;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // Horizontal movement
            if (deltaX > 0 && rect.right < containerRect.right - step) {
                bombeiro.style.left = bombeiro.offsetLeft + step + "px";
            } else if (deltaX < 0 && rect.left > containerRect.left + step) {
                bombeiro.style.left = bombeiro.offsetLeft - step + "px";
            }
        } else {
            // Vertical movement
            if (deltaY > 0 && rect.bottom < containerRect.bottom - step) {
                bombeiro.style.top = bombeiro.offsetTop + step + "px";
            } else if (deltaY < 0 && rect.top > containerRect.top + step) {
                bombeiro.style.top = bombeiro.offsetTop - step + "px";
            }
        }
    }
    checkCollisions();
}

function checkCollisions() {
    victims.forEach((victim) => {
        if (isColliding(bombeiro, victim)) {
            victim.style.display = "none";
            score += 10;
            scoreDisplay.textContent = `Pontuação: ${score}`;
            adjustDifficulty();
        }
    });

    fires.forEach((fire) => {
        if (isColliding(bombeiro, fire)) {
            fire.style.display = "none";
            score += 20;
            scoreDisplay.textContent = `Pontuação: ${score}`;
            adjustDifficulty();
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

function adjustDifficulty() {
    if (score % 50 === 0) {
        speed += 2; // Aumenta a velocidade
        spawnRandomFire(); // Adiciona mais fogo
    }
}

function spawnRandomFire() {
    const fire = document.createElement("div");
    fire.classList.add("fire");
    fire.style.top = Math.random() * (gameContainer.offsetHeight - 30) + "px";
    fire.style.left = Math.random() * (gameContainer.offsetWidth - 30) + "px";
    gameContainer.appendChild(fire);
    fires = document.querySelectorAll(".fire");
}

function startGame() {
    score = 0;
    speed = 10;
    scoreDisplay.textContent = "Pontuação: 0";
    victims.forEach((victim) => (victim.style.display = "block"));
    fires.forEach((fire) => (fire.style.display = "block"));
    bombeiro.style.top = "185px";
    bombeiro.style.left = "185px";
    gameContainer.innerHTML += '<div class="victim" style="top: 100px; left: 250px;"></div>';
    victims = document.querySelectorAll(".victim");
    fires = document.querySelectorAll(".fire");
    window.addEventListener("keydown", moveBombeiro);
    gameContainer.addEventListener("touchstart", (event) => {
        const touch = event.touches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
    });
    gameContainer.addEventListener("touchmove", moveBombeiro);
    startButton.disabled = true;
}

startButton.addEventListener("click", startGame);
