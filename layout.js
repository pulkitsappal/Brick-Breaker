import { drawBricks } from "./bricks.js";
import { collisionDetection } from "./collision.js";
import { drawScore } from './score.js';

let canvas = 0;   // initial value before actual value 
let ctx = 0;      // initial value before actual value
let x;
let y;
let dx = 2;
let dy = -2;
const ballRadius = 10;

let intervalID = 0;

const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = 0;

let rightPressed = false;
let leftPressed = false;

let score = 0;


export function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    x += dx;
    y += dy;


    //bouncing the left and right sides
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }

    //bouncing the top side and ending at bottom
    if (y + dy < ballRadius) {
        dy = -dy;
    }
    else if (y + dy > canvas.height - ballRadius) {
        if (x >= paddleX && x <= paddleX + paddleWidth) {
            dy = -dy
        }
        else {
            alert("GAME OVER");
            clearInterval(intervalID);
            document.location.reload();
        }
    }


    //Pressing the key
    document.addEventListener("keydown", function keyDownHandler(e) {
        if (e.key === "Right" || e.key === "ArrowRight") {
            rightPressed = true;
        } else if (e.key === "Left" || e.key === "ArrowLeft") {
            leftPressed = true;
        }
    });

    //Released the key
    document.addEventListener("keyup", function keyUpHandler(e) {
        if (e.key === "Right" || e.key === "ArrowRight") {
            rightPressed = false;
        } else if (e.key === "Left" || e.key === "ArrowLeft") {
            leftPressed = false;
        }
    });


    if (rightPressed) {
        paddleX += 5;
    } else if (leftPressed) {
        paddleX -= 5;
    }

    if (rightPressed) {
        paddleX = Math.min(paddleX + 7, canvas.width - paddleWidth);
    } else if (leftPressed) {
        paddleX = Math.max(paddleX - 7, 0);
    }


    drawBall();
    drawPaddle();
    drawBricks();
    collisionDetection(x, y, dy);
    drawScore(ctx, score);

}



function drawPaddle() {

    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();

}

function drawBall() {

    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2); // x, y, width, height
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();

}


class Layout {

    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.setData();
    }

    setData() {

        canvas = this.canvas
        ctx = this.ctx

        x = canvas.width / 2;
        y = canvas.height - 30;
        paddleX = (canvas.width - paddleWidth) / 2;

        this.startGame();
    }

    startGame() {
        intervalID = setInterval(draw, 10);
    }

}

export default Layout;