class Dictionary {
    constructor(){
        this.items = {};
    }

    // Adds a new item to the dictionary
    set(key, value){
        this.items[key] = value;
    }

    // Removes an item from the dictionary using the key
    delete(key){
        if(this.has(key)){
            delete this.items[key];
            return true;
        }
        return false;
    }

    has(key){
        return Object.prototype.hasOwnProperty.call(this.items, key);
    }

    get(key){
        return this.has(key) ? this.items[key] : undefined;
    }

    clear(){
        this.items = {};
    }
    
    size(){
        return Object.keys(this.items).length;
    }

    keys(){
        return Object.keys(this.items);
    }

    values(){
        return Object.values(this.items);
    }
}

const dictionary = new Dictionary();
dictionary.set('naem', 'Alice');
dictionary.set('age', 25);
console.log(dictionary.get('name'));
console.log(dictionary.size());
console.log(dictionary.keys());
console.log(dictionary.values());
console.log(dictionary.has('age'));
dictionary.delete('age');
console.log(dictionary.size());
dictionary.clear();
console.log(dictionary.size());