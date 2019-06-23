import { Comparator, Visitor } from './types';
export default class BTreeNode<Key, Value> {
    leaf: boolean;
    keys: Array<Key>;
    data: Array<Value>;
    n: number;
    C: Array<BTreeNode<Key, Value>>;
    constructor(t: number, isLeaf: boolean);
    traverse(visitor: Visitor<Key, Value>): void;
    search(key: Key, comparator: Comparator<Key>): BTreeNode<Key, Value>;
    findKey(key: Key, comparator: Comparator<Key>): number;
    insertNonFull(k: Key, value: Value, comparator: Comparator<Key>, t: number): void;
    splitChild(i: number, y: BTreeNode<Key, Value>, t: number): void;
    remove(k: Key, comparator: Comparator<Key>, t: number): void;
    removeFromLeaf(idx: number): void;
    removeFromNonLeaf(idx: number, comparator: Comparator<Key>, t: number): void;
    prev(idx: number): Key;
    next(idx: number): Key;
    fill(idx: number, t: number): void;
    borrowFromPrev(idx: number): void;
    borrowFromNext(idx: number): void;
    merge(idx: number, t: number): void;
    height(): number;
}
