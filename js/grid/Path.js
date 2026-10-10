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