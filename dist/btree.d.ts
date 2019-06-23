import { Comparator, Visitor } from './types';
import BTreeNode from './btree_node';
export default class BTree<Key, Value> {
    private root?;
    private t;
    private comparator;
    constructor(t?: number, comparator?: Comparator<Key>);
    traverse(visitor: Visitor<Key, Value>): BTree<Key, Value>;
    search(k: Key): BTreeNode<Key, Value>;
    insert(k: Key, value: Value): BTree<Key, Value>;
    remove(k: Key): BTree<Key, Value>;
    height(): number;
    keys(): Array<Key>;
    entries(): Array<Value>;
}
