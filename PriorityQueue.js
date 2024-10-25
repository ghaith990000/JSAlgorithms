class PriorityQueue {
    constructor(){
        this.items = [];
    }

    enqueue(element, priority){
        const queueElement = { element, priority};
        let added = false;

        for(let i = 0; i < this.items.length; i++){
            if(queueElement.priority < this.items[i].priority){

                this.items.splice(i, 1, queueElement)
                added = true;
                break;
            }
        }

        if(!added){
            this.items.push(queueElement);
        }
    }

    dequeue(){
        if(this.isEmpty()){
            return 'Priority queue is empty';
        }
        return this.items.shift().element;
    }

    front() {
        if (this.isEmpty()) {
          return 'Priority queue is empty';
        }
        return this.items[0].element;
    }

    isEmpty() {
        return this.items.length === 0;
    }

    // Returns the number of elements in the queue
    size() {
        return this.items.length;
    }

    // Clears all elements from the priority queue
    clear() {
        this.items = [];
    }
}

const priorityQueue = new PriorityQueue();
priorityQueue.enqueue('Task 1', 2);
priorityQueue.enqueue('Task 2', 1);
priorityQueue.enqueue('Task 3', 3);

console.log(priorityQueue.front());
console.log(priorityQueue.dequeue());
console.log(priorityQueue.size());
console.log(priorityQueue.isEmpty());
priorityQueue.clear();
console.log(priorityQueue.isEmpty());