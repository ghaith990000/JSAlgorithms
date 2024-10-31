class Set {
    constructor(){
        this.items = {};
    }

    add(value){
        if(!this.has(value)){
            this.items[value] = true;
            return true;
        }
        return false;
    }

    delete(value){
        if(this.has(value)){
            delete this.items[value];
            return true;
        }
        return false;
    }

    has(value){
        return Object.prototype.hasOwnProperty.call(this.items, value);
    }

    clear(){
        this.items = {};
    }

    size(){
        return Object.keys(this.items).length;
    }

    values(){
        return Object.keys(this.items);
    }

    union(otherSet){
        const unionSet = new Set();
        // Add values from the current set
        this.values().forEach(value => unionSet.add(value));

        // Add values from the other set
        otherSet.values().forEach(value => unionSet.add(value));

        return unionSet;
    }
}

const set = new Set();
set.add(1);
set.add(2);
set.add(1);
console.log(set.values());
console.log(set.has(1));
console.log(set.size());
set.delete(1);
console.log(set.values());
set.clear();
console.log(set.values());
console.log(set.size());

// union example
const setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);

const setB = new Set();
setB.add(3);
setB.add(4);
setB.add(5);

const unionSet = setA.union(setB);
console.log(unionSet.values());