import { drawBricks } from "./bricks.js";
import { collisionDetection } from "../controller/collision.js";
import { drawScore } from '../controller/score.js';
import { canvas, ctx, gameOver } from '../script.js'; 


let x, y;
let dx = 2;
let dy = -2;
const ballRadius = 10;


const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = 0;

let rightPressed = false;
let leftPressed = false;



export function endGame() {

    alert('YOU WIN!!!!');
    clearInterval(intervalID);
    document.location.reload();

}




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
            dy = -dy;
        }
        else {
            alert("GAME OVER");
            gameOver();
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
    drawScore();

}



function drawPaddle() {

    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);  //x, y, width, height
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();

}

function drawBall() {

    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();

}


export class Layout {

    constructor() {

        x = canvas.width / 2;
        y = canvas.height - 30;
        paddleX = (canvas.width - paddleWidth) / 2;

        drawBall();
        drawPaddle();
        drawBricks();
        drawScore();

    }

}