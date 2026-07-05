---
'@m3-baseui/react-vanilla-extract': major
'@m3-baseui/react-tailwind': major
'@m3-baseui/core': major
---

Select no longer exposes `Select.ScrollUpArrow` / `Select.ScrollDownArrow`.

M3 Menus have no sticky chevron scroll affordance — the menu surface scrolls
via plain `overflow` (matching Material 3 Compose's `ScrollState` + `Column`
pattern). The sticky arrows were a Base UI Select carry-over that diverged from
the spec and interfered with the `:first-child` / `:last-child` item corner
shapes (issue #98).

**Breaking (Select):**

- The `ScrollUpArrow` and `ScrollDownArrow` parts are removed from the Select
  namespace in both engines, along with the `scrollUpArrow` / `scrollDownArrow`
  slots on `SelectClasses`.

Migration: delete `<Select.ScrollUpArrow />` / `<Select.ScrollDownArrow />` from
your `Select.Popup`. The popup already scrolls on overflow, so no replacement is
needed. Custom class overrides for the `scrollUpArrow` / `scrollDownArrow` slots
can be dropped.
