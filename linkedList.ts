class GenericNode<T> {
    public next: GenericNode<T> | null = null;
    public data: T;

    constructor(value: T) {
        this.data = value;
    }
}

interface ISingleLinkedList<T> {
    addElementAtBegin(data: T): GenericNode<T>;
    addElementAtEnd(data: T): GenericNode<T>;
    removeElementAtBegin(): boolean;
    removeElementAtEnd(): boolean;
    toArray(): T[];
    size(): number;
    searchFirst(criteria: (data: T) => boolean): GenericNode<T> | null;
    searchAll(criteria: (data: T) => boolean): GenericNode<T>[] | null;
}

class SingleLinkedList<T> implements ISingleLinkedList<T> {
    public rootNode: GenericNode<T> | null = null;

    addElementAtBegin(data: T): GenericNode<T> {
        const node = new GenericNode(data);
        if (!this.rootNode) return this.rootNode = node;
        node.next = this.rootNode;
        return this.rootNode = node;
    }

    addElementAtEnd(data: T): GenericNode<T> {
        const node = new GenericNode(data);
        const getLast = (node: GenericNode<T>): GenericNode<T> => node.next ? getLast(node.next) : node;

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
        const getSecondLast = (node: GenericNode<T>): GenericNode<T> | null => {
            if (!node.next) return null;
            return !node.next.next ? node : getSecondLast(node.next);
        }
        const secondLastNode = getSecondLast(this.rootNode);
        if (secondLastNode) secondLastNode.next = null;

        return true;
    }

    toArray(): T[] {
        const array: T[] = [];
        const pushToArray = (node: GenericNode<T>): T[] => {
            array.push(node.data);
            return node.next ? pushToArray(node.next) : array;
        }
        return this.rootNode ? pushToArray(this.rootNode) : array;
    }

    size(): number {
        return this.toArray().length;
    }

    searchFirst(criteria: (data: T) => boolean): GenericNode<T> | null {
        const checkNext = (node: GenericNode<T>): GenericNode<T> | null => {
            if (criteria(node.data)) return node;
            return node.next ? checkNext(node.next) : null;
        }
        return this.rootNode ? checkNext(this.rootNode) : null;
    }

    searchAll(criteria: (data: T) => boolean): GenericNode<T>[] | null {
        const array: GenericNode<T>[] = [];
        const checkNext = (node: GenericNode<T>): GenericNode<T>[] | null => {
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
