import { ReactNode } from "react";
import { TreeEntry } from "../toc-tree/toc-tree";

const treeToReact = ({
  treeEntries,
  ListContainer,
  ListItem,
  depth = 1,
}: {
  treeEntries: TreeEntry[];
  ListContainer: ListContainerType;
  ListItem: ListItemType;
  depth?: number;
}) => {
  const createWrapper = (hasChildren: boolean) => {
    const ListWrapperComponent = ({ children }: { children: ReactNode }) => {
      if (hasChildren) {
        return (
          <ListItem depth={depth}>
            <ListContainer depth={depth} data-slick-toc-depth={depth}>
              {children}
            </ListContainer>
          </ListItem>
        );
      }
      return <>{children}</>;
    };
    return ListWrapperComponent;
  };

  const Entries = treeEntries.map((treeEntry) => {
    const { name, children, element } = treeEntry;
    const childrenComponents =
      children.length > 0
        ? treeToReact({
            treeEntries: children,
            ListContainer,
            ListItem,
            depth: depth + 1,
          })
        : null;
    const Wrapper = createWrapper(children.length > 0);
    return (
      <Wrapper key={name}>
        <ListItem depth={depth} name={name} element={element}>
          {childrenComponents}
        </ListItem>
      </Wrapper>
    );
  });
  return <ListContainer depth={depth}>{Entries}</ListContainer>;
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
  children?: ReactNode;
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
  const MyComp = treeToReact({
    treeEntries: tree.children,
    ListContainer,
    ListItem,
  });
  return <nav data-slick-toc-nav>{MyComp}</nav>;
};
