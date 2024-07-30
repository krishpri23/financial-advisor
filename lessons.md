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
- When an element is given relative positioning, it remains in the normal document flow, but you can offset it from its normal position using the top, right, bottom, and left properties. The space originally occupied by the element is preserved in the layout.
- If you have absolutely positioned elements inside a parent, setting the parent to relative ensures the children are positioned relative to the parent rather than the document.
- When an element is given absolute positioning, it is removed from the normal document flow and positioned relative to the nearest positioned ancestor
- The z-index property specifies the stack order of an element. Elements with a higher z-index are in front of those with a lower z-index

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

### Tips

- Use `max-lg` utility class to hide elements
- `min-h-screen` to utilize full height
- `z-index` works only on positioned elements
