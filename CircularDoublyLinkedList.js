class CircularDoublyNode {
    constructor(element){
        this.element = element;
        this.next = null;
        this.prev = null;
    }
}

class CircularDoublyLinkedList {
    constructor(){
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    append(element){
        const node = new CircularDoublyNode(element);
        if(!this.head){
            this.head = node;
            this.tail = node;
            this.head.next = this.head;
            this.tail.prev = this.head;
        } else {
            node.prev = this.tail;
            node.next = this.head;
            this.tail.next = node;
            this.head.prev = node;
            this.tail = node;
        }

        this.length++;
    }

    insert(position, element){
        if(position < 0 || position > this.length){
            return false;
        }

        const node = new CircularDoublyNode(element);
        if(position === 0){
            if(!this.head){
                this.head =node;
                this.tail = node;
                this.head.next = this.head;
                this.head.prev = this.head;
            }else {
                node.next = this.head;
                node.prev = this.tail;
                this.head.prev = node;
                this.tail.next = node;
                this.head = node;
            }
        }else if (position === this.length){
            this.append(element);
            return true;
        }else {
            let current = this.head;
            let index = 0;
            while (index < position){
                current = current.next;
                index++;
            }
            node.next = current;
            node.prev = current.prev;
            current.prev.next = node;
            current.prev = node;
        }
        this.length++;
        return true;
    }

    remove(element){
        const index = this.indexOf(element);
        return this.removeAt(index);
    }

    indexOf(element){
        let current = this.head;
        let index = 0;

        if(!this.head) return -1;

        do {
            if(current.element === element){
                return index;
            }
            current = current.next;
            index++;
        }while(current !== this.head);

        return -1;
    }

    removeAt(position){
        if(position < 0 || position >= this.length){
            return null;
        }

        let current = this.head;
        if(position === 0){
            if(this.length === 1){
                this.head = null;
                this.tail = null;
            }else {
                this.head = current.next;
                this.tail.next = this.head;
                this.head.prev = this.tail;
            }
        }else if(position === this.length - 1){
            current = this.tail;
            this.tail = current.prev;
            this.tail.next = this.head;
            this.head.prev = this.tail
        }else {
            let index = 0;
            while(index < position){
                current = current.next;
                index++;
            }
            current.prev.next = current.next;
            current.next.prev = current.prev;
        }
        this.length--;
        return current.element;
    }

    isEmpty(){
        return this.length === 0;
    }

    size(){
        return this.length;
    }

    toString(){
        if(!this.head) return '';

        let current = this.head;
        let string = '';

        do {
            string += current.element + (current.next !== this.head ? ' <-> ' : '');
            current = current.next
        }while(current !== this.head);

        return string;
    }
}

// Testing the Circular Doubly Linked List
const circularDoublyLinkedList = new CircularDoublyLinkedList();
circularDoublyLinkedList.append('Node 1');
circularDoublyLinkedList.append('Node 2');
circularDoublyLinkedList.insert(1, 'Node 1.5');
console.log(circularDoublyLinkedList.toString());  // Node 1 <-> Node 1.5 <-> Node 2
console.log(circularDoublyLinkedList.remove('Node 1.5'));  // Node 1.5
console.log(circularDoublyLinkedList.toString());  // Node 1 <-> Node 2
console.log(circularDoublyLinkedList.indexOf('Node 2'));  // 1
console.log(circularDoublyLinkedList.removeAt(0));  // Node 1
console.log(circularDoublyLinkedList.toString());  // Node 2
console.log(circularDoublyLinkedList.isEmpty());  // false
console.log(circularDoublyLinkedList.size());  // 1