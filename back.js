class Grid {

    constructor(size, element) {
        this.size = size;
        this.DOMElement = element;
        this.items = this.initializeGrid(size);
        this.path = [];

        element.classList.add("gridParent");
        element.style.gridTemplateColumns = "1fr ".repeat(size).trim();
        element.style.gridTemplateRows = "1fr ".repeat(size).trim();
    }

    initializeGrid(size) {
        const array = [];
        for (let i = 0; i < size; i++) {
            const row = [];
            for (let j = 0; j < size; j++) {
                const gridItem = new Empty(i, j, this);

                row.push(gridItem);
                this.DOMElement.append(gridItem.DOMElement);
            }
            array.push(row);
        }
        return array;
    }

    replaceGridItem(item) {
        this.DOMElement.children[item.x * this.size + item.y].replaceWith(
            item.DOMElement);
    }

    replaceGridItems(items) {
        for (const item of items) {
            this.replaceGridItem(item);
        }
    }

    updatePath(pathArray) {
        this.path = [];

        // Array of GridItems
        if (pathArray[0] instanceof GridItem) {
            this.path = pathArray
        // Array of coordinate pairs
        } else {
            for (const coords of pathArray) {
                this.path.push(new Path(coords[0], coords[1]));
            }
        }
        this.replaceGridItems(this.path);
    }

    randomPathHelper() {
        this.updatePath(this.createRandomPath());
    }

    createRandomPath() {

        // todo VERY UNOPTIMIZED
        // todo crashes sometimes
        // todo can still have touching paths
        //    fix this by checking directly adjacent squares for the other one right after placement?

        const start = [0, 0]
        const end = [this.size-1, this.size-1];
        const startArray = [start];
        const endArray = [end];
        let startFailed = false;
        let endFailed = false;
        let lastStart = start;
        let lastEnd = end;

        while (true) {

            // if (startFailed && endFailed) return this.createRandomPath(x+1);

            if (!startFailed) {
                const next = step(lastStart, startArray, this.size);
                if (next) {
                    if (arrayContainsArray(endArray, next)) return onCollision(next, startArray, endArray, true);
                    startArray.push(next);
                    lastStart = next;
                } else {
                    startFailed = true;
                }
            }

            if (!endFailed) {
                const next = step(lastEnd, endArray, this.size);
                if (next) {
                    if (arrayContainsArray(startArray, next)) return onCollision(next, endArray, startArray, false);
                    endArray.push(next);
                    lastEnd = next;
                } else {
                    endFailed = true;
                }
            }
        }

        // Collider is IN the collided array, colliding array tried to run into it
        function onCollision(collider, collidingArray, collidedArray, collidingIsStart) {
            const cutArray = collidedArray.slice(0, getSubArrayIndex(collidedArray, collider) + 1);
            console.log(cutArray);
            if (collidingIsStart) {
                return collidingArray.concat(cutArray);
            } else {
                return cutArray.concat(collidingArray);
            }
        }


        function step(lastPath, array, size) {
            const possibleSteps = [];

            for (let i = -1; i < 2; i+=2) {
                const possibleX = lastPath[0]+i;
                const possibleY = lastPath[1];
                if (check(i, 0, possibleX, possibleY, array, size)) {
                    possibleSteps.push([possibleX, possibleY])
                }
            }

            for (let i = -1; i < 2; i+=2) {
                const possibleX = lastPath[0];
                const possibleY = lastPath[1]+i;
                if (check(0, i, possibleX, possibleY, array, size)) {
                    possibleSteps.push([possibleX, possibleY])
                }
            }


            if (possibleSteps.length === 0) {
                return null;
            } else {
                return possibleSteps[randInt(possibleSteps.length)]
            }

            // Have to pass size in because "this" (e.g. this.size) does not point
            // to the object on child functions.
            function check(dX, dY, x, y, array, size) {
                // if moving left/right
                if (dY === 0) {
                    if (x + dX < 0 || x + dX >= size) return false;
                    for (let i = -1; i < 2; i++) {
                        // console.log(array.slice(), [x + dX, y+i]);
                        if (arrayContainsArray(array, [x + dX, y+i])) return false;
                    }
                    return true;
                // if moving up/down
                } else if (dX === 0) {
                    if (y + dY < 0 || y + dY >= size) return false;
                    for (let i = -1; i < 2; i++) {
                        if (arrayContainsArray(array, [y + dY, x+i])) return false;
                    }
                    return true;
                } else {
                    throw new Error("Invalid check!");
                }
            }
        }

        function arrayContainsArray(container, subArray) {
            return getSubArrayIndex(container, subArray) >= 0;
        }

        function getSubArrayIndex(container, subArray) {
            for (const array of container) {
                if (array.length !== subArray.length) continue;
                for (let i = 0; i < array.length; i++) {
                    if (array[i] !== subArray[i]) break;
                    if (i === array.length-1) {
                        return container.indexOf(array);
                    }
                }
            }
            return -1;
        }
    }

    async walkPath() {
        let previous = null
        for (const pathObj of this.path) {
            pathObj.DOMElement.style.backgroundColor = "orange";
            if (previous) previous.DOMElement.style.backgroundColor = "";
            previous = pathObj;
            await wait(500);
        }
        previous.DOMElement.style.backgroundColor = "";
    }
}

class GridItem {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.DOMElement = this.createDOMElement();
    }

    createDOMElement() {
        const element = document.createElement("div");
        element.classList.add("gridItem");
        return element;
    }

}

class Path extends GridItem {
    constructor(x, y) {
        super(x, y);
    }

    createDOMElement() {
        const element = super.createDOMElement();
        element.classList.add("path");
        element.addEventListener("click", () => {
            element.style.backgroundColor = "blue";
        });

        return element;
    }
}

class Empty extends GridItem {
    constructor(x, y) {
        super(x, y);
    }

    createDOMElement() {
        const element = super.createDOMElement();
        element.classList.add("empty");

        element.addEventListener("click", () => {
            element.style.backgroundColor = "red";
        })

        return element;

    }
}