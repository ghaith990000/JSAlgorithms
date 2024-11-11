function fractionalKnapsack (capacity, values, weights){
    const n = values.length;
    const items = [];

    // Create an array of items with value-to-weight ratios
    for(let i=0; i<n; i++){
        items.push({
            value: values[i],
            weight: weights[i],
            ratio: values[i] / weights[i]
        });
    }

    // Sort items by ratio (value-to-weight) in descending order
    items.sort((a, b) => b.ratio - a.ratio);

    let totalValue = 0;
    let load = 0;

    for(let i = 0; i < n && load < capacity; i++){
        const item = items[i];

        // If the item can fit fully in the remaining capacity
        if(item.weight <= (capacity - load)){
            totalValue += item.value;
            load += item.weight;
        }else {
            // Take the fraction of the item that fits
            const fraction = (capacity - load) / item.weight;
            totalValue += item.value * fraction;
            load += item.weight * fraction;
            break;
        }
    }

    return totalValue;
}

// Test the function with the example
const values = [3, 4, 5];
const weights = [2, 3, 4];
const capacity = 6;
console.log("Maximum value: ", fractionalKnapsack(capacity, values, weights));