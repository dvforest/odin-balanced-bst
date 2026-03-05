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
        return this._search(value) != null;
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
     * Performs a in‑order depth‑first traversal of the tree.
     *
     * Recursively visits nodes in ascending sorted order: left subtree → node → right subtree.
     * The provided callback is invoked once for each node's value encountered.
     *
     * @param {function(number): void} callback - Function applied to each visited node's value.
     * @param {Node|null} [node=this.root] - Internal parameter used during recursion.
     * @returns {void}
     */
    inOrderForEach(callback, node = this.root) {
        if (!callback) throw new Error('Callback function required.');
        if (!node) return;

        this.inOrderForEach(callback, node.left);
        callback(node.value);
        this.inOrderForEach(callback, node.right);
    }

    /**
     * Performs an pre‑order depth‑first traversal of the tree.
     *
     * Recursively visits nodes in pre-order: node → left subtree → right subtree.
     * Useful for operations that need to process parents before their children (for example,
     * copying a tree). The provided callback is invoked once for each node's value encountered.
     *
     * @param {function(number): void} callback - Function applied to each visited node's value.
     * @param {Node|null} [node=this.root] - Internal parameter used during recursion.
     * @returns {void}
     */
    preOrderForEach(callback, node = this.root) {
        if (!callback) throw new Error('Callback function required.');
        if (!node) return;

        callback(node.value);
        this.preOrderForEach(callback, node.left);
        this.preOrderForEach(callback, node.right);
    }

    /**
     * Performs an post‑order depth‑first traversal of the tree.
     *
     * Recursively visits nodes in post-order: left subtree → right subtree → node.
     * Useful for operations that need to process children before their parent (for example,
     * deleting a tree). The provided callback is invoked once for each node's value encountered.
     *
     * @param {function(number): void} callback - Function applied to each visited node's value.
     * @param {Node|null} [node=this.root] - Internal parameter used during recursion.
     * @returns {void}
     */
    postOrderForEach(callback, node = this.root) {
        if (!callback) throw new Error('Callback function required.');
        if (!node) return;

        this.postOrderForEach(callback, node.left);
        this.postOrderForEach(callback, node.right);
        callback(node.value);
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
        if (!callback) throw new Error('Callback function required.');
        if (!this.root) return;
        if (queue.length === 0) return;

        // Process first element of queue, then remove it.
        const node = queue.shift();
        callback(node.value);

        // If children, add them to the queue.
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);

        this.levelOrderForEach(callback, queue);
    }

    /**
     * Computes the height of the subtree rooted at the node whose value matches the input.
     *
     * The method first locates the node with the given value. If found, it recursively
     * determines the height of that node by exploring its left and right subtrees,
     * taking the larger of the two heights, and adding one for the current node.
     * Returns undefined if no matching node exists in the tree.
     *
     * @param {number} value - The value of the node whose subtree height should be computed.
     * @returns {number|undefined} The height of the matching node, or undefined if no such node exists.
     */
    height(value) {
        const found = this.search(value);
        if (!found) return undefined;

        function heightRec(node) {
            if (!node) return -1;
            return 1 + Math.max(heightRec(node.left), heightRec(node.right));
        }

        return heightRec(found);
    }

    /**
     * Computes the depth of the node containing the given value.
     * Depth is defined as the number of edges in the path from that node
     * to the root node. Returns undefined if no node matching the value was found.
     *
     * @param {number} value - The value of the node whose depth should be computed.
     * @returns {number} The depth of the node from the root.
     */
    depth(value, d = 0, node = this.root) {
        if (!node) return undefined;
        if (node.value === value) return d;

        if (value < node.value) {
            return this.depth(value, d + 1, node.left);
        } else {
            return this.depth(value, d + 1, node.right);
        }
    }

    /**
     * Returns a node in the tree whose value matches the target.
     *
     * Performs a recursive descent from the root, comparing the target
     * value to each node and following the appropriate subtree until
     * the value is found or the search reaches a null branch.
     *
     * @param {number} value - The value to search for.
     * @param {Node} [node=this.root] - Internal parameter used during recursion.
     * @returns {Node|null} The node matching the value if found, otherwise null.
     */
    search(value, node = this.root) {
        if (!node) return null;
        if (node.value === value) return node;

        if (value < node.value) {
            return this.search(value, node.left);
        } else {
            return this.search(value, node.right);
        }
    }

    /**
     * Checks if the tree is balanced.
     *
     * A binary tree is considered balanced if, for every node in the tree,
     * the height difference between its left and right subtrees is no more
     * than 1, and both the left and right subtrees are also balanced.
     * @param {Node} [node = this.root] Internal parameter for the recursive function.
     * @returns {boolean} True if the tree is balanced, false otherwise.
     */
    isBalanced() {
        const getProp = (node = this.root) => {
            if (!node) return { height: -1, balanced: true };

            const left = getProp(node.left);
            const right = getProp(node.right);
            const h = 1 + Math.max(left.height, right.height);
            const b = Math.abs(left.height - right.height) <= 1 && left.balanced && right.balanced;

            return { height: h, balanced: b };
        };
        return getProp().balanced;
    }
}

export { Tree };
