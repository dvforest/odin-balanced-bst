/**
 * Represents a single node in a binary search tree.
 *
 * Each node stores a numeric value and optional references to
 * left and right child nodes. Nodes are linked together to form
 * the structure of the BST.
 *
 * @property {number} value - The numeric value stored in the node.
 * @property {Node|null} left - Reference to the left child node.
 * @property {Node|null} right - Reference to the right child node.
 */

class Node {
    constructor(value) {
        this.left = null;
        this.right = null;
        this.value = value;
    }

    /**
     * Assigns a new left child to this node.
     * @param {Node|null} node - The node to attach as the left child.
     */
    setLeft(node) {
        this.left = node;
    }

    /**
     * Assigns a new right child to this node.
     * @param {Node|null} node - The node to attach as the right child.
     */
    setRight(node) {
        this.right = node;
    }
}

/**
 * Represents a balanced binary search tree.
 *
 * @property {Node|null} root - Root node of the tree.
 */

class Tree {
    /**
     * Creates a balanced binary search tree from an array of numbers.
     *
     * Duplicate values are removed and the remaining values are sorted
     * before constructing the tree. The resulting structure is height‑balanced,
     * with the median value placed at the root and subtrees built recursively.
     *
     * @param {number[]} array - The input values used to build the tree.
     */
    constructor(array) {
        const unique = [...new Set(array)].sort((a, b) => a - b);
        this.root = this.buildTree(unique, 0, unique.length - 1);
    }

    /**
     * Recursively constructs a balanced BST from a sorted array segment.
     *
     * The midpoint of the segment becomes the root of the subtree, and the
     * left and right halves are used to build the corresponding child subtrees.
     *
     * @param {number[]} array - Sorted array of unique values.
     * @param {number} start - Starting index of the current segment.
     * @param {number} end - Ending index of the current segment.
     * @returns {Node|null} The root node of the constructed subtree, or null if empty.
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
     * Determines whether the tree contains a given value.
     *
     * Performs a recursive descent from the root, comparing the target
     * value to each node and following the appropriate subtree until
     * the value is found or the search reaches a null branch.
     *
     * @param {number} value - The value to search for.
     *
     * @returns {boolean} - True if a matching value exists in the tree, otherwise false.
     */
    includes(value) {
        function findNode(value, node) {
            // If no node exists, return null.
            if (!node) return null;

            // Value found? Return the node.
            if (node.value === value) return node;

            // Otherwise, recurse left if smaller, or right if larger
            return value < node.value ? findNode(value, node.left) : findNode(value, node.right);
        }

        return findNode(value, this.root) !== null;
    }

    /**
     * Removes a value from the binary search tree while preserving
     * the BST ordering rules.
     *
     * The deletion algorithm handles all structural cases:
     * - leaf nodes are removed directly,
     * - nodes with one child are replaced by that child,
     * - nodes with two children are replaced by their in‑order successor,
     *   which is then removed from its original location.
     *
     * @param {number} value - The value to delete from the tree.
     * @returns {void}
     */
    deleteItem(value) {
        function deleteRec(value, node) {
            // Empty node? Value doesn't exist.
            if (!node) return null;

            // Value is lower or higher than current? Recurse deeper.
            if (value < node.value) {
                node.left = deleteRec(value, node.left);
            } else if (value > node.value) {
                node.right = deleteRec(value, node.right);
            } else {
                // Value found!
                // Is it a leaf? Delete it.
                if (!node.left && !node.right) {
                    return null;
                }

                // Only one child? Return it to take the place of the deleted node.
                if (node.left && !node.right) {
                    return node.left;
                }
                if (node.right && !node.left) {
                    return node.right;
                }

                // Only left case is two children.
                // Go into right subtree to the furthest left possible.
                let current = node.right;
                while (current.left) {
                    current = current.left;
                }
                // We found the next lowest value; the successor.
                const successor = current.value;

                // Assign its value to the root node.
                node.value = successor;

                // Delete the successor by finding it using its value.
                node.right = deleteRec(successor, node.right);
            }

            return node;
        }

        this.root = deleteRec(value, this.root);
    }

    /**
     * Inserts a new value into the binary search tree.
     *
     * Recursively descends the tree to locate the correct insertion point.
     * Values smaller than a node go to the left subtree; larger values go
     * to the right. Duplicate values are ignored to maintain uniqueness.
     *
     * @param {number} value - The value to insert.
     * @returns {void}
     */
    insert(value) {
        function insertRec(value, node) {
            if (!node) {
                return new Node(value);
            }

            if (value < node.value) {
                node.left = insertRec(value, node.left);
            } else if (value > node.value) {
                node.right = insertRec(value, node.right);
            }

            return node;
        }

        this.root = insertRec(value, this.root);
    }

    /**
     * Performs an in‑order depth‑first traversal of the tree.
     *
     * Recursively visits nodes in ascending sorted order: left subtree → node → right subtree.
     * The provided callback is invoked once for each node encountered.
     *
     * @param {function(Node): void} callback - Function applied to each visited node's value.
     * @param {Node|null} [node=this.root] - Internal parameter used during recursion.
     * @returns {void}
     */
    inOrderForEach(callback, node = this.root) {
        // Base case
        if (!node) return;

        // In-order traversal (left-data-right)
        this.inOrderForEach(callback, node.left);
        callback(node.value);
        this.inOrderForEach(callback, node.right);
    }

    /**
     * Performs a level‑order (breadth‑first) traversal of the tree.
     *
     * Visits nodes one level at a time starting from the root. A queue
     * ensures nodes are processed in depth order: each visited node has
     * its children enqueued, and the traversal continues until the queue
     * is empty. The callback is invoked once for each node's value.
     *
     * @param {function(number): void} callback - Function applied to each node's value.
     * @param {Node[]} [queue=[this.root]] - Internal queue used to maintain traversal order.
     * @returns {void}
     */

    levelOrderForEach(callback, queue = [this.root]) {
        // Base case
        if (!this.root) return;
        if (queue.length === 0) return;

        // Assign first element of the queue to node, then remove the element.
        const node = queue.shift();
        callback(node.value);

        // If children, add them to the queue.
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);

        // Recurse.
        this.levelOrderForEach(callback, queue);
    }
}

export { Tree };
