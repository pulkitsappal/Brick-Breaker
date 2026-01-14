import { brickColumnCount, brickRowCount, brickHeight, brickWidth, bricks } from "../view/bricks.js";

export let score = 0;

export function collisionDetection(x, y, dy) {

    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const b = bricks[c][r];

            if (b.status === 1) {
                if (x > b.x && x < (b.x + brickWidth) && y > b.y && y < (b.y + brickHeight)) {
                    dy = -dy;
                    b.status = 0;
                    console.log("score : " + score++);
                }
            }

        }
    }

}