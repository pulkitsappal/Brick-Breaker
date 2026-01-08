import Layout from './layout.js';


let canvas = document.getElementById("myCanvas");
export let ctx = canvas.getContext("2d");



function startGame() {
    
    new Layout(canvas, ctx);    
}



const runButton = document.getElementById('runButton');
runButton.addEventListener("click", () => {
    startGame();
    runButton.disabled = true;
})

const pauseButton = document.getElementById('pauseButton');


const resetButton = document.getElementById('resetButton');
resetButton.addEventListener("click", () => {
    document.location.reload();
    runButton.disabled = false;
})