import { convertMapToTree, ROOT_NAME, Tree, TreeMap } from "./toc-tree/toc-tree";
describe("Tree", () => {
    describe("Basic nesting", () => {

        test("should create a tree", () => {
            const tree = new Tree("root", []);
            expect(tree.name).toBe("root");
            expect(tree.children).toEqual([]);
        });

        test("should create a tree with nested children", () => {
            const tree = new Tree("root", [
                new Tree("child1", []),
                new Tree("child2", [
                    new Tree("grandchild1", []),
                ]),
            ]);
            expect(tree.name).toBe("root");
            expect(tree.children).toEqual([
                new Tree("child1", []),
                new Tree("child2", [
                    new Tree("grandchild1", []),
                ]),
            ]);
            expect(tree.children[0].name).toBe("child1");
        });

        test("should insert a child at a specific point", () => {
            const tree = new Tree("root", [
                new Tree("child1", []),
                new Tree("child2", [
                    new Tree("grandchild1", []),
                ]),
            ]);
            tree.insertChildAt(
                "child2",

                new Tree("grandchild0", []),
                0
            );
            tree.insertChildAt(
                "child2",

                new Tree("grandchild2", []),
                2
            );
            tree.insertChildAt(
                "grandchild2",

                new Tree("grandgrandchild1", []),
                0
            );

            expect(tree.children).toEqual([
                new Tree("child1", []),
                new Tree("child2", [
                    new Tree("grandchild0", []),
                    new Tree("grandchild1", []),
                    new Tree("grandchild2", [
                        new Tree("grandgrandchild1", []),
                    ]),
                ]),
            ]);
        });
    });
    describe("Parsing", () => {
        test("should parse a simple tree", () => {
            const tree = new Tree(ROOT_NAME, [
                new Tree("child1", []),
                new Tree("child2", [
                    new Tree("grandchild1", [
                        new Tree("grandgrandchild1", []),
                    ]),
                ]),
            ]);
            expect(tree.toJSON()).toEqual({
                name: ROOT_NAME,
                children: [
                    { name: "child1", children: [] },
                    {
                        name: "child2",
                        children: [
                            {
                                name: "grandchild1",
                                children: [{ name: "grandgrandchild1", children: [] }],
                            },
                        ],
                    },
                ],
            });
        });
    });
    describe("Convert Map to Tree", () => {
        test("should convert a simple map to a tree", () => {
            const mockHTMLElement = document.createElement("div");
            const map: TreeMap = new Map([

                ["child1", { parentKey: ROOT_NAME, element: mockHTMLElement }],
                ["child2", { parentKey: ROOT_NAME, element: mockHTMLElement }],
                ["grandchild1", { parentKey: "child2", element: mockHTMLElement }],
                [
                    "grandgrandchild1",
                    { parentKey: "grandchild1", element: mockHTMLElement },
                ],
            ]);
            const tree = convertMapToTree(map);

            expect(tree.toJSON()).toEqual({
                name: ROOT_NAME,
                children: [
                    { name: "child1", element: mockHTMLElement, children: [] },
                    {
                        name: "child2",
                        element: mockHTMLElement,
                        children: [
                            {
                                name: "grandchild1",
                                element: mockHTMLElement,
                                children: [{ name: "grandgrandchild1", element: mockHTMLElement, children: [] }],
                            },
                        ],
                    },
                ],
            });
        });
    });
});
