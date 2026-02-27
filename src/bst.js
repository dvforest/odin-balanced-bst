class Node {
    constructor(data) {
        this.left = null;
        this.right = null;
        this.data = data;
    }

    setLeft(node) {
        this.left = node;
    }

    setRight(node) {
        this.right = node;
    }
}

class Tree {
    constructor(array) {
        const unique = [...new Set(array)].sort((a, b) => a - b); // Remove duplicates values and sort
        this.root = this.buildTree(unique, 0, unique.length - 1);
    }

    buildTree(array, start, end) {
        // Base case
        if (start > end) return;

        // Find mid point and make it the root
        const mid = Math.floor((start + end) / 2);
        const root = new Node(array[mid]);

        // Recursively build left and right trees
        root.setLeft(this.buildTree(array, start, mid - 1));
        root.setRight(this.buildTree(array, mid + 1, end));

        return root;
    }
}

export { Tree };
