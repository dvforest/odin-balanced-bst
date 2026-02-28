/**
 * A node in a binary search tree.
 *
 * @property {number} value - The value stored in the node.
 * @property {Node|null} left - Left child node.
 * @property {Node|null} right - Right child node.
 */

class Node {
    constructor(value) {
        this.left = null;
        this.right = null;
        this.value = value;
    }

    /**
     * Sets the left child.
     * @param {Node|null} node
     */
    setLeft(node) {
        this.left = node;
    }

    /**
     * Sets the right child.
     * @param {Node|null} node
     */
    setRight(node) {
        this.right = node;
    }
}

/**
 * A balanced binary search tree built from a numeric array.
 *
 * @property {Node|null} root - Root node of the tree.
 */

class Tree {
    /**
     * Creates a balanced BST from an array of numbers.
     * Duplicates are removed and values are sorted.
     *
     * @param {Array<number>} array - Input values used to build the tree.
     */
    constructor(array) {
        const unique = [...new Set(array)].sort((a, b) => a - b);
        this.root = this.buildTree(unique, 0, unique.length - 1);
    }

    /**
     * Recursively builds a balanced binary search tree from a sorted array segment.
     *
     * @param {Array<number>} array - Sorted array of unique values.
     * @param {number} start - Start index of the segment.
     * @param {number} end - End index of the segment.
     *
     * @returns {Node|null} Root of the constructed subtree, or null if the segment is empty.
     */
    buildTree(array, start, end) {
        // Base case
        if (start > end) return null;

        // Find mid point and make it the root
        const mid = Math.floor((start + end) / 2);
        const root = new Node(array[mid]);

        // Recursively build left and right trees
        root.setLeft(this.buildTree(array, start, mid - 1));
        root.setRight(this.buildTree(array, mid + 1, end));

        return root;
    }

    /**
     * Checks whether a value exists in the tree.
     *
     * @param {number} value
     *        The value to search for.
     *
     * @returns {boolean}
     *          True if a node with matching value is found, otherwise false.
     */
    includes(value) {
        return this.findNode(value) ? true : false;
    }

    /**
     * Searches the binary search tree for a node containing the given value.
     * Time: O(log n) average, O(h) worst (h = height of the tree)
     *
     * @param {number} value
     *        The value to search for.
     * @param {Node} [node=this.root]
     *        The current node in the search (used internally during recursion).
     * @returns {Node|null}
     *          The node containing the value if found, or null otherwise.
     */
    findNode(value, node = this.root) {
        if (!node) return null;
        if (node.value === value) return node;

        // Go left if smaller, right if larger
        return value < node.value
            ? this.findNode(value, node.left)
            : this.findNode(value, node.right);
    }

    /**
     * Inserts a value at the correct position maintaining the BST property of the tree.
     *
     * @param {number} value - The value to be inserted.
     */
    insert(value) {
        if (!node) return null;
        if (node.value === value) return node;

        // Go left if smaller, right if larger
        return value < node.value
            ? this.findNode(value, node.left)
            : this.findNode(value, node.right);
    }

    /**
     * Depth-first in-order traversal of the tree.
     * Time: (O(n)
     *
     * @param {function(Node): boolean} callback
     *        A function applied to each node.
     *
     * @param {Node} [node=this.root]
     *        The current node in the search (used internally during recursion).
     */
    inOrderForEach(callback, node = this.root) {
        // Base case
        if (!node) {
            return;
        }

        // In-order traversal (left-data-right)
        this.traverse(callback, node.left);
        callback(node);
        this.traverse(callback, node.right);
    }
}

export { Tree };
