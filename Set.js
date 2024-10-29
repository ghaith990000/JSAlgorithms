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