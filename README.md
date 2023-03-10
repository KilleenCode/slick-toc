# Slick TOC

Easily generate dynamic tables of contents!

<a href="https://bundlephobia.com/package/slick-toc@latest"><img src="https://badgen.net/bundlephobia/minzip/slick-toc" /></a>
<a href="https://bundlephobia.com/package/slick-toc@latest"><img src="https://badgen.net/bundlephobia/tree-shaking/slick-toc" /></a>
<a href="https://codeclimate.com/github/KilleenCode/slick-toc/maintainability"><img src="https://api.codeclimate.com/v1/badges/182926eed34a70948fcd/maintainability" /></a>



## Usage

### Basic

```tsx
import { useSlickToc } from "slick-toc";

const App = () => {
  const [register, TableOfContents] = useSlickToc();

  return (
    <main>
      <h2>Table of Contents</h2>
          { TableOfContents }
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
import { useSlickToc } from "slick-toc";

const App = () => {
  const [register, TableOfContents] = useSlickToc({
    ListContainer: MyCustomContainer
    ListItem: MyCustomItem
  });

  return (
    <main>
      <h2>Table of Contents</h2>
        { TableOfContents }
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

## Development

- `npm i -g pnpm`
- `pnpm i`
- `pnpm dev`

### Changesets

Generate [changesets](https://github.com/changesets/changesets) with `pnpm changeset`
