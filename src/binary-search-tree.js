const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

module.exports = class BinarySearchTree 
{
  constructor() 
  {
    this.rootNode = null;
  }
  root() {
    return this.rootNode;  
  }

  add(data) {
    let newNode = new Node(data);
    if (this.rootNode === null) {
        this.rootNode = newNode;
    } else {
        this.insertNode(this.rootNode, newNode);
    }
  }

  insertNode(node, newNode) {
    if (newNode.data < node.data) {
        if (node.left === null) {
            node.left = newNode;
        } else {
            this.insertNode(node.left, newNode);
        }
    } else {
        if (node.right === null) {
            node.right = newNode;
        } else {
            this.insertNode(node.right, newNode);
        }
    }
  }

  has(data) {
    if (this.find(data) === null) {
        return false
      } else {
          return true;
      }
  }

  find(data) {
    if (this.rootNode === null) return null;
    if (this.rootNode.data == data) return this.rootNode;
    let currNode = this.rootNode;
    while (currNode) {
      if (currNode.data == data) {
        return currNode;
      } else if (currNode.data > data && currNode.left) {
        currNode = currNode.left;
      } else if (currNode.data < data && currNode.right){
        currNode = currNode.right;
      } else {
        return null;
      }
    }
  }

  remove(data){
    if(!this.rootNode){
      return false;
    }
    let currentNode = this.rootNode;
    let parentNode = null;
    while(currentNode){
      if(data < currentNode.data){
        parentNode = currentNode;
        currentNode = currentNode.left;
      } else if(data > currentNode.data){
        parentNode = currentNode;
        currentNode = currentNode.right;
      } else if (currentNode.data === data) {
        if (currentNode.right === null) {
          if (parentNode === null) {
            this.rootNode = currentNode.left;
          } else {
            if(currentNode.data < parentNode.data) {
              parentNode.left = currentNode.left;
            } else if(currentNode.data > parentNode.data) {
              parentNode.right = currentNode.left;
            }
          }
        }else if (currentNode.right.left === null) {
          currentNode.right.left = currentNode.left;
          if(parentNode === null) {
            this.rootNode = currentNode.right;
          } else {
            if(currentNode.data < parentNode.data) {
              parentNode.left = currentNode.right;
            } else if (currentNode.data > parentNode.data) {
              parentNode.right = currentNode.right;
            }
          }
        }else{
          let leftmost = currentNode.right.left;
          let leftmostParent = currentNode.right;
          while(leftmost.left !== null) {
            leftmostParent = leftmost;
            leftmost = leftmost.left;
          }
          leftmostParent.left = leftmost.right;
          leftmost.left = currentNode.left;
          leftmost.right = currentNode.right;
          if(parentNode === null) {
            this.rootNode = leftmost;
          } else {
            if(currentNode.data < parentNode.data) {
              parentNode.left = leftmost;
            } else if(currentNode.data > parentNode.data) {
              parentNode.right = leftmost;
            }
        }
      }
      return true;
    }
  }
}

  min() {
    if (this.rootNode === null) return null;
    let currNode = this.rootNode;
    while (currNode) {
      if (currNode.left) {
        currNode = currNode.left;
      } else {
        return currNode.data;
      }
    }
  }

  max() {
    if (this.rootNode === null) return null;
    let currNode = this.rootNode;
    while (currNode) {
      if (currNode.right) {
        currNode = currNode.right;
      } else {
        return currNode.data;
      }
    }
  }
};