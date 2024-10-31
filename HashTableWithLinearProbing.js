class ValuePair {
    constructor(key, value){
        this.key = key;
        this.value = value;
    }

    toString(){
        return `[${this.key} - ${this.value}]`;
    }

}

class HashTableWithLinearProbing {
    constructor(){
        this.table = [];
    }

    // Hash function to convert keys to hash codes
    loseloseHashCode(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);
        }
        return hash % 37;
    }

    // better hash function
    djb2HashCode(key){
        let hash = 5381;
        for(let i = 0; i < key.length; i++){
            hash = hash * 33 + key.charCodeAt(i);
        }
        return hash % 1013;
    };

    // Put method using linear probing for collision resolution
    put(key, value){
        let position = this.loseloseHashCode(key);

        // If the position is unoccupied, add the value
        if(this.table[position] === undefined){
            this.table[position] = new ValuePair(key, value);
        }else {
            let index = ++position;
            while(this.table[index] !== undefined){
                index++;
            }
            this.table[index] = new ValuePair(key, value);
        }
    }

    // Get method to retrieve values by key
    get(key) {
        let position = this.loseloseHashCode(key);
        
        // Check the initial position
        if (this.table[position] !== undefined) {
            // If the key matches, return the value
            if (this.table[position].key === key) {
                return this.table[position].value;
            } else {
                // Handle probing to find the correct key
                let index = ++position; // Start probing
                while (this.table[index] !== undefined) {
                    if (this.table[index].key === key) {
                        return this.table[index].value; // Return the value if key matches
                    }
                    index++;
                }
            }
        }
        return undefined; // Return undefined if key not found
    }

    // Remove method to delete a key-value pair
    remove(key) {
        let position = this.loseloseHashCode(key);
        
        // Check the initial position
        if (this.table[position] !== undefined) {
            if (this.table[position].key === key) {
                this.table[position] = undefined; // Remove the value
                return true;
            } else {
                // Handle probing to find the correct key
                let index = ++position; // Start probing
                while (this.table[index] !== undefined) {
                    if (this.table[index].key === key) {
                        this.table[index] = undefined; // Remove the value
                        return true; // Return true if removed successfully
                    }
                    index++;
                }
            }
        }
        return false; // Return false if key not found
    }

    // Method to return the size of the hash table
    size() {
        let count = 0;
        for (let i = 0; i < this.table.length; i++) {
            if (this.table[i] !== undefined) {
                count++; // Count occupied slots
            }
        }
        return count;
    }

    // Method to get all keys in the hash table
    keys() {
        let keys = [];
        for (let i = 0; i < this.table.length; i++) {
            if (this.table[i] !== undefined) {
                keys.push(this.table[i].key); // Collect keys
            }
        }
        return keys;
    }

    // Method to get all values in the hash table
    values() {
        let values = [];
        for (let i = 0; i < this.table.length; i++) {
            if (this.table[i] !== undefined) {
                values.push(this.table[i].value); // Collect values
            }
        }
        return values;
    }

}