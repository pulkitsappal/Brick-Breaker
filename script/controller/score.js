import { score } from '../controller/collision.js'
import { endGame } from '../view/layout.js';
import { brickRowCount, brickColumnCount } from '../view/bricks.js';
import { ctx } from '../script.js';


export function drawScore() {

  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText(`Score: ${score}`, 8, 20);

  if(score == (brickRowCount * brickColumnCount)){
    endGame();
  }

}