class DoubleNode<T> {
    public next: DoubleNode<T> | null = null;
    public previous: DoubleNode<T> | null = null;
    public data: T;

    constructor(value: T) {
        this.data = value;
    }
}

interface IDoubleLinkedList<T> {
    addElementAtBegin(data: T): DoubleNode<T>;
    addElementAtEnd(data: T): DoubleNode<T>;
    removeElementAtBegin(): boolean;
    removeElementAtEnd(): boolean;
    toArray(): T[];
    size(): number;
    searchFirst(criteria: (data: T) => boolean): DoubleNode<T> | null;
    searchAll(criteria: (data: T) => boolean): DoubleNode<T>[] | null;
}

class DoubleLinkedList<T> implements IDoubleLinkedList<T> {
    public rootNode: DoubleNode<T> | null = null;

    addElementAtBegin(data: T): DoubleNode<T> {
        const newNode = new DoubleNode(data);
        if (!this.rootNode) return this.rootNode = newNode;
        this.rootNode.previous = newNode;
        newNode.next = this.rootNode;
        return newNode;
    }

    addElementAtEnd(data: T): DoubleNode<T> {
        throw new Error("Method not implemented.");
    }
    removeElementAtBegin(): boolean {
        throw new Error("Method not implemented.");
    }

    removeElementAtEnd(): boolean {
        throw new Error("Method not implemented.");
    }

    toArray(): T[] {
        const array: T[] = [];
        const pushDataToArray = (node: DoubleNode<T>): T[] => {
            array.push(node.data);
            return node.next ? pushDataToArray(node.next) : array;
        }
        return this.rootNode ? pushDataToArray(this.rootNode) : array;
    }

    size(): number {
        throw new Error("Method not implemented.");
    }

    searchFirst(criteria: (data: T) => boolean): DoubleNode<T> | null {
        throw new Error("Method not implemented.");
    }

    searchAll(criteria: (data: T) => boolean): DoubleNode<T>[] | null {
        throw new Error("Method not implemented.");
    }
}

interface RandomDataType {
    stringValue: string;
    numericValue: number;
    booleanValue: boolean;
}

const doubleLinkedList = new DoubleLinkedList<RandomDataType>();
doubleLinkedList.addElementAtBegin({ stringValue: 'Root node', numericValue: 0, booleanValue: true });

for (let index = 1; index <= 100; index++) {
    console.log(doubleLinkedList.addElementAtBegin({ stringValue: `Node ${index}`, numericValue: index, booleanValue: index % 3 === 0 }));
}

console.log(doubleLinkedList.toArray());
