export declare type Key = any;
export declare type Value = any;
export declare type Comparator<Key> = (a: Key, b: Key) => number;
export declare type Visitor<Key, Value> = (key: Key, value?: Value) => void;
