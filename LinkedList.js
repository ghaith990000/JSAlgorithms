class Node {
    constructor(element){
        this.element = element;
        this.next = null;
    }
}

export default class LinkedList {
    constructor(){
        this.head = null;
        this.length = 0;
    }

    append(element){
        const node = new Node(element);
        if(!this.head){
            this.head = node;
        }else {
            let current = this.head;
            // Traverse to the last node
            while(current.next){
                current = current.next;
            }
            // Set the next property of the last node to new node
            current.next = node;
        }
        this.length++;
    }

    // Inserts a new element at the specified position in the list
    insert(position, element){
        if(position < 0 || position > this.length){
            return false;
        } 

        const node = new Node(element);

        if(position === 0){
            node.next = this.head;
            this.head = node;
        }else {
            let current= this.head;
            let previous;
            let index = 0;

            while(index < position){
                previous = current;
                current = current.next
                index++;
            }

            previous.next = node;
            node.next = current;
        }
        this.length++;
        return true;
    }

    // Removes the specified element from the list
    remove(element){
        const index = this.indexOf(element);
        return this.removeAt(index);
    }

    // Returns the index of the specified element, or -1 if not found
    indexOf(element){
        let current = this.head;
        let index = 0;

        while(current){
            if(current.element === element){
                return index;
            }
            current = current.next;
            index++;
        }
        return -1;
    }

    // Removes the element at the specified position
    removeAt(position){
        if(position < 0 || position >= this.length){
            return null;
        }

        let current = this.head;

        if(position === 0){
            this.head = current.next;
        }else {
            let previous;
            let index = 0;

            while (index < position){
                previous = current;
                current = current.next;
                index++;
            }

            previous.next = current.next;
        }
        this.length--;
        return current.element;
    }

    // Method to return all values for easier access in HashTable
    getValues() {
        let values = [];
        let current = this.head;
        while (current) {
            values.push(current.element);
            current = current.next;
        }
        return values;
    }

    isEmpty(){
        return this.length === 0;
    }

    size(){
        return this.length;
    }

    toString(){
        let current = this.head;
        let string = '';

        while(current){
            string += current.element + (current.next ? ' -> ' : '');
            current = current.next;
        }

        return string;
    }
}

const linkedList = new LinkedList();
linkedList.append("node 1");
linkedList.append("node 2");
linkedList.insert(1, 'Node 1.5');
console.log(linkedList.toString());
console.log(linkedList.remove('Node 1.5'));
console.log(linkedList.toString());
console.log(linkedList.indexOf('Node 2'));
console.log(linkedList.removeAt(0));
console.log(linkedList.toString());
console.log(linkedList.isEmpty());
console.log(linkedList.size());