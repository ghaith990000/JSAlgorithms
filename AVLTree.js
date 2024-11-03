class AVLTree {
    constructor(){
        this.root = null;
    }

    Node = class {
        constructor(key){
            this.key = key;
            this.left = null;
            this.right = null;
            this.height = 1;
        }
    };

    height(node){
        return node ? node.height : 0;
    }

    getBalanceFactor(node){
        return node ? this.height(node.left) - this.height(node.right) : 0;
    }

    rotateRight(y){
        const x = y.left;
        const T2 = x.right;

        // Perform rotation
        x.right = y;
        y.left = T2;

        // Update heights
        y.height = Math.max(this.height(y.left), this.height(y.right)) + 1;
        x.height = Math.max(this.height(x.left), this.height(x.right)) + 1;

        return x;
    }

    rotateLeft(x){
        const y = x.right;
        const T2 = y.left;

        y.left = x;
        x.right = T2;

        // Update heights
        x.height = Math.max(this.height(x.left), this.height(x.right)) + 1;
        y.height = Math.max(this.height(y.left), this.height(y.right)) + 1;

        return y;
    }

    insert(key){
        this.root = this.insertNode(this.root, key);
    }

    insertNode(node, key){
        // Perform the normal BST insertion
        if (node === null){
            return new this.Node(key);
        }

        if(key < node.key){
            node.left = this.insertNode(node.left, key);
        }else if( key > node.key){
            node.right = this.insertNode(node.right, key);
        }else {
            return node;
        }

        // 2. Update height of this ancestor node
        node.height = 1 + Math.max(this.height(node.left), this.height(node.right));

        // 3. Get the Balance factor and rotate if unbalanced
        const balance = this.getBalanceFactor(node);

        // Left Left Case
        if(balance > 1 && key < node.left.key){
            return this.rotateRight(node);
        }

        // Right Right Case
        if(balance < -1 && key > node.right.key){
            return this.rotateLeft(node);
        }

        // Left Right Case
        if (balance > 1 && key > node.left.key) {
            node.left = this.rotateLeft(node.left);
            return this.rotateRight(node);
        }

        // Right Left Case
        if (balance < -1 && key < node.right.key) {
            node.right = this.rotateRight(node.right);
            return this.rotateLeft(node);
        }

        return node;
    }

    // Find the node with the minimum key value
    minValueNode(node){
        let current = node;
        while (current.left !== null){
            current = current.left;
        }
        return current;
    }

    // Remove a node with the given key and balance the tree
    remove(key) {
        this.root = this.removeNode(this.root, key);
    }

    removeNode(node, key) {
        // Perform standard BST delete
        if (node === null) {
            return node;
        }

        if (key < node.key) {
            node.left = this.removeNode(node.left, key);
        } else if (key > node.key) {
            node.right = this.removeNode(node.right, key);
        } else {
            // Node with only one child or no child
            if ((node.left === null) || (node.right === null)) {
                let temp = node.left ? node.left : node.right;
                if (temp === null) {
                    node = null;
                } else {
                    node = temp;
                }
            } else {
                // Node with two children: Get the inorder successor (smallest in the right subtree)
                const temp = this.minValueNode(node.right);
                node.key = temp.key;
                node.right = this.removeNode(node.right, temp.key);
            }
        }

        // If the tree had only one node then return
        if (node === null) {
            return node;
        }

        // Update height
        node.height = Math.max(this.height(node.left), this.height(node.right)) + 1;

        // Get the balance factor and balance the node if needed
        const balance = this.getBalanceFactor(node);

        // Left Left Case
        if (balance > 1 && this.getBalanceFactor(node.left) >= 0) {
            return this.rotateRight(node);
        }

        // Left Right Case
        if (balance > 1 && this.getBalanceFactor(node.left) < 0) {
            node.left = this.rotateLeft(node.left);
            return this.rotateRight(node);
        }

        // Right Right Case
        if (balance < -1 && this.getBalanceFactor(node.right) <= 0) {
            return this.rotateLeft(node);
        }

        // Right Left Case
        if (balance < -1 && this.getBalanceFactor(node.right) > 0) {
            node.right = this.rotateRight(node.right);
            return this.rotateLeft(node);
        }

        return node;
    }

    // In-order traversal
    inOrderTraverse(callback) {
        this.inOrderTraverseNode(this.root, callback);
    }

    inOrderTraverseNode(node, callback) {
        if (node !== null) {
            this.inOrderTraverseNode(node.left, callback);
            callback(node.key);
            this.inOrderTraverseNode(node.right, callback);
        }
    }

    printTree() {
        this.printTreeHelper(this.root, "", true);
    }

    printTreeHelper(node, indent, isRight) {
        if (node === null) {
            console.log(indent + (isRight ? "└── " : "┌── ") + "null");
            return;
        }

        console.log(indent + (isRight ? "└── " : "┌── ") + node.key);
        this.printTreeHelper(node.left, indent + (isRight ? "    " : "│   "), false);
        this.printTreeHelper(node.right, indent + (isRight ? "    " : "│   "), true);
    }


}

const avl = new AVLTree();
avl.insert(10);
avl.insert(20);
avl.insert(30); // Causes a rotation
avl.insert(40);
avl.insert(50); // Causes another rotation

console.log("In-order traversal:");
avl.inOrderTraverse(console.log); // Outputs sorted keys
avl.printTree();
avl.remove(20);
console.log("After removing 20:");
avl.inOrderTraverse(console.log); // Check that balance is maintained
avl.printTree();