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
// Snake starting index, length
let headIndex = TOTAL_PIXEL_COUNT / 2
let snakeLength = 200
// Move snake
const moveSnake = () => {
    switch (snakeDirection) {
        case LEFT_DIR:
            --headIndex;
            const isHeadAtLeft = (headIndex % LINE_PIXEL_COUNT == LINE_PIXEL_COUNT - 1) || (headIndex < 0)
            if (isHeadAtLeft) {
                headIndex += LINE_PIXEL_COUNT
            }
            break;
        case RIGHT_DIR:
            ++headIndex;
            const isHeadAtRight = headIndex % LINE_PIXEL_COUNT == 0
            if (isHeadAtRight) {
                headIndex -= LINE_PIXEL_COUNT
            }
            break;
        case UP_DIR:
            headIndex -= LINE_PIXEL_COUNT
            const isHeadAtTop = headIndex < 0
            if (isHeadAtTop) {
                headIndex += TOTAL_PIXEL_COUNT
            }
            break;
        case DOWN_DIR:
            headIndex += LINE_PIXEL_COUNT
            const isHeadAtBottom = headIndex > TOTAL_PIXEL_COUNT - 1
            if (isHeadAtBottom) {
                headIndex -= TOTAL_PIXEL_COUNT
            }
            break;
        default:
            break;
    }
    // Set snake head position in HTML
    let snakeHeadPixel = gameboardPixels[headIndex]
    // End game if snake collides with itself
    if (snakeHeadPixel.classList.contains('snake-body-pixel')) {
        clearInterval(moveSnakeInterval)
        alert(`GAME OVER! You consumed ${totalFoodEaten} apples and traveled ${totalDistanceTraveled} blocks!`)
        window.location.reload()
    }
    // Add snake body CSS to new empty pixel otherwise
    snakeHeadPixel.classList.add('snake-body-pixel')
}

createGameboardPixels();
createFood();

let moveSnakeInterval = setInterval(moveSnake, 100);