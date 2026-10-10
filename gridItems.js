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
        this.enemies = [];
    }

    createDOMElement() {
        const element = super.createDOMElement();
        element.classList.add("path");
        element.addEventListener("click", () => {
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
            // todo all towers
            clearUpgrades();
            insertTowerPurchase(this, new PeaShooter());
        });

        return element;

    }
}