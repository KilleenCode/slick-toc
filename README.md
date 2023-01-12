## Usage

### Basic

```tsx
import { useSlickToc } from "@killeencode/slick-toc";

const App = () => {
  const [registerSection, container, TableOfContents] = useSlickToc();

  return (
    <main {...container<HTMLDivElement>()}>
      <h2>Table of Contents</h2>
      <TableOfContents />
      <section {...register("About")}>
        <h2>About</h2>
      </section>
      <section {...register("Contact")}>
        <h2>Contact</h2>
      </section>
    </main>
  );
};
```

### Customize Components

```tsx
const App = () => {
    const [registerSection, container, TableOfContents] = useSlickToc({
        ListContainer: MyCustomContainer
        ListItem: MyCustomItem
    });

    return (

        <main {...container<HTMLDivElement>()}>
            <h2>Table of Contents</h2>
            <TableOfContents />
            <section {...register('About')}>
                <h2>About</h2>
            </section>
            <section {...register('Contact')}>
                <h2>Contact</h2>
            </section>
        </main>
    )
}
```

## Todo

- [ ] Add Context
- [ ] Better containerRef usage

## Development

- `npm i -g pnpm`
- `pnpm i`
- `pnpm dev`
