const upgrades = document.getElementById("upgradeMenu");
const info = document.getElementById("infoMenu");

function insertTowerPurchase(tower) {
    const upgradeContainer = document.createElement("section");
    upgradeContainer.classList.add("upgrade");
    const titleContainer = document.createElement("div");
    titleContainer.classList.add("title");
    const icon = document.createElement("img")
    icon.src = tower.texture;
    titleContainer.append(icon);

    const title = document.createElement("h3");
    title.textContent = tower.name;
    titleContainer.append(title);
    upgradeContainer.append(titleContainer);

    const textContainer = document.createElement("div");
    textContainer.classList.add("text");

    const moneyContainer = document.createElement("section");
    moneyContainer.classList.add("money");
    const goldIcon = document.createElement("img");
    goldIcon.src = "gold.png";
    moneyContainer.append(goldIcon);
    const cost = document.createElement("span");
    cost.textContent = tower.cost;
    moneyContainer.append(cost);
    textContainer.append(moneyContainer);

    const description = document.createElement("span");
    description.textContent = tower.description;
    textContainer.append(description);
    upgradeContainer.append(textContainer);

    const buyButton = document.createElement("button");
    buyButton.textContent = "Buy";
    buyButton.addEventListener("click", () => {

    });
    upgradeContainer.append(buyButton);

    upgrades.append(upgradeContainer);
}