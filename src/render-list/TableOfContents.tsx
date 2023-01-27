import { ReactNode } from "react";
import type { TreeEntry } from "../toc-tree/toc-tree";

const treeToReact = (
  treeEntries: TreeEntry[],
  Container: ListContainerType,
  ListItem: ListItemType,
  depth = 1
) => {
  const createWrapper = (isList: boolean) => {
    const ListWrapperComponent = ({ children }: { children: ReactNode }) =>
      isList ? <ListItem depth={0}>{children}</ListItem> : <>{children}</>;
    return ListWrapperComponent;
  };

  const createListItem = (
    depth: number,
    name: string,
    element: TreeEntry["element"]
  ) => {
    const ListComponent = ({ children }: { children: ReactNode }) => (
      <ListItem depth={depth} name={name} element={element}>
        {children}
      </ListItem>
    );

    return ListComponent;
  };

  const Entries = treeEntries.map((treeEntry) => {
    const { name, children, element } = treeEntry;
    const childrenComponents = treeToReact(
      children,
      Container,
      ListItem,
      depth + 1
    );
    const isTopLevelList = depth === 1 && children.length > 0;
    const Wrapper = createWrapper(isTopLevelList);
    const List = createListItem(depth, name, element);
    return (
      <Wrapper key={name}>
        <List>{childrenComponents}</List>
      </Wrapper>
    );
  });
  return <Container depth={0}>{Entries}</Container>;
};

const DefaultListContainer = ({
  children,
  depth,
}: {
  children: ReactNode;
  depth: number;
}) => (
  <ol style={{ listStyle: "none" }} data-slick-toc-depth={depth}>
    {children}
  </ol>
);

type ListItemProps = {
  children: ReactNode;
  depth: number;
  name?: string; // name is optional because top level list items have no names and contain other lists
  element?: Element;
};

const DefaultListItem = ({ name, children, element }: ListItemProps) => (
  <li key={name}>
    {name ? (
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          element?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        {name}
      </a>
    ) : (
      <></>
    )}
    {children}
  </li>
);

export type ListItemType = typeof DefaultListItem;
export type ListContainerType = typeof DefaultListContainer;

type Props = {
  tree: TreeEntry;
  ListContainer?: ListContainerType;
  ListItem?: ListItemType;
};

export const TableOfContents = ({
  tree,
  ListContainer = DefaultListContainer,
  ListItem = DefaultListItem,
}: Props) => {
  const MyComp = treeToReact(tree.children, ListContainer, ListItem);
  return <nav data-slick-toc-nav>{MyComp}</nav>;
};
