

function betting_calculator(OC, prediction) {
    let betting_multiplier = 1.0;

    const higherMultipliers = [1.5, 1.5, 1.5, 1.75, 1.75, 1.75, 1.75, 2, 2, 2.5, 2.5, 3, 5];
    const lowerMultipliers = [100, 5, 2.5, 2.5, 2, 2, 1.75, 1.75, 1.75, 1.75, 1.5, 1.5, 1.5];

    if (prediction === "higher") {
        betting_multiplier = higherMultipliers[OC];
    } else if (prediction === "lower") {
        betting_multiplier = lowerMultipliers[OC];
    } else if (prediction === "red" || prediction === "black") {
        betting_multiplier = 1.25;
    }

    return betting_multiplier;
}