class Grid {

    constructor(size, element) {
        this.size = size;
        this.DOMElement = element;
        this.items = this.initializeGrid(size);
        this.path = new GridPath();

        element.classList.add("gridParent");
        element.style.gridTemplateColumns = "1fr ".repeat(size).trim();
        element.style.gridTemplateRows = "1fr ".repeat(size).trim();
    }

    initializeGrid(size) {
        const array = [];
        for (let i = 0; i < size; i++) {
            const row = [];
            for (let j = 0; j < size; j++) {
                const tile = new Empty(i, j, this);

                row.push(tile);
                this.DOMElement.append(tile.DOMElement);
            }
            array.push(row);
        }
        return array;
    }

    replaceTile(item) {
        this.items[item.x][item.y] = item;
        this.DOMElement.children[item.x * this.size + item.y].replaceWith(
            item.DOMElement);
    }

    replaceTiles(items) {
        for (const item of items) {
            this.replaceTile(item);
        }
    }

    updatePath(newPath) {
        this.replaceTiles(this.path.updatePath(newPath));
    }

    getPathTiles() {
        return this.path.pathTiles;
    }

    getPathByIndex(index) {
        return this.path.pathTiles[index];
    }

    coordinateInBounds(num) {
        return num >= 0 && num < this.size;
    }

    coordinatesInBounds(x, y) {
        return this.coordinateInBounds(x) && this.coordinateInBounds(y);
    }
}