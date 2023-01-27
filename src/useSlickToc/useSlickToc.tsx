import { useReducer } from "react";
import {
  ListContainerType,
  ListItemType,
  TableOfContents,
} from "../render-list/TableOfContents";
import { convertArrayToTree, TreeEntry } from "../toc-tree/toc-tree";
import { debounce } from "../utils/debounce";
import { reducer } from "./slickTocReducer";

type NodeMapEntry = { parentKey?: string; element: Element };
export type NodeMap = Map<string, NodeMapEntry>;

type RegisterItem = (name: string) => {
  ref: (node: Element | null) => void;
};

export type ItemListItems = { name: string; element: Element }[];

type ResponseArray = [RegisterItem, JSX.Element, TreeEntry];

type Params = {
  ListContainer?: ListContainerType;
  ListItem?: ListItemType;
};

export const useSlickToc = ({
  ListContainer,
  ListItem,
}: Params = {}): ResponseArray => {
  const [itemList, dispatch] = useReducer(reducer, []);

  const debouncedDispatch = debounce(dispatch, 20);
  const register = (name: string) => ({
    ref: () => {
      debouncedDispatch({ type: "getNodes" });
    },
    "data-slick-toc-name": name,
    "data-slick-toc": "",
  });

  //https://codesandbox.io/s/slick-toc-poc-lo1r5v?file=/src/hook.tsx
  const treeJson = convertArrayToTree(itemList).toJSON();
  const TOC = (
    <TableOfContents
      tree={treeJson}
      ListContainer={ListContainer}
      ListItem={ListItem}
    />
  );
  return [register, TOC, treeJson];
};
