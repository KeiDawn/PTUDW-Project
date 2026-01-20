export const BOARD_SIZE = 20;

export const DIRECTIONS = {
  UP: 'UP',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT'
};

export function createInitialSnake() {
  return [{ x: 10, y: 10 }];
}

export function createFood(snake) {
  let food;
  do {
    food = {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE)
    };
  } while (snake.some(s => s.x === food.x && s.y === food.y));
  return food;
}

export function moveSnake(snake, direction) {
  const head = snake[0];
  let newHead = { ...head };

  switch (direction) {
    case DIRECTIONS.UP:
      newHead.y -= 1;
      break;
    case DIRECTIONS.DOWN:
      newHead.y += 1;
      break;
    case DIRECTIONS.LEFT:
      newHead.x -= 1;
      break;
    case DIRECTIONS.RIGHT:
      newHead.x += 1;
      break;
  }

  return [newHead, ...snake.slice(0, -1)];
}

export function checkCollision(snake) {
  const head = snake[0];

  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= BOARD_SIZE ||
    head.y >= BOARD_SIZE
  ) {
    return true;
  }

  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      return true;
    }
  }

  return false;
}
