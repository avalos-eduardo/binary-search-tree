import { Node } from "./node-class.js";

export class Tree {
  constructor(arr) {
    const sortedArray = [...new Set(arr)].sort((a, b) => a - b);
    this.root = buildTree(sortedArray, 0, sortedArray.length - 1);
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  insert(value, root = this.root) {
    if (root === null) {
      return new Node(value);
    }

    if (root.data === value) {
      return root;
    }

    if (value < root.data) {
      root.left = this.insert(value, root.left);
    }

    if (value > root.data) {
      root.right = this.insert(value, root.right);
    }

    return root;
  }

  deleteItem(value, root = this.root) {
    if (root === null) {
      return root;
    }

    if (value < root.data) {
      root.left = this.deleteItem(value, root.left);
    } else if (value > root.data) {
      root.right = this.deleteItem(value, root.right);
    } else {
      //if node has no children
      if (root.left === null && root.right === null) {
        return null;
      }

      //if node has only one child
      if (root.left === null) {
        return root.right;
      } else if (root.right === null) {
        return root.left;
      }

      //if node has two children
      let minNode = this._findMin(root.right);
      root.data = minNode.data;

      root.right = this.deleteItem(minNode.data, root.right);
    }

    return root;
  }

  find(value, root = this.root) {
    if (root === null || value === root.data) {
      return root;
    } else if (value < root.data) {
      return this.find(value, root.left);
    } else {
      return this.find(value, root.right);
    }
  }

  levelOrder(callback, root = this.root) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required.");
    }

    if (root === null) return;

    const queue = [root];

    while (queue.length > 0) {
      const currentNode = queue.shift();

      callback(currentNode);

      if (currentNode.left) {
        queue.push(currentNode.left);
      }

      if (currentNode.right) {
        queue.push(currentNode.right);
      }
    }
  }

  inOrder(callback, root = this.root) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required.");
    }

    if (root === null) return;

    this.inOrder(callback, root.left);

    callback(root);

    this.inOrder(callback, root.right);
  }

  preOrder(callback, root = this.root) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required.");
    }

    if (root === null) return;

    callback(root);

    this.preOrder(callback, root.left);

    this.preOrder(callback, root.right);
  }

  postOrder(callback, root = this.root) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required.");
    }

    if (root === null) return;

    this.postOrder(callback, root.left);

    this.postOrder(callback, root.right);

    callback(root);
  }

  height(root = this.root) {
    if (root === null) return -1;

    const leftHeight = this.height(root.left);
    const rightHeight = this.height(root.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(value, root = this.root, currentDepth = 0) {
    if (root === null) return -1;

    if (value === root.data) return currentDepth;

    if (value < root.data) {
      return this.depth(value, root.left, ++currentDepth);
    } else {
      return this.depth(value, root.right, ++currentDepth);
    }
  }

  isBalanced(root = this.root) {
    if (root === null) return true;
    const leftHeight = this.height(root.left);
    const rightHeight = this.height(root.right);

    if (Math.abs(leftHeight - rightHeight) > 1) {
      return false;
    }

    return this.isBalanced(root.left) && this.isBalanced(root.right);
  }

  rebalance(root = this.root) {
    const sortedArray = [];
    this.inOrder(function(node) {
        sortedArray.push(node.data);
    }, root);

    this.root = buildTree(sortedArray, 0, sortedArray.length - 1);
  }

  _findMin(root) {
    while (root.left !== null) {
      root = root.left;
    }

    return root;
  }

}

function buildTree(arr, start, end) {
  if (start > end) return null;

  let mid = start + Math.floor((end - start) / 2);
  let root = new Node(arr[mid]);
  root.left = buildTree(arr, start, mid - 1);
  root.right = buildTree(arr, mid + 1, end);

  return root;
}