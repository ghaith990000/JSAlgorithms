import LinkedList from "./LinkedList.js";

class ValuePair {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }

    toString() {
        return `[${this.key} - ${this.value}]`;
    }
}


class HashTable {
    constructor() {
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

    // Put method to add key-value pairs
    put(key, value) {
        const position = this.loseloseHashCode(key);
        if (this.table[position] === undefined) {
            this.table[position] = new LinkedList(); // Initialize a new linked list
        }
        this.table[position].append(new ValuePair(key, value)); // Append ValuePair to the linked list
    }

    // Get method to retrieve values by key
    get(key) {
        const position = this.loseloseHashCode(key);
        if (this.table[position] !== undefined) {
            let current = this.table[position].head; // Start at the head of the linked list
            while (current) {
                if (current.element.key === key) {
                    return current.element.value; // Return the value if key matches
                }
                current = current.next; // Move to the next element
            }
        }
        return undefined; // Return undefined if key not found
    }

    // Remove method to delete a key-value pair
    remove(key) {
        const position = this.loseloseHashCode(key);
        if (this.table[position] !== undefined) {
            let current = this.table[position].head;
            while (current) {
                if (current.element.key === key) {
                    this.table[position].remove(current.element); // Remove the ValuePair
                    if (this.table[position].isEmpty()) { // Clear the position if empty
                        this.table[position] = undefined;
                    }
                    return true; // Return true if removed successfully
                }
                current = current.next; // Move to the next element
            }
        }
        return false; // Return false if key not found
    }

    // Method to return the size of the hash table
    size() {
        let count = 0;
        for (let i = 0; i < this.table.length; i++) {
            if (this.table[i] !== undefined) {
                count += this.table[i].length; // Count elements in linked lists
            }
        }
        return count;
    }

    // Method to get all keys in the hash table
    keys() {
        let keys = [];
        for (let i = 0; i < this.table.length; i++) {
            if (this.table[i] !== undefined) {
                const values = this.table[i].getValues();
                for (let j = 0; j < values.length; j++) {
                    keys.push(values[j].key);
                }
            }
        }
        return keys;
    }

    // Method to get all values in the hash table
    values() {
        let values = [];
        for (let i = 0; i < this.table.length; i++) {
            if (this.table[i] !== undefined) {
                const vals = this.table[i].getValues();
                for (let j = 0; j < vals.length; j++) {
                    values.push(vals[j].value);
                }
            }
        }
        return values;
    }
}

const hashTable = new HashTable();
hashTable.put("name", "John Doe");
hashTable.put("age", 30);
hashTable.put("occupation", "Developer");

console.log(hashTable.get("name")); // Output: John Doe
console.log(hashTable.size()); // Output: 3

hashTable.remove("age");
console.log(hashTable.size()); // Output: 2
console.log(hashTable.keys()); // Output: ['name', 'occupation']
console.log(hashTable.values()); // Output: ['John Doe', 'Developer']