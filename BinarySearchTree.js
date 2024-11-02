class BinarySearchTree {
    constructor(){
        this.root = null;
    }

    // Node class to represent each node in the tree
    Node = class {
        constructor(key){
            this.key = key;
            this.left = null;
            this.right = null;
        }
    }

    insert(key){
        const newNode = new this.Node(key);
        if(this.root === null){
            this.root = newNode;
        }else {
            this.insertNode(this.root, newNode);
        }
    }

    insertNode(node, newNode){
        if(newNode.key < node.key){
            if(node.left === null){
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        }else {
            if (node.right === null){
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }

    search(key){
        return this.searchNode(this.root, key);
    }

    searchNode (node, key){
        if (node === null){
            return false;
        }

        if (key < node.key){
            return this.searchNode(node.left, key);
        }else if(key > node.key){
            return this.searchNode(node.right, key);
        } else {
            return true;
        }
    }

    // In-order traversal
    inOrderTraverse(callback){
        this.inOrderTraverseNode(this.root, callback);
    }

    inOrderTraverseNode(node, callback){
        if (node !== null){
            this.inOrderTraverseNode(node.left, callback);
            callback(node.key);
            this.inOrderTraverseNode(node.right, callback);
        }
    }

    preOrderTraverse(callback){
        this.preOrderTraverseNode(this.root, callback);
    }

    preOrderTraverseNode(node, callback){
        if (node !== null){
            callback(node.key);
            this.preOrderTraverseNode(node.left, callback);
            this.preOrderTraverseNode(node.right, callback);
        }
    }

    // Post-order traversal
    postOrderTraverse(callback) {
        this.postOrderTraverseNode(this.root, callback);
    }

    postOrderTraverseNode(node, callback) {
        if (node !== null) {
            this.postOrderTraverseNode(node.left, callback);
            this.postOrderTraverseNode(node.right, callback);
            callback(node.key);
        }
    }

    // Find the minimum key in the tree
    min() {
        return this.minNode(this.root);
    }

    minNode(node) {
        if (node) {
            while (node.left !== null) {
                node = node.left;
            }
            return node.key;
        }
        return null;
    }

    // Find the maximum key in the tree
    max() {
        return this.maxNode(this.root);
    }

    maxNode(node) {
        if (node) {
            while (node.right !== null) {
                node = node.right;
            }
            return node.key;
        }
        return null;
    }

    remove(key){
        this.root = this.removeNode(this.root, key);
    }

    removeNode(node, key){
        if (node === null){
            return null;
        }

        if (key < node.key){
            node.left = this.removeNode(node.left, key);
            return node;
        } else if(key > node.key){
            node.right = this.removeNode(node.right, key);
            return node;
        }else {
            // Node with no children
            if(node.left === null && node.right === null){
                node = null;
                return node;
            }

            // Node with only one child
            if(node.left === null){
                node = node.right;
                return node;
            }else if(node.right === null){
                node = node.left;
                return node;
            }

            // Node with two children
            const aux = this.minNode(node.right);
            node.key = aux;
            node.right = this.removeNode(node.right, aux);
            return node;
        }
    }
}

const bst = new BinarySearchTree();
bst.insert(11);
bst.insert(7);
bst.insert(15);
bst.insert(5);
bst.insert(3);
bst.insert(9);
bst.insert(8);
bst.insert(10);
bst.insert(13);
bst.insert(12);
bst.insert(14);
bst.insert(20);
bst.insert(18);
bst.insert(25);


console.log("In-order traversal:");
bst.inOrderTraverse(console.log);

console.log("Pre-order traversal:");
bst.preOrderTraverse(console.log); // Output in pre-order

console.log("Post-order traversal:");
bst.postOrderTraverse(console.log);

console.log("Min: ", bst.min());
console.log("Max: ", bst.max());

console.log("Search 10:", bst.search(10));
console.log("Search 1", bst.search(1));

bst.remove(15);
console.log("AFter removing 15, in-order traversal:");
bst.inOrderTraverse(console.log);