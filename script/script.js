// This file willl act as a main controller


import { Layout } from './view/layout.js';
import { draw } from './view/layout.js';


export let canvas = document.getElementById("myCanvas");
export let ctx = canvas.getContext("2d");

let intervalID = 0;

let pause = false;




new Layout(canvas, ctx);


export function gameOver(){
    clearInterval(intervalID);
    document.location.reload();
}


const runButton = document.getElementById('runButton');
runButton.addEventListener("click", () => {
    intervalID = setInterval(draw, 10);    
    runButton.disabled = true;
})





const pauseButton = document.getElementById('pauseButton');
pauseButton.addEventListener('click', ()=>{
    if(pause === false){
        pause = true;
        pauseButton.textContent = 'Play';
    }
    else{
        pause = false;
        pauseButton.textContent = 'Pause';
    }
})




const resetButton = document.getElementById('resetButton');
resetButton.addEventListener("click", () => {
    document.location.reload();
    runButton.disabled = false;
})