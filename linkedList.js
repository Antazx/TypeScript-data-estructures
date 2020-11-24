"use strict";
var GenericNode = /** @class */ (function () {
    function GenericNode(value) {
        this.next = null;
        this.data = value;
    }
    return GenericNode;
}());
var SingleLinkedList = /** @class */ (function () {
    function SingleLinkedList() {
        this.rootNode = null;
    }
    SingleLinkedList.prototype.addElementAtBegin = function (data) {
        var node = new GenericNode(data);
        if (!this.rootNode)
            return this.rootNode = node;
        node.next = this.rootNode;
        return this.rootNode = node;
    };
    SingleLinkedList.prototype.addElementAtEnd = function (data) {
        var node = new GenericNode(data);
        var getLast = function (node) { return node.next ? getLast(node.next) : node; };
        if (!this.rootNode)
            return this.rootNode = node;
        return getLast(this.rootNode).next = node;
    };
    SingleLinkedList.prototype.removeElementAtBegin = function () {
        if (!this.rootNode)
            return false;
        this.rootNode.next = this.rootNode.next ? this.rootNode = this.rootNode.next : this.rootNode = null;
        return true;
    };
    SingleLinkedList.prototype.removeElementAtEnd = function () {
        if (!this.rootNode)
            return false;
        var getSecondLast = function (node) {
            if (!node.next)
                return null;
            return !node.next.next ? node : getSecondLast(node.next);
        };
        var secondLastNode = getSecondLast(this.rootNode);
        if (secondLastNode)
            secondLastNode.next = null;
        return true;
    };
    SingleLinkedList.prototype.toArray = function () {
        var array = [];
        var pushToArray = function (node) {
            array.push(node.data);
            return node.next ? pushToArray(node.next) : array;
        };
        return this.rootNode ? pushToArray(this.rootNode) : array;
    };
    SingleLinkedList.prototype.size = function () {
        return this.toArray().length;
    };
    SingleLinkedList.prototype.searchFirst = function (criteria) {
        var checkNext = function (node) {
            if (criteria(node.data))
                return node;
            return node.next ? checkNext(node.next) : null;
        };
        return this.rootNode ? checkNext(this.rootNode) : null;
    };
    SingleLinkedList.prototype.searchAll = function (criteria) {
        var array = [];
        var checkNext = function (node) {
            if (criteria(node.data))
                array.push(node);
            return node.next ? checkNext(node.next) : array;
        };
        return this.rootNode ? checkNext(this.rootNode) : null;
    };
    return SingleLinkedList;
}());
var singleLinkedList = new SingleLinkedList();
singleLinkedList.addElementAtBegin({ stringValue: "Root node", numericValue: 0, booleanValue: true });
for (var index = 1; index <= 10; index++)
    singleLinkedList.addElementAtEnd({ stringValue: "Node " + index, numericValue: index, booleanValue: index % 2 === 0 });
console.log(singleLinkedList.rootNode);
console.log(singleLinkedList.size());
console.log(singleLinkedList.removeElementAtBegin());
console.log(singleLinkedList.removeElementAtEnd());
console.log(singleLinkedList.toArray());
var searchCriteria = function (value) { return value.booleanValue === true; };
console.log('SearchFirst: ', singleLinkedList.searchFirst(searchCriteria));
console.log('SearchAll: ', singleLinkedList.searchAll(searchCriteria));
