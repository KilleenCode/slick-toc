export const ROOT_NAME = "Table of Contents" as const


type EntryElement = Element

export type TreeEntry = {
    name: string,
    children: TreeEntry[]
    element?: EntryElement,
    parentKey?: string,
} 

export class Tree {
    constructor(
        public name: string,
        public children: Tree[],
        public element?: EntryElement,
        public parentKey?: string
    ) { }

    insertChildAt(parentName: string, child: Tree, index?: number) {
        const parent = this.find(parentName);
        if (parent) {
            const placement = index ?? parent.children.length;
            parent.children.splice(placement, 0, child);
        }
    }

    find(name: string): Tree | undefined {
        if (this.name === name) {
            return this;
        }
        for (const child of this.children) {
            const found = child.find(name);
            if (found) {
                return found;
            }
        }
    }

    toJSON(): TreeEntry {
        const element = this.element
        return {
            name: this.name,
            children: this.children.map((child) => child.toJSON()),
            ...(element ? { element } : {})
        }
    }
}


export type TreeMap = Map<string, { parentKey?: string, element: Element }>

// We count on the Map being ordered by node hierarchy
export const convertMapToTree = (map: TreeMap): Tree => {
    const root = new Tree(ROOT_NAME, []);
    for (const [key, { parentKey, element }] of map) {
        const insertAt = parentKey || ROOT_NAME
        root.insertChildAt(insertAt, new Tree(key, [], element, parentKey));
    }
    return root
}

export const convertArrayToTree = (array: { name: string; element: Element; parentKey?: string }[]): Tree => {

    const map = new Map<string, { parentKey?: string, element: Element }>()
    for (const { name, ...rest } of array) {
        map.set(name, { ...rest })
    }

    return convertMapToTree(map)
}