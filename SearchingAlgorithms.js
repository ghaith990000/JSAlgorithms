import SortingAlgorithms from "./SortingAlgorithms.js";
class SearchingAlgorithms {
    static sequentialSearch(array, target){
        for(let i=0; i<array.length; i++){
            if(array[i] === target){
                return i;
            }
        }
        return -1;
    }

    static binarySearch(array, target){
        let left = 0;
        let right = array.length - 1;

        while(left <= right){
            const mid = Math.floor((left + right) / 2);

            if(array[mid] === target){
                return mid;
            } else if(array[mid] < target){
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return -1;
    }

    static sortedBinarySearch(array, target){
        console.log("Before sorting", array);
        const sortedArray = SortingAlgorithms.quickSort([...array]);
        console.log("Sorted array", sortedArray);
        return this.binarySearch(sortedArray, target);
    }
}


const arr = [2, 3, 4, 5, 8];
const unsortedArray = [10, 3, 13, 12, 25, 22, 17];
const target = 17;
const target1 = 8;
const target2 = 7;

console.log("Sequential Search for 8:", SearchingAlgorithms.sequentialSearch(arr, target1));
console.log("Binary Search for 8:", SearchingAlgorithms.binarySearch(arr, target1));
console.log("Binary Search for 7:", SearchingAlgorithms.binarySearch(arr, target2));
console.log("Sorted Binary Search: ", SearchingAlgorithms.sortedBinarySearch(unsortedArray, target));