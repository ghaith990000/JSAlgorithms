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

    intersection(otherSet){
        const intersectionSet = new Set();
        this.values().forEach(value => {
            if(otherSet.has(value)){
                intersectionSet.add(value);
            }
        });
        return intersectionSet;
    }

    difference(otherSet){
        const differenceSet = new Set();
        this.values().forEach(value => {
            if(!otherSet.has(value)){
                differenceSet.add(value);
            }
        });
        return differenceSet;
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

// difference example
const set1 = new Set();
set1.add(5);
set1.add(10);
set1.add(15);
set1.add(20);
set1.add(25);

const set2 = new Set();
set2.add(5);
set2.add(10);
set2.add(12);
set2.add(14);
set2.add(15);

const unionSet = setA.union(setB);
console.log(unionSet.values());

const intersectionSet = setA.intersection(setB);
console.log(intersectionSet.values());

const differenceSet = set1.difference(set2);
console.log(differenceSet.values());