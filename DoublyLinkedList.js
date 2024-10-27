class DoublyNode {
    constructor(element) {
        this.element = element;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    append(element) {
        const node = new DoublyNode(element);
        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            node.prev = this.tail;
            this.tail.next = node;
            this.tail = node;
        }
        this.length++;
    }

    // Inserts a new element at the specified position in the list
    insert(position, element) {
        if (position < 0 || position > this.length) {
            return false;
        }

        const node = new DoublyNode(element);

        if (position === 0) {
            // Insert at the head
            if (!this.head) {
                this.head = node;
                this.tail = node;
            } else {
                node.next = this.head;
                this.head.prev = node;
                this.head = node;
            }
        } else if (position === this.length) {
            // Insert at the tail
            node.prev = this.tail;
            this.tail.next = node;
            this.tail = node;
        } else {
            let current = this.head;
            let index = 0;

            while (index < position) {
                current = current.next;
                index++;
            }

            node.next = current;
            node.prev = current.prev;
            if (current.prev) {
                current.prev.next = node;
            }
            current.prev = node;
        }

        this.length++;
        return true;
    }

    // Removes the specified element from the list
    remove(element) {
        const index = this.indexOf(element);
        return this.removeAt(index);
    }

    // Returns the index of the specified element, or -1 if not found
    indexOf(element) {
        let current = this.head;
        let index = 0;

        while (current) {
            if (current.element === element) {
                return index;
            }
            current = current.next;
            index++;
        }
        return -1;
    }

    removeAt(position) {
        if (position < 0 || position >= this.length) {
            return null;
        }

        let current = this.head;

        if (position === 0) {
            this.head = current.next;
            if (this.head) {
                this.head.prev = null;
            } else {
                this.tail = null;
            }
        } else if (position === this.length - 1) {
            current = this.tail;
            this.tail = current.prev;
            this.tail.next = null;
        } else {
            let index = 0;
            while (index < position) {
                current = current.next;
                index++;
            }

            current.prev.next = current.next;
            current.next.prev = current.prev;
        }

        this.length--;
        return current.element;
    }

    isEmpty() {
        return this.length === 0;
    }

    size() {
        return this.length;
    }

    toString() {
        let current = this.head;
        let string = '';

        while (current) {
            string += current.element + (current.next ? ' <-> ' : '');
            current = current.next;
        }
        return string;
    }
}

// Testing the implementation
const doublyLinkedList = new DoublyLinkedList();
doublyLinkedList.append('Node 1');
doublyLinkedList.append('Node 2');
doublyLinkedList.insert(1, 'Node 1.5');
console.log(doublyLinkedList.toString());  // Node 1 <-> Node 1.5 <-> Node 2
console.log(doublyLinkedList.remove('Node 1.5'));  // Node 1.5
console.log(doublyLinkedList.toString());  // Node 1 <-> Node 2
console.log(doublyLinkedList.indexOf('Node 2'));  // 1
console.log(doublyLinkedList.removeAt(0));  // Node 1
console.log(doublyLinkedList.toString());  // Node 2
console.log(doublyLinkedList.isEmpty());  // false
console.log(doublyLinkedList.size());  // 1