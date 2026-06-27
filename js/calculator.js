function formatRubles(value) {
    return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₽";
}

function calculateCost() {
    const cuttings = parseFloat(document.getElementById("cuttings").value) || 0;
    const rooting = parseFloat(document.getElementById("rooting").value) || 0;
    const cuttingCost = parseFloat(document.getElementById("cuttingCost").value) || 0;
    const substrateCost = parseFloat(document.getElementById("substrateCost").value) || 0;
    const potCost = parseFloat(document.getElementById("potCost").value) || 0;
    const fertilizerCost = parseFloat(document.getElementById("fertilizerCost").value) || 0;
    const electricityCost = parseFloat(document.getElementById("electricityCost").value) || 0;
    const laborCost = parseFloat(document.getElementById("laborCost").value) || 0;
    const otherCost = parseFloat(document.getElementById("otherCost").value) || 0;
    const markup = parseFloat(document.getElementById("markup").value) || 0;

    const rootedPlants = cuttings * rooting / 100;

    const totalCost =
        cuttingCost +
        substrateCost +
        potCost +
        fertilizerCost +
        electricityCost +
        laborCost +
        otherCost;

    let costPerPlant = 0;
    if (rootedPlants > 0) {
        costPerPlant = totalCost / rootedPlants;
    }

    const salePrice = costPerPlant * (1 + markup / 100);
    const profitPerPlant = salePrice - costPerPlant;
    const totalProfit = profitPerPlant * rootedPlants;

    document.getElementById("plantsResult").textContent = Math.round(rootedPlants);
    document.getElementById("totalCostResult").textContent = formatRubles(totalCost);
    document.getElementById("costPerPlantResult").textContent = formatRubles(costPerPlant);
    document.getElementById("salePriceResult").textContent = formatRubles(salePrice);
    document.getElementById("profitResult").textContent = formatRubles(profitPerPlant);
    document.getElementById("totalProfitResult").textContent = formatRubles(totalProfit);

    const warning = document.getElementById("resultWarning");
    if (rootedPlants <= 0) {
        warning.textContent = "Укажите количество черенков и процент укоренения больше нуля.";
        warning.classList.add("visible");
    } else if (totalCost <= 0) {
        warning.textContent = "Добавьте расходы на партию для корректного расчёта себестоимости.";
        warning.classList.add("visible");
    } else {
        warning.classList.remove("visible");
    }
}

function initCalculator() {
    const inputs = document.querySelectorAll("#calculatorForm input");
    inputs.forEach(function (input) {
        input.addEventListener("input", calculateCost);
    });

    document.getElementById("calculatorForm").addEventListener("submit", function (event) {
        event.preventDefault();
        calculateCost();
    });

    calculateCost();
}

document.addEventListener("DOMContentLoaded", initCalculator);
