class Tower extends GridItem {
    constructor(x, y, radius, damage) {
        super(x, y);
        this.radius = radius;
        this.damage = damage;
        this.targetedEnemy = null;
        this.pathTargets = this.getPathsInRange();
        this.start();
    }

    createDOMElement() {
        const element = super.createDOMElement();
        element.classList.add("tower");
        element.addEventListener("click", () => {

        });

        return element;
    }

    start() {
        setInterval(() => {
            this.attackHandler()
        }, 100)

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
        this.targetedEnemy.health -= this.damage;
    }

    getPathsInRange() {
        const itemsInRange = [];

        for (let i = this.x - this.radius; i < this.x + this.radius; i++) {
            for (let j = this.y - this.radius; j < this.y + this.radius; j++) {
                if (grid.coordinatesInBounds(i, j)) {
                    itemsInRange.push(grid.items[i][j]);
                }
            }
        }

        const sortedPaths = [];

        for (const path of grid.path) {
            if (itemsInRange.includes(path)) {
                sortedPaths.push(path);
            }
        }

        return sortedPaths;
    }
}

class PeaShooter extends Tower {
    constructor (x, y) {
        super(x, y, 2, 1);
    }
}