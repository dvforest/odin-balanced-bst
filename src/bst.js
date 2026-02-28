/**
 * A node in a binary search tree.
 *
 * @property {number} data - The value stored in the node.
 * @property {Node|null} left - Left child node.
 * @property {Node|null} right - Right child node.
 */

class Node {
    constructor(data) {
        this.left = null;
        this.right = null;
        this.data = data;
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
     * Checks whether a value exists anywhere in the tree.
     *
     * @param {*} data
     *        The value to search for. Compared using strict equality (===)
     *        against each node's 'data' property during traversal.
     *
     * @returns {boolean}
     *          True if a node with matching data is found, otherwise false.
     */
    includes(data) {
        return this.traverse((node) => node.data === data);
    }

    /**
     * Depth-first in-order traversal of the tree.
     *
     * @param {function(Node): boolean} callback
     *        A function applied to each node. If it returns 'true',
     *        traversal stops early. If it returns 'false' or nothing,
     *        traversal continues.
     *
     * @param {Node} [node=this.root]
     *        The node to start traversal from. Defaults to the tree’s root if omitted.
     *
     * @returns {boolean}
     *          True if traversal was stopped early by the callback, otherwise false.
     */
    traverse(callback, node = this.root) {
        // Base case
        if (!node) {
            return false;
        }
        // Traverse left
        if (this.traverse(callback, node.left)) return true;

        // Apply callback to data
        if (callback(node)) return true;

        // Traverse right
        if (this.traverse(callback, node.right)) return true;

        return false;
    }
}

export { Tree };
