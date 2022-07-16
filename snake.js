/* Next version to utilize Canvas API */

// Declare globals to track gameboard, score, snake, food
const LINE_PIXEL_COUNT = 40;
const TOTAL_PIXEL_COUNT = LINE_PIXEL_COUNT ** 2;
// ...to track score...
let totalFoodEaten = 0;
let totalDistanceTraveled = 0;
let foodIndex = 0;
// Reference to gameboard element
const gameContainer = document.getElementById('game-container');
// Generate gameboard
const createGameboardPixels = () => {
    for (let i = 1; i <= TOTAL_PIXEL_COUNT; i++) {
        let pixel = document.createElement('div');
        pixel.className = 'gameboard-pixel';
        pixel.id = `pixel-${i}`;
        gameContainer.appendChild(pixel);
    }
};
// Reference to all gameboard pixel elements
const gameboardPixels = document.getElementsByClassName('gameboard-pixel');
// Create randomly generated food items on gameboard
const createFood = () => {
    console.log(gameboardPixels[foodIndex].classList);
    if (gameboardPixels[foodIndex].classList.contains("food")) {
        gameboardPixels[foodIndex].classList.remove("food");
    }
    foodIndex = Math.floor(TOTAL_PIXEL_COUNT * Math.random());
    gameboardPixels[foodIndex].classList.add('food');
}
/* Snake behavior */
const LEFT_DIR = 37;
const UP_DIR = 38;
const RIGHT_DIR = 39;
const DOWN_DIR = 40;
let snakeDirection = RIGHT_DIR;
// Validate user input, change snake direction movement
const changeDirection = newDirection => {
    if (newDirection == snakeDirection) { return; }
    if (newDirection == LEFT_DIR && snakeDirection !== RIGHT_DIR) {
        snakeDirection = newDirection;
    }
    else if (newDirection == UP_DIR && snakeDirection !== DOWN_DIR) {
        snakeDirection = newDirection;
    }
    else if (newDirection == RIGHT_DIR && snakeDirection !== LEFT_DIR) {
        snakeDirection = newDirection;
    }
    else if (newDirection == DOWN_DIR && snakeDirection !== UP_DIR) {
        snakeDirection = newDirection;
    }
}