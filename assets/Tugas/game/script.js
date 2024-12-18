const board = document.getElementById("game-board");
const scoreDisplay = document.getElementById("score");
const restartButton = document.getElementById("restart-btn");

const boardSize = 20; // Ukuran papan 20x20
let snake = [{ x: 10, y: 10 }]; // Posisi awal ular
let direction = { x: 0, y: 0 };
let food = generateFood();
let score = 0;
let gameInterval;

// Membuat papan permainan
for (let i = 0; i < boardSize * boardSize; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  board.appendChild(cell);
}

// Update permainan
function updateGame() {
  moveSnake();
  if (isGameOver()) {
    alert(`Game Over! Final Score: ${score}`);
    clearInterval(gameInterval);
    return;
  }
  if (isFoodEaten()) {
    growSnake();
    food = generateFood();
    updateScore();
  }
  draw();
}

// Gerakan ular
function moveSnake() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
  snake.unshift(head);
  if (!isFoodEaten()) snake.pop();
}

// Periksa apakah makanan dimakan
function isFoodEaten() {
  return snake[0].x === food.x && snake[0].y === food.y;
}

// Tumbuhkan ular
function growSnake() {
  snake.push({ ...snake[snake.length - 1] });
}

// Perbarui skor
function updateScore() {
  score += 10;
  scoreDisplay.textContent = `Score: ${score}`;
}

// Gambar ulang papan permainan
function draw() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach(cell => cell.className = "cell");

  // Gambar ular
  snake.forEach(segment => {
    const index = segment.y * boardSize + segment.x;
    if (index >= 0 && index < cells.length) {
      cells[index].classList.add("snake");
    }
  });

  // Gambar makanan
  const foodIndex = food.y * boardSize + food.x;
  cells[foodIndex].classList.add("food");
}

// Periksa apakah game selesai
function isGameOver() {
  const head = snake[0];
  const hitWall = head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize;
  const hitSelf = snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
  return hitWall || hitSelf;
}

// Buat makanan secara acak
function generateFood() {
  let newFood;
  while (!newFood || snake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
    newFood = {
      x: Math.floor(Math.random() * boardSize),
      y: Math.floor(Math.random() * boardSize),
    };
  }
  return newFood;
}

// Kontrol arah
window.addEventListener("keydown", e => {
  switch (e.key) {
    case "ArrowUp": if (direction.y === 0) direction = { x: 0, y: -1 }; break;
    case "ArrowDown": if (direction.y === 0) direction = { x: 0, y: 1 }; break;
    case "ArrowLeft": if (direction.x === 0) direction = { x: -1, y: 0 }; break;
    case "ArrowRight": if (direction.x === 0) direction = { x: 1, y: 0 }; break;
  }
});

// Restart permainan
restartButton.addEventListener("click", resetGame);

function resetGame() {
  clearInterval(gameInterval);
  snake = [{ x: 10, y: 10 }];
  direction = { x: 0, y: 0 };
  food = generateFood();
  score = 0;
  scoreDisplay.textContent = "Score: 0";
  startGame();
}

function startGame() {
  gameInterval = setInterval(updateGame, 200);
}

startGame();



