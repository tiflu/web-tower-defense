class Tower extends GridItem {
    constructor(x, y, radius, damage, name, description, texture) {
        // todo finish ui.js and then also also do the unused constructor fields
        super(x, y);
        this.name = name;
        this.description = description;
        this.texture = texture;
        this.radius = radius;
        this.damage = damage;
        this.targetedEnemy = null;
        this.pathTargets = this.getPathsInRange();
        const textureImg = document.createElement("img");
        textureImg.src = this.texture;
        this.DOMElement.append(textureImg);
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
        this.targetedEnemy.takeDamage(this.damage);
    }

    getPathsInRange() {
        const itemsInRange = [];

        for (let i = this.x - this.radius; i <= this.x + this.radius; i++) {
            for (let j = this.y - this.radius; j <= this.y + this.radius; j++) {
                if (grid.coordinatesInBounds(i, j)) {
                    // grid.items[i][j].DOMElement.style.backgroundColor = "white";
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
        super(x, y, 2, 1, "Pea Shooter", "A basic tower", "texture.png");
    }
}