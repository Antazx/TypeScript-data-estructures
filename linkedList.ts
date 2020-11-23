class MyBasicNode {
    public next: MyBasicNode | null = null;
    public data: string;

    constructor(data: string) {
        this.data = data;
    }
}

interface IMyBasicLinkedList {
    addElementAtBegining(data: string): MyBasicNode;
    addElementAtEnd(data: string): MyBasicNode;
    deleteElementAtBegining(): boolean;
    deleteElementAtEnd(): boolean;
    throughList(): string[];
    size(): number;
    search(criteria: (data: string) => boolean): MyBasicNode | null;
}

class MyBasicLinkedList implements IMyBasicLinkedList {

    public rootNode: MyBasicNode | null = null;

    addElementAtBegining(data: string): MyBasicNode {
        const newNode = new MyBasicNode(data);
        if (!this.rootNode) return this.rootNode = newNode;

        newNode.next = this.rootNode;
        this.rootNode = newNode;

        return newNode;
    }

    addElementAtEnd(data: string): MyBasicNode {
        const node = new MyBasicNode(data);
        const getLast = (node: MyBasicNode): MyBasicNode => {
            return (node.next) ? getLast(node.next) : node;
        };
        if (!this.rootNode) return this.rootNode = node;
        getLast(this.rootNode).next = node;
        return node;
    }

    deleteElementAtBegining(): boolean {
        if (!this.rootNode || !this.rootNode.next) return false;
        const currentNext = this.rootNode.next;
        this.rootNode = currentNext;
        return true;
    }

    deleteElementAtEnd(): boolean {
        throw new Error("Meplota el serevro");
    }

    throughList(): string[] {
        const toStringArray = (node: MyBasicNode): string[] => {
            array.push(node.data);
            return (node.next) ? toStringArray(node.next) : array;
        };
        const array: string[] = [];
        if (!this.rootNode) return array;
        return toStringArray(this.rootNode);
    }

    size(): number {
        return this.throughList().length
    }

    search(criteria: (data: string) => boolean): MyBasicNode | null {
        const checkNext = (node: MyBasicNode): MyBasicNode | null => {
            if (criteria(node.data)) return node;
            return node.next ? checkNext(node.next) : null;
        }
        return this.rootNode ? checkNext(this.rootNode) : null;
    }
}

const maxNodes = 50;
const listReport = (linkedList: MyBasicLinkedList): void => {
    console.log('-------- REPORT START --------');
    console.log('- Root node: ', linkedList.rootNode);
    console.log(`- List size: ${linkedList.size()}`);
    console.log('- Status: ', linkedList.throughList());
    console.log('-------- REPORT END --------');
}
const testList = new MyBasicLinkedList();
testList.addElementAtBegining('ROOT NODE');

for (let addIndex = 1; addIndex <= maxNodes; addIndex++) {
    //testList.addElementAtBegining(`Node ${addIndex}`);
    testList.addElementAtEnd(`Node ${-addIndex}`);
}

console.log(testList.search((value: string) => {
    return (value === "Node x");
}))

listReport(testList);