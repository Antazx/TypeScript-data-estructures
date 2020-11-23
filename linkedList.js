"use strict";
var MyBasicNode = /** @class */ (function () {
    function MyBasicNode(data) {
        this.next = null;
        this.data = data;
    }
    return MyBasicNode;
}());
var MyBasicLinkedList = /** @class */ (function () {
    function MyBasicLinkedList() {
        this.rootNode = null;
    }
    MyBasicLinkedList.prototype.addElementAtBegining = function (data) {
        var newNode = new MyBasicNode(data);
        if (!this.rootNode)
            return this.rootNode = newNode;
        newNode.next = this.rootNode;
        this.rootNode = newNode;
        return newNode;
    };
    MyBasicLinkedList.prototype.addElementAtEnd = function (data) {
        var node = new MyBasicNode(data);
        var getLast = function (node) {
            return (node.next) ? getLast(node.next) : node;
        };
        if (!this.rootNode)
            return this.rootNode = node;
        getLast(this.rootNode).next = node;
        return node;
    };
    MyBasicLinkedList.prototype.deleteElementAtBegining = function () {
        if (!this.rootNode || !this.rootNode.next)
            return false;
        var currentNext = this.rootNode.next;
        this.rootNode = currentNext;
        return true;
    };
    MyBasicLinkedList.prototype.deleteElementAtEnd = function () {
        throw new Error("Meplota el serevro");
    };
    MyBasicLinkedList.prototype.throughList = function () {
        var toStringArray = function (node) {
            array.push(node.data);
            return (node.next) ? toStringArray(node.next) : array;
        };
        var array = [];
        if (!this.rootNode)
            return array;
        return toStringArray(this.rootNode);
    };
    MyBasicLinkedList.prototype.size = function () {
        return this.throughList().length;
    };
    MyBasicLinkedList.prototype.search = function (criteria) {
        var checkNext = function (node) {
            if (criteria(node.data))
                return node;
            return node.next ? checkNext(node.next) : null;
        };
        return this.rootNode ? checkNext(this.rootNode) : null;
    };
    return MyBasicLinkedList;
}());
var maxNodes = 50;
var listReport = function (linkedList) {
    console.log('-------- REPORT START --------');
    console.log('- Root node: ', linkedList.rootNode);
    console.log("- List size: " + linkedList.size());
    console.log('- Status: ', linkedList.throughList());
    console.log('-------- REPORT END --------');
};
var testList = new MyBasicLinkedList();
testList.addElementAtBegining('ROOT NODE');
for (var addIndex = 1; addIndex <= maxNodes; addIndex++) {
    //testList.addElementAtBegining(`Node ${addIndex}`);
    testList.addElementAtEnd("Node " + -addIndex);
}
console.log(testList.search(function (value) {
    return (value === "Node x");
}));
listReport(testList);
