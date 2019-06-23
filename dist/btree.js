"use strict";
/* Reference: CLRS3 - Chapter 18 - (499-502)
  It is advised to read the material in CLRS before taking a look at the code.
  */
exports.__esModule = true;
var btree_node_1 = require("./btree_node");
var DEFAULT_COMPARATOR = function (a, b) { return a - b; };
var BTree = /** @class */ (function () {
    function BTree(t, comparator) {
        if (t === void 0) { t = 8; }
        if (comparator === void 0) { comparator = DEFAULT_COMPARATOR; }
        this.root = null; // Pointer to root node
        this.t = t; // Minimum degree
        this.comparator = comparator;
    }
    BTree.prototype.traverse = function (visitor) {
        if (this.root !== null)
            this.root.traverse(visitor);
        return this;
    };
    // function to search a key in this tree
    BTree.prototype.search = function (k) {
        return (this.root === null) ? null : this.root.search(k, this.comparator);
    };
    // The main function that inserts a new key in this B-Tree
    BTree.prototype.insert = function (k, value) {
        var t = this.t;
        // If tree is empty
        if (this.root === null) {
            // Allocate memory for root
            this.root = new btree_node_1["default"](t, true);
            this.root.keys[0] = k; // Insert key
            this.root.data[0] = value;
            this.root.n = 1; // Update number of keys in root
        }
        else { // If tree is not empty
            var root = this.root;
            var comparator = this.comparator;
            // If root is full, then tree grows in height
            if (root.n === 2 * t - 1) {
                // Allocate memory for new root
                var s = new btree_node_1["default"](t, false);
                // Make old root as child of new root
                s.C[0] = root;
                // Split the old root and move 1 key to the new root
                s.splitChild(0, root, t);
                // New root has two children now.  Decide which of the
                // two children is going to have new key
                var i = 0;
                if (comparator(s.keys[0], k) < 0)
                    i++;
                s.C[i].insertNonFull(k, value, comparator, t);
                // Change root
                this.root = s;
            }
            else { // If root is not full, call insertNonFull for root
                root.insertNonFull(k, value, comparator, t);
            }
        }
        return this;
    };
    // The main function that removes a new key in thie B-Tree
    BTree.prototype.remove = function (k) {
        if (this.root === null) {
            throw new Error("The tree is empty");
        }
        // Call the remove function for root
        this.root.remove(k, this.comparator, this.t);
        // If the root node has 0 keys, make its first child as the new root
        //  if it has a child, otherwise set root as NULL
        if (this.root.n === 0) {
            var tmp = this.root;
            if (this.root.leaf)
                this.root = null;
            else
                this.root = this.root.C[0];
        }
        return this;
    };
    BTree.prototype.height = function () {
        if (this.root === null)
            return 0;
        return this.root.height();
    };
    BTree.prototype.keys = function () {
        var keys = [];
        this.traverse(function (key) { return keys.push(key); });
        return keys;
    };
    BTree.prototype.entries = function () {
        var values = [];
        this.traverse(function (key, value) { return values.push(value); });
        return values;
    };
    return BTree;
}());
exports["default"] = BTree;
