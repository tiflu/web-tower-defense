const grid = new Grid(5, document.getElementById("gameWindow"));

const pathCoords = [[0, 0], [0, 1], [0, 2], [1, 2], [2, 2], [3, 2], [3, 3], [3, 4], [4, 4]];

// grid.updatePath(pathCoords);

grid.randomPathHelper();

// grid.walkPath();

function makeElementIntoGrid(element, size=40) {
    const bounds = element.getBoundingClientRect();
    const height = bounds.bottom - bounds.top;
    const width = bounds.right - bounds.left;
    const smallestSide = Math.min(height, width);
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            console.log(i, j)
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
    console.log(element.lastElementChild);

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