class SortingAlgorithms {
    static bubbleSort(arr){
        let n = arr.length;
        let swapped;

        for (let i = 0; i < n - 1; i++){
            swapped = false;

            for (let j = 0; j < n - i - 1; j++){
                if(arr[j] > arr[j + 1]){
                    let temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                    swapped = true;
                }
            }

            // If no two elements were swapped by inner loop, break
            if(!swapped) break;
        }
        return arr;
    }

    static selectionSort(arr){
        let n = arr.length;

        for(let i = 0; i < n - 1; i++){
            // Assume the first element in the unsorted region is the minimum
            let minIndex = i;

            // Find the minimum element in the unsorted region
            for(let j = i + 1; j < n; j++){
                if(arr[j] < arr[minIndex]){
                    minIndex = j;
                }
            }

            // Swap the found minimum element with the first element of the unsorted region
            if(minIndex !== i){
                let temp = arr[i];
                arr[i] = arr[minIndex];
                arr[minIndex] = temp;
            }
        }
        return arr;
    }
}

const array = [64, 34, 25, 12, 22, 11, 90];
console.log("Original array: ", array);
console.log("Sorted array: ", SortingAlgorithms.bubbleSort([...array]));

console.log("Original array:", array);
console.log("Sorted array (Selection Sort):", SortingAlgorithms.selectionSort([...array]));  // Copying array to avoid mutation