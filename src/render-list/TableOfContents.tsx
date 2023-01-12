import { Fragment, ReactNode } from "react";
import type { TreeEntry } from "../toc-tree/toc-tree";

const treeToReact = (
  treeEntries: TreeEntry[],
  Container: typeof DefaultListContainer,
  ListItem: typeof DefaultListItem,
  depth = 1
) => {
  const Entries = treeEntries.map((treeEntry) => {
    const { name, children, element } = treeEntry;
    const childrenComponents = treeToReact(
      children,
      Container,
      ListItem,
      depth + 1
    );
    const isList = depth === 1 && children.length > 0;
    const Wrapper = ({ children }: { children: ReactNode }) =>
      isList ? <ListItem depth={0}>{children}</ListItem> : <>{children}</>;
    const listItem = (
      <ListItem depth={depth} name={name} element={element}>
        <> {childrenComponents}</>
      </ListItem>
    );
    return (
      <Wrapper key={name}>
        {isList ? <Container depth={depth}>{listItem}</Container> : listItem}
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

const DefaultListItem = ({
  name,
  children,
  element,
  depth,
}: {
  children: ReactNode;
  depth: number;
  name?: string; // name is optional because top level list items have no names and contain other lists
  element?: Element;
}) => (
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
