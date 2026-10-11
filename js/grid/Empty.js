class Empty extends Tile {
    constructor(x, y) {
        super(x, y);
    }

    createDOMElement() {
        const element = super.createDOMElement();
        element.classList.add("empty");

        element.addEventListener("click", () => {
            const lastClicked = document.querySelector(".tile.clicked");
            if (lastClicked) {
                lastClicked.classList.remove("clicked");
            }

            element.classList.add("clicked");
            // todo all towers
            clearUpgrades();
            insertTowerPurchases(this);
        });

        return element;

    }
}