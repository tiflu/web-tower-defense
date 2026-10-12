class Empty extends Tile {
    constructor(x, y) {
        super(x, y);
    }

    createDOMElement() {
        const element = super.createDOMElement();
        element.classList.add("empty");

        return element;

    }

    onClick(element) {
        const lastClicked = document.querySelector(".tile.clicked");
        if (lastClicked) {
            lastClicked.classList.remove("clicked");
        }

        element.classList.add("clicked");
        clearUpgrades();
        insertTowerPurchases(this);
    }
}