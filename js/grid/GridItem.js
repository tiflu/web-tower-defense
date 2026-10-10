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