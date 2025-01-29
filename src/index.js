import { Tree } from "./tree.js";

function generateRandomArray(size, max) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * max));
}

// Function to print all traversals
function printTraversals(tree) {
    console.log("Level Order:");
    tree.levelOrder((node) => console.log((node.data + " ")));
    console.log("\n");

    console.log("Pre Order:");
    tree.preOrder((node) => console.log((node.data + " ")));
    console.log("\n");

    console.log("Post Order:");
    tree.postOrder((node) => console.log((node.data + " ")));
    console.log("\n");

    console.log("In Order:");
    tree.inOrder((node) => console.log((node.data + " ")))
    console.log("\n");
}

// 1. Create a BST from random numbers
console.log("Step 1: Creating a binary search tree with random numbers less than 100");
const randomArray = generateRandomArray(10, 100);
const tree = new Tree(randomArray);
console.log("Initial array:", randomArray);
console.log("\nTree structure:");
tree.prettyPrint();
console.log("\n");

// 2. Check if the tree is balanced
console.log("Step 2: Checking if tree is balanced");
console.log("Tree balanced:", tree.isBalanced());
console.log("\n");

// 3. Print all elements in different orders
console.log("Step 3: Printing all traversals");
printTraversals(tree);

// 4. Unbalance the tree by adding numbers > 100
console.log("Step 4: Unbalancing the tree by adding numbers > 100");
[101, 102, 103, 104, 105].forEach(num => tree.insert(num));
console.log("Tree structure after adding numbers > 100:");
tree.prettyPrint();
console.log("\n");

// 5. Confirm tree is unbalanced
console.log("Step 5: Checking if tree is now unbalanced");
console.log("Tree balanced:", tree.isBalanced());
console.log("\n");

// 6. Balance the tree
console.log("Step 6: Rebalancing the tree");
tree.rebalance();
console.log("Tree structure after rebalancing:");
tree.prettyPrint();
console.log("\n");

// 7. Confirm tree is balanced
console.log("Step 7: Confirming tree is balanced again");
console.log("Tree balanced:", tree.isBalanced());
console.log("\n");

// 8. Print all elements in different orders
console.log("Step 8: Printing all traversals after rebalancing");
printTraversals(tree);