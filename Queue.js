class Queue {
    constructor(){
        this.items = [];
    }

    enqueue(...elements){
        this.items.push(...elements);
    }

    // Removes and returns the first element from the queue
    dequeue(){
        if(this.isEmpty()){
            return 'Queue is empty';
        }
        return this.items.shift();
    }

    // Returns the first element without removing it.
    front(){
        if(this.isEmpty()){
            return 'Queue is empty';
        }
        return this.items[0];
    }

    //Checks if the queue is empty
    isEmpty(){
        return this.items.length === 0;
    }

    size(){
        return this.items.length;
    }

    clear(){
        this.items = [];
    }
}

const queue = new Queue();

queue.enqueue(10);
queue.enqueue(20, 30);

console.log(queue.front());
console.log(queue.dequeue());
console.log(queue.size());
console.log(queue.isEmpty());
queue.clear();
console.log(queue.isEmpty());