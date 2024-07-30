## NIKE

## Tailwind

- Write utility classes and tailwind generates css files for them
- Ability to create new css class on demand and not use the predefined tailwind classes, like `text-[50px]`
- Implemented by JIT compiler
- Inline styles can't use media queries or pseudo classes but tailwind supports them

### Layouts

#### Position

- Determines how an html element is positioned within its containing element.
- Relative,absolute(moves independently), fixed, sticky used with top-0 right-10 etc

### Display

- how elements behave in terms of layout and visibility within the document
- block, inline, none, flex, grid
- align-self applies to individual element
- The two properties flex-direction and flex-wrap are used so often together that the shorthand property flex-flow was created to combine them. This shorthand property accepts the value of the two properties separated by a space.For example, you can use `flex-flow: row wrap` to set rows and wrap them.
- align-content determines the spacing between lines. align-items determines how the items as a whole are aligned within the container. When there is only one line, align-content has no effect

### Config

- Inside config, `darkMode:"class"` will activate theme property
- To use it add `dark:` in the elements
- In config, we can organize the custom styles and colors

      theme: {
      extend: {
          colors: {
              chesnut: "#987636"
          }
      }

  }

- To breakdown writing long utility classes and for cleaner code follow 1. Break down components into Buttons, Inputs etc 2.using `directive` which is adding styles inside index.css which is

      @layer components {
      @apply add styles

  }

3. use component libraries like antD, shadcn etc
