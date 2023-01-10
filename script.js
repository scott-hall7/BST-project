

class Node  {
    constructor(data)   {
        this.data = data;
        this.leftChild = null;
        this.rightChild = null;
    }
}

class Tree {
    constructor(array)   {
        //  Removes array duplicates and sorts array in order
        const sortedArray = [...new Set(array)].sort((a, b) => a-b);
        this.root = this.buildTree(sortedArray);
    }

    buildTree(sortedArray)    {
        //  Breaks recusion
        if(sortedArray.length === 0) return null;

        //  Finds midpoint of array
        const mid = Math.floor(sortedArray.length / 2);

        //  Creates root node of midpoint of array value
        const newNode = new Node(sortedArray[mid]);

        //  Performs build tree on both halves of split array
        newNode.leftChild = this.buildTree(sortedArray.slice(0, mid))
        newNode.rightChild = this.buildTree(sortedArray.slice(mid + 1))

        //  Returns root node
        return newNode;
    }

    insert(value)   {
        const newNode = new Node(value);

        //  If there is no root node, set newNode to be root
        if (this.root === null) {
            root = newNode;
            return root;
        }

        let temp = this.root;
        let previousNode = null;
        while(temp != null) {
            

            if(value === temp.data) return;

            else if(temp.data > value)   {  
                previousNode = temp;
                temp = temp.leftChild;
            } 

            else if(temp.data < value)    {
                previousNode = temp;
                temp = temp.rightChild;
            }
        }

        if(previousNode.data > value) previousNode.leftChild = newNode;
        else previousNode.rightChild = newNode;
    }


    delete(value, currentNode = this.root)   {
        //  Base case of empty BST
        if(currentNode === null) return currentNode;

        //  Recusively calls function on left child node if value is smaller that root value
        if(currentNode.data > value) {
            currentNode.leftChild = this.delete(value, currentNode.leftChild);
            return currentNode;
        }
        
        //  Recusively calls function on right child node if value is larger that root value
        if(currentNode.data < value) {
            currentNode.rightChild = this.delete(value, currentNode.rightChild);
            return currentNode;
        }

        else    {
            //  For 1 child or no child cases
            if(currentNode.leftChild == null) return currentNode.rightChild;
            if(currentNode.rightChild == null) return currentNode.leftChild;

            //  For 2 child cases
            else{
                const successorNode = this.#findMin(currentNode.rightChild)
                currentNode.data = successorNode.data;
                currentNode.rightChild = this.delete(successorNode.data, currentNode.rightChild)
                return currentNode;
            }
        }
    }

    find(value, currentNode = this.root) {
        //  Recusive base case
        if(value === currentNode.data) return currentNode;

        //  Searches children of nodes based on value compared to node value
        if(value < currentNode.data) currentNode = this.find(value, currentNode.leftChild);
        if(value > currentNode.data) currentNode = this.find(value, currentNode.rightChild);

        return currentNode;
    }

    levelOrder(callbackFn) {
        const queue = [this.root];
        const levelOrderList = [];
        while (queue.length > 0) {
            const currentNode = queue.shift();
            if(callbackFn) callbackFn(currentNode)
            else levelOrderList.push(currentNode.data);
            const awaitingQueue = [currentNode?.leftChild, currentNode?.rightChild].filter((value) => value)
            queue.push(...awaitingQueue);
        }
        return levelOrderList;
    }

    inorder(callbackFn, currentNode = this.root) {
        if (currentNode == null) return;
        let stack = [];
        let inorderList=[];

        while (currentNode != null || stack.length > 0) {
            while (currentNode != null) {
                stack.push(currentNode);
                currentNode = currentNode.leftChild;
            }
            currentNode = stack.pop();
            if (callbackFn) callbackFn(currentNode);
            else inorderList.push(currentNode.data)
            currentNode = currentNode.rightChild;
        }
        return inorderList
    } 
    
    preorder(callbackFn, currentNode = this.root, preorderList = []) {
        if (currentNode == null) return;

        if(callbackFn) callbackFn(currentNode);
        else preorderList.push(currentNode.data);

        this.preorder(callbackFn, currentNode.leftChild, preorderList);
        this.preorder(callbackFn, currentNode.rightChild, preorderList)

        return preorderList;
    }  
    
    postorder(callbackFn, currentNode = this.root, postorderList = []) {
        if (currentNode == null) return;

        this.postorder(callbackFn, currentNode.leftChild, postorderList);
        this.postorder(callbackFn, currentNode.rightChild, postorderList)

        if(callbackFn) callbackFn(currentNode);
        else postorderList.push(currentNode.data);

        if (postorderList.length > 0) return postorderList;
    }

    height(currentNode = this.root) {
        if (currentNode === null) return 0;

        const leftHeight = this.height(currentNode.leftChild);
        const rightHeight = this.height(currentNode.rightChild)

        if (parseInt(leftHeight) > parseInt(rightHeight)) return parseInt(leftHeight) + 1;
        else return parseInt(rightHeight) + 1;
    }

    depth(value) {
        let currentNode = this.root;
        let nodeDepth = 0;
        while(currentNode.data != value)    {
            nodeDepth += 1;
            if(value > currentNode.data) currentNode = currentNode.rightChild;
            if(value < currentNode.data) currentNode = currentNode.leftChild;
        }
        return nodeDepth;
    
    }

    isBalanced()    {
        let currentNode = this.root;

        const leftHeight = this.height(currentNode.leftChild);
        const rightHeight = this.height(currentNode.rightChild);

        return !(Math.max(leftHeight, rightHeight) - Math.min(leftHeight, rightHeight) > 1)

    }

    rebalance() {
        const inorderList = this.inorder();
        this.root = this.buildTree(inorderList)
    }

    //  Private methods
    #findMin(node)  {
        let minNode = node;
        while(minNode.leftChild)    {
            minNode = minNode.leftChild
        }
        return minNode;
    }

}

function randomBST()    {
    let unsortedArray = []
    for(let i = 0; i < 10; i++) {
        let randomNumber = Math.floor(Math.random() * 100) + 1;
        unsortedArray.push(randomNumber)
    }
    return unsortedArray;
}

const tree = new Tree(randomBST())


console.log(tree.isBalanced());

console.log(tree.levelOrder());
console.log(tree.inorder());
console.log(tree.preorder());
console.log(tree.postorder());

tree.insert(150);
tree.insert(900);
tree.insert(600);

console.log(tree)

console.log(tree.isBalanced());
tree.rebalance();
console.log(tree.isBalanced());

console.log(tree.levelOrder());
console.log(tree.inorder());
console.log(tree.preorder());
console.log(tree.postorder());
console.log(tree)










