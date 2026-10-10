class Empty extends GridItem {
    constructor(x, y) {
        super(x, y);
    }

    createDOMElement() {
        const element = super.createDOMElement();
        element.classList.add("empty");

        element.addEventListener("click", () => {
            const lastClicked = document.querySelector(".gridItem.clicked");
            if (lastClicked) {
                lastClicked.classList.remove("clicked");
            }

            element.classList.add("clicked");
            // todo all towers
            clearUpgrades();
            insertTowerPurchase(this, new PeaShooter());
        });

        return element;

    }
}