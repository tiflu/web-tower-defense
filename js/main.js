const grid = new Grid(20, document.getElementById("grid"));
const player = new Player();

window.addEventListener("keydown", () => {
    player.earn(100);
})

updateInfo();

// const pathCoords = [[0, 0], [0, 1], [0, 2], [1, 2], [2, 2], [3, 2], [3, 3], [3, 4], [4, 4]];
const pathCoords = [[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[5,1],[5,2],[5,3],[5,4],[5,5],[5,6],[5,7],[6,7],[7,7],[8,7],[9,7],[10,7],[11,7],[12,7],[13,7],[13,8],[13,9],[13,10],[13,11],[13,12],[13,13],[13,14],[14,14],[15,14],[16,14],[17,14],[18,14],[19,14],[19,15],[19,16],[19,17],[19,18],[19,19]]

grid.updatePath(pathCoords);

// grid.randomPathHelper();

// grid.createPathWithUI();

setInterval(() => {
    new Enemy("triangle.png", 1, 1, Math.random()*5);
}, 500)
//
//
new Enemy("triangle.png", 50);

heatMap();

function heatMap() {
    setInterval(() => {
        for (const path of grid.path) {
            if (path.enemies.length > 0) {
                const a = path.enemies.length;
                path.DOMElement.style.backgroundColor = `rgb(${a*20}, ${a*10}, ${a*10})`
            } else {
                path.DOMElement.style.backgroundColor = "";
            }
        }
    }, 10)
}

// grid.walkPath();

function makeElementIntoGrid(element, size=40) {
    const bounds = element.getBoundingClientRect();
    const height = bounds.bottom - bounds.top;
    const width = bounds.right - bounds.left;
    const smallestSide = Math.min(height, width);
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const object = document.createElement("div");
            const hue = randInt(360) + "";
            const saturation = randInt() + "%";
            const lightness = randInt() + "%";
            object.style.backgroundColor = `hsl(${hue}, ${saturation}, ${lightness})`;
            object.style.position = "absolute";
            object.style.top = smallestSide / size * i + "px";
            object.style.left = smallestSide / size * j + "px";
            object.style.height = smallestSide / size + "px";
            object.style.width = smallestSide / size + "px";
            element.append(object);
        }
    }

    element.lastElementChild.style.cursor = "click";

    function randInt(max=100) {
        return Math.ceil(Math.random() * max);
    }
}

function makeElementIntoCSSGrid(element, size=40) {
    element.classList.add("gridParent");
    element.style.gridTemplateColumns = "1fr ".repeat(size).trim();
    element.style.gridTemplateRows = "1fr ".repeat(size).trim();
    for (let i = 0; i < size*size; i++) {
        const object = document.createElement("div");
        const hue = randInt(360) + "";
        const saturation = randInt() + "%";
        const lightness = randInt() + "%";
        object.style.backgroundColor = `hsl(${hue}, ${saturation}, ${lightness})`;
        element.append(object);
    }
}


async function wait(ms) {
    return new Promise((res, rej) => {
        setTimeout(() => res(), ms)
    })
}

function randInt(max=100) {
    return Math.floor(Math.random() * max);
}


function download(content, fileName, contentType) {
    const a = document.createElement("a");
    const file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

// const container = [[1, 1], [0, 1], [2, 1]]
// const array = [0, 1]
// const result = arrayContainsArray(container, array)
// console.log(result);
//
// function arrayContainsArray(container, subArray) {
//     for (const array of container) {
//         if (array.length !== subArray.length) continue;
//         for (const index in array) {
//             // console.log(array[index], subArray[index]);
//             if (array[index] !== subArray[index]) break;
//             console.log(index, array.length-1)
//             if (index === array.length-1) return true;
//         }
//     }
//     return false;
// }