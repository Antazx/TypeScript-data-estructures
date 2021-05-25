class SingleNode<T> {
    public next: SingleNode<T> | null = null;
    public data: T;

    constructor(value: T) {
        this.data = value;
    }
}

interface ISingleLinkedList<T> {
    addElementAtBegin(data: T): SingleNode<T>;
    addElementAtEnd(data: T): SingleNode<T>;
    removeElementAtBegin(): boolean;
    removeElementAtEnd(): boolean;
    toArray(): T[];
    size(): number;
    searchFirst(criteria: (data: T) => boolean): SingleNode<T> | null;
    searchAll(criteria: (data: T) => boolean): SingleNode<T>[] | null;
}

class SingleLinkedList<T> implements ISingleLinkedList<T> {
    public rootNode: SingleNode<T> | null = null;

    addElementAtBegin(data: T): SingleNode<T> {
        const node = new SingleNode(data);
        if (!this.rootNode) return this.rootNode = node;
        node.next = this.rootNode;
        return this.rootNode = node;
    }

    addElementAtEnd(data: T): SingleNode<T> {
        const node = new SingleNode(data);
        const getLast = (node: SingleNode<T>): SingleNode<T> => node.next ? getLast(node.next) : node;

        if (!this.rootNode) return this.rootNode = node;
        return getLast(this.rootNode).next = node;
    }

    removeElementAtBegin(): boolean {
        if (!this.rootNode) return false;
        this.rootNode.next = this.rootNode.next ? this.rootNode = this.rootNode.next : this.rootNode = null;
        return true;
    }

    removeElementAtEnd(): boolean {
        if (!this.rootNode) return false;
        const getSecondLast = (node: SingleNode<T>): SingleNode<T> | null => {
            if (!node.next) return null;
            return !node.next.next ? node : getSecondLast(node.next);
        }
        const secondLastNode = getSecondLast(this.rootNode);
        if (secondLastNode) secondLastNode.next = null;

        return true;
    }

    toArray(): T[] {
        const array: T[] = [];
        const pushToArray = (node: SingleNode<T>): T[] => {
            array.push(node.data);
            return node.next ? pushToArray(node.next) : array;
        }
        return this.rootNode ? pushToArray(this.rootNode) : array;
    }

    size(): number {
        return this.toArray().length;
    }

    searchFirst(criteria: (data: T) => boolean): SingleNode<T> | null {
        const checkNext = (node: SingleNode<T>): SingleNode<T> | null => {
            if (criteria(node.data)) return node;
            return node.next ? checkNext(node.next) : null;
        }
        return this.rootNode ? checkNext(this.rootNode) : null;
    }

    searchAll(criteria: (data: T) => boolean): SingleNode<T>[] | null {
        const array: SingleNode<T>[] = [];
        const checkNext = (node: SingleNode<T>): SingleNode<T>[] | null => {
            if (criteria(node.data)) array.push(node);
            return node.next ? checkNext(node.next) : array;
        }
        return this.rootNode ? checkNext(this.rootNode) : null;
    }
}

interface RandomDataType {
    stringValue: string;
    numericValue: number;
    booleanValue: boolean;
}

const singleLinkedList = new SingleLinkedList<RandomDataType>();
singleLinkedList.addElementAtBegin({ stringValue: "Root node", numericValue: 0, booleanValue: true });

for (let index = 1; index <= 10; index++)
    singleLinkedList.addElementAtEnd({ stringValue: `Node ${index}`, numericValue: index, booleanValue: index % 2 === 0 });



console.log(singleLinkedList.rootNode);
console.log(singleLinkedList.size());

console.log(singleLinkedList.removeElementAtBegin());
console.log(singleLinkedList.removeElementAtEnd());
console.log(singleLinkedList.toArray());

const searchCriteria = (value: RandomDataType) => value.booleanValue === true;
console.log('SearchFirst: ', singleLinkedList.searchFirst(searchCriteria));
console.log('SearchAll: ', singleLinkedList.searchAll(searchCriteria));
