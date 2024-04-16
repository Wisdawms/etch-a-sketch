const container = document.querySelector('#container');
const gridSizeBtn = document.querySelector('#grid-size-btn');
const clearGridBtn = document.querySelector('#clear-grid-btn');
const drawModeBtn = document.querySelector('#draw-mode-btn');
const gridOutlinesBtn = document.querySelector('#grid-outlines-btn');
const rainbowModeBtn = document.querySelector('#rainbow-mode-btn');

let gridSize = 16;
let boxHeight = null;
let boxWidth = null;

let drawMode = true;
let gridOutlines = true;
let rainbowMode = false;

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function initGrid() {

    const origChildrenCount = container.childElementCount;
    // delete boxes to make space for new grid size
    if (container.childElementCount > gridSize * gridSize) {
        for (let i = 0; i < (origChildrenCount - gridSize * gridSize); i++) {
            container.removeChild(container.lastChild);
        }
    }
    boxHeight = 40 / gridSize;
    boxWidth = 40 / gridSize;

    for (let i = 0; i < (gridSize * gridSize - origChildrenCount); i++) {
        const box = document.createElement('div');
        box.className = 'box';
        box.style.borderWidth = 1 + "px";
        container.appendChild(box);
    }

    document.querySelectorAll('.box').forEach((child) => {

        child.style.width = boxWidth + 'rem';
        child.style.height = boxHeight + 'rem';
        child.addEventListener('mouseenter', () => {
            child.classList.add('active');
            if (rainbowMode) {
                const randColour = getRandomColor();
                child.style.backgroundColor = `${randColour}`;
                child.style.boxShadow = `0 0 2rem ${randColour}`;
            }
            else {
                child.style.backgroundColor = `greenyellow`;
                child.style.boxShadow = `0 0 2rem`;
            }

        });
    });
    updateRules();
}

gridSizeBtn.addEventListener('click', () => {
    const inputGridSize = prompt('Enter a new grid size (1-100)');
    if (inputGridSize >= 1 && inputGridSize <= 100) {
        gridSize = Math.round(inputGridSize);
        console.log(gridSize);
        initGrid();
    }
    else {
        alert('Please input a valid number!')
    }
});


window.onload = function () {
    initGrid();
}

clearGridBtn.addEventListener('click', () => {
    document.querySelectorAll('.box').forEach((child) => {
        child.classList.remove('active');
        child.style.backgroundColor = '';
        child.style.boxShadow = '0 0 0rem';
    });
});

document.querySelectorAll('button.hoverable').forEach(child => {
    child.addEventListener('mouseenter', () => {
        child.classList.toggle('active-btn');
    });
    child.addEventListener('mouseleave', () => {
        child.classList.toggle('active-btn');
    });
});

drawModeBtn.addEventListener('click', () => {
    drawModeBtn.classList.toggle('active-btn');
    drawMode = !drawMode;
    updateRules();
});

gridOutlinesBtn.addEventListener('click', () => {
    gridOutlinesBtn.classList.toggle('active-btn');
    gridOutlines = !gridOutlines;
    updateRules();
});

rainbowModeBtn.addEventListener('click', () => {
    rainbowModeBtn.classList.toggle('active-btn');
    rainbowMode = !rainbowMode;
});

function ghostTrails(child) {
    setTimeout(() => {
        child.style.backgroundColor = "transparent";
        child.style.boxShadow = "0 0 0 transparent";
    }, 200)
}

document.querySelectorAll('.box').forEach(child => {
    child.addEventListener('mouseleave', ghostTrails(child));
})
function updateRules() {
    const boxes = document.querySelectorAll('.box');
    if (!drawMode) {
        // set to transparent on mouse leave
        boxes.forEach(child => {
            child.onmouseleave = () => ghostTrails(child);
        })
    }
    else {
        boxes.forEach(child => {
            child.onmouseleave = () => { false };
        })
    }

    if (gridOutlines) {
        boxes.forEach(child => {
            child.style.borderWidth = 1 + "px";
        })
    }
    else if (gridOutlines == false) {
        boxes.forEach(child => {
            child.style.borderWidth = "0";
        })
    }

}
