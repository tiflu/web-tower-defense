class Tower extends Tile {
    constructor(x, y, radius, damage, name, description, texture, cost, attackRate) {
        super(x, y);
        this.name = name;
        this.description = description;
        this.texture = "./texture/tower/" + texture;
        this.radius = radius;
        this.damage = damage;
        this.cost = cost;
        this.level = 1;
        this.targetedEnemy = null;
        this.attackRate = attackRate;
        this.pathTargets = this.getPathsInRange();
        const textureImg = document.createElement("img");
        textureImg.src = this.texture;
        this.DOMElement.append(textureImg);
        this.start();
    }

    createDOMElement() {
        const element = super.createDOMElement();
        element.classList.add("tower");

        return element;
    }

    onClick(element) {
        const lastClicked = document.querySelector(".tile.clicked");
        if (lastClicked) {
            lastClicked.classList.remove("clicked");
        }

        element.classList.add("clicked");
        clearUpgrades();
        insertTowerUpgrades(this);
    }

    start() {
        setTimeout(() => {
            this.attackHandler();
            this.start();
        }, this.attackRate)
    }

    upgrade() {
        this.level++;
    }

    targetEnemy() {
        for (const path of this.pathTargets) {
            if (path.enemies.length > 0) {
                this.targetedEnemy = path.enemies[0];
                return;
            }
        }
        this.targetedEnemy = null;
    }

    attackHandler() {
        if (this.targetedEnemy === null ||
            !this.pathTargets.includes(this.targetedEnemy.pathIndex)) {
            this.targetEnemy();
            if (!this.targetedEnemy) return;
        }

        this.shoot();
    }

    shoot() {
        // todo vfx
        this.targetedEnemy.takeDamage(this.damage);
    }

    getPathsInRange() {
        const itemsInRange = [];

        for (let i = this.x - this.radius; i <= this.x + this.radius; i++) {
            for (let j = this.y - this.radius; j <= this.y + this.radius; j++) {
                if (game.grid.coordinatesInBounds(i, j)) {
                    // game.grid.items[i][j].DOMElement.style.backgroundColor = "white";
                    itemsInRange.push(game.grid.items[i][j]);
                }
            }
        }

        const sortedPaths = [];

        for (const path of game.grid.getPathTiles()) {
            if (itemsInRange.includes(path)) {
                sortedPaths.push(path);
            }
        }

        return sortedPaths;
    }
}