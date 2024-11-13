export default class SortingAlgorithms {
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

    static insertionSort(arr){
        let n = arr.length;

        for (let i = 1; i < n; i++){
            let current = arr[i];
            let j = i - 1;

            // Shift elements in the sorted portion to the right to make space for current
            while (j >= 0 && arr[j] > current){
                arr[j+1] = arr[j];
                j--;
            }
            arr[j+1] = current;
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

    static mergeSort(arr){
        // Base case: If the array has 1 or 0 elements, it's already sorted
        if(arr.length <= 1) return arr;

        // Divide the array in the middle
        const middle = Math.floor(arr.length / 2);
        const left = arr.slice(0, middle);
        const right = arr.slice(middle);

        // Recursively sort both halves
        const sortedLeft = SortingAlgorithms.mergeSort(left);
        const sortedRight = SortingAlgorithms.mergeSort(right);

        // Merge sorted halves and return
        return SortingAlgorithms.merge(sortedLeft, sortedRight);
    }

    // Helper function to merge two sorted arrays
    static merge(left, right){
        const mergedArray= [];
        let leftIndex = 0;
        let rightIndex = 0;

        // Merge elements from left and right arrays in sorted order
        while(leftIndex < left.length && rightIndex < right.length){
            if(left[leftIndex] < right[rightIndex]){
                mergedArray.push(left[leftIndex]);
                leftIndex++;
            }else {
                mergedArray.push(right[rightIndex]);
                rightIndex++;
            }
        }

        // Add any remaining elements from the left or right array
        return mergedArray
            .concat(left.slice(leftIndex))
            .concat(right.slice(rightIndex));
    }

    static quickSort(array, left = 0, right = array.length - 1){
        if(left < right){
            const pivotIndex = this.partition(array, left, right);
            this.quickSort(array, left, pivotIndex - 1);
            this.quickSort(array, pivotIndex + 1, right);
        }
        return array;
    }

    static partition(array, left, right){
        const pivot = array[right];
        let i = left - 1;

        for(let j = left; j < right; j++){
            if(array[j] < pivot){
                i++;
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
        [array[i+1], array[right]] = [array[right], array[i+1]];
        return i+1;
    }

    static heapSort(arr){
        let n = arr.length;

        // Step 1: Build a max heap
        for(let i = Math.floor(n / 2) - 1; i >= 0; i--){
            this.heapify(arr, n, i);
        }

        // Step 2: Extract elements from heap one by one
        for(let i = n - 1; i > 0; i--){
            // Move current root to end
            [arr[0], arr[i]] = [arr[i], arr[0]];

            // Call max heapify on the reduced heap
            this.heapify(arr, i, 0);
        }
        return arr;
    }

    // Helper function to maintain heap property
    static heapify(arr, n, i){
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        if(left < n && arr[left] > arr[largest]){
            largest = left;
        }

        if(right < n && arr[right] > arr[largest]){
            largest = right;
        }

        if (largest !== i){
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            this.heapify(arr, n, largest);
        }

    }
}

const array = [64, 34, 25, 12, 22, 11, 90];
console.log("Original array: ", array);
console.log("Sorted array: ", SortingAlgorithms.bubbleSort([...array]));

console.log("Original array:", array);
console.log("Sorted array (Selection Sort):", SortingAlgorithms.selectionSort([...array]));  // Copying array to avoid mutation

console.log("Original array:", array);
console.log("Sorted array (Insertion Sort):", SortingAlgorithms.insertionSort([...array]));

const mergeExampleArray = [38, 27, 43, 3, 9, 82, 10];
console.log("Original array: ", array);
console.log("Sorted array (Merge Sort):", SortingAlgorithms.mergeSort([...mergeExampleArray]));

const heapExampleArray = [4, 10, 3, 5, 1];
console.log("Original array:", heapExampleArray);
console.log("Sorted array (Heap Sort):", SortingAlgorithms.heapSort([...heapExampleArray]));