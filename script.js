const container = document.querySelector(".container");
const clear = document.querySelector(".clear-button");
const color = document.querySelector(".color-mode-button");
const rainbow = document.querySelector(".rainbow-mode-button");
const eraser = document.querySelector(".eraser-button");
const new_grid = document.querySelector(".new-grid-button");

const SIZE = 1024;
const DIM_LIMIT = 64;
let current_dimention = 16;
let isMouseDown = false;
let mode = "color";
let lastRainbowColor = ""; 

window.addEventListener("mousedown", () => (isMouseDown = true));
window.addEventListener("mouseup", () => (isMouseDown = false));

window.addEventListener("dragstart", (e) => e.preventDefault());

color.addEventListener("click", () => (mode = "color"));
rainbow.addEventListener("click", () => (mode = "rainbow"));
eraser.addEventListener("click", () => (mode = "eraser"));

function getColor() {
    if (mode === "eraser") {
        return "#FFFFFF"; 
    }
    if (mode === "color") {
        return "#000000"; 
    }
    if (mode === "rainbow") {
        const rainbowColors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#8B00FF'];
        let randomColor;
        do {
            const randomIndex = Math.floor(Math.random() * rainbowColors.length);
            randomColor = rainbowColors[randomIndex];
        } while (randomColor === lastRainbowColor);
        
        lastRainbowColor = randomColor;
        return randomColor;
    }
}

function colorSquare(square) {
    if (isMouseDown) {
        square.style.backgroundColor = getColor();
    }
}

function generateGrid(dim) {
    container.replaceChildren();
    
    for (let i = 0; i < dim; i++) {
        const new_row = document.createElement("div");
        new_row.classList.add("row");
        
        for (let j = 0; j < dim; j++) {
            const new_square = document.createElement("div");
            new_square.classList.add("square");
            new_square.style.width = `${SIZE / dim}px`;
            new_square.style.height = `${SIZE / dim}px`;
            
            new_square.addEventListener("mousedown", () => {
                isMouseDown = true;
                new_square.style.backgroundColor = getColor();
            });
            
            new_square.addEventListener("mouseenter", () => colorSquare(new_square));
            
            new_row.appendChild(new_square);
        }
        container.appendChild(new_row);
    }
}

clear.addEventListener("click", () => {
    generateGrid(current_dimention);
});

new_grid.addEventListener("click", () => {
    let newDim = prompt(`Enter new grid size (Max ${DIM_LIMIT}):`, current_dimention);
    
    if (newDim !== null) {
        newDim = parseInt(newDim);
        if (!isNaN(newDim) && newDim > 0 && newDim <= DIM_LIMIT) {
            current_dimention = newDim;
            generateGrid(current_dimention);
        } else {
            alert(`Please enter a valid number between 1 and ${DIM_LIMIT}.`);
        }
    }
});

generateGrid(current_dimention);
