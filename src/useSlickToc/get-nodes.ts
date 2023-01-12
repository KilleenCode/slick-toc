export const getNodes = (root = document.documentElement) => {

    if (!root) return [];
    const treeWalker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
    const nodeList: Element[] = [];
    let currentNode = treeWalker.currentNode as Element;

    while (currentNode) {
        if (currentNode.hasAttribute("data-slick-toc")) {
            nodeList.push(currentNode);
        }

        currentNode = treeWalker.nextNode() as Element;
    }

    return nodeList.map((item) => {
        const name = item.getAttribute("data-slick-toc-name");
        if (!name) {
            throw new Error("No name attribute on data-slick-toc element");
        }
        const parentKey = getParentSection(item)?.getAttribute("data-slick-toc-name");
        return {
            name,
            element: item,
            ...(parentKey ? { parentKey } : {})
        };
    });
};

export const getParentSection = (
    node: Element,
    filter = (node: Element) => true
): Element | undefined => {
    const getParentsRecurse = (node: Element) => {
        if (node.parentElement && filter(node.parentElement)) {
            return node.parentElement;
        } else if (node.parentElement) {
            getParentsRecurse(node.parentElement);
        } else {
            return undefined;
        }
    };

    return getParentsRecurse(node);
};
