class HashTable {
    constructor(){
        this.table = [];
    }

    // Hash function to compute the hash code
    _loseloseHashCode(key){
        let hash = 0;
        for(let i=0; i<key.length; i++){
            hash += key.charCodeAt(i);
        }
        return hash % 37;
    }

    // Adds a new item to the hash table or updates it
    put(key, value){
        const position = this._loseloseHashCode(key);
        this.table[position] = value;
    }

    // Removes the value from the hash table using the key
    remove(key){
        const position = this._loseloseHashCode(key);
        if(this.table[position] !== undefined){
            delete this.table[position];
            return true;
        }
        return false;
    }

    // Returns a specific value searched by the key
    get(key){
        const position = this._loseloseHashCode(key);
        return this.table[position] !== undefined ? this.table[position] : undefined;
    }

}

const hashTable = new HashTable();
hashTable.put('name', 'Ghaith');
hashTable.put('age', 24);
console.log(hashTable.get('name'));
console.log(hashTable.get('age'));
hashTable.remove('age');
console.log(hashTable.get('age'));