# Solution: Component Composition

## Approach

Compound components colocate API; children prop for body content.

## Key concepts

- **Composition over inheritance**: Combine small components instead of mega props.
- **Compound components**: Card.Header shares implicit context optional.


## Solution code

```tsx
import { ReactNode } from 'react';

function CardRoot({ children }: { children: ReactNode }) {
  return <article className="card">{children}</article>;
}
function Header({ children }: { children: ReactNode }) {
  return <header className="card__header">{children}</header>;
}
function Body({ children }: { children: ReactNode }) {
  return <div className="card__body">{children}</div>;
}
function Footer({ children }: { children: ReactNode }) {
  return <footer className="card__footer">{children}</footer>;
}

export const Card = Object.assign(CardRoot, { Header, Body, Footer });

export function ArticlePreview() {
  return (
    <Card>
      <Card.Header><h2>ReactTeacher</h2></Card.Header>
      <Card.Body><p>Learn by building.</p></Card.Body>
      <Card.Footer><button>Read more</button></Card.Footer>
    </Card>
  );
}
```

## Walkthrough

Object.assign attaches subcomponents to Card for ergonomic JSX namespace.

## Common mistakes

- One Card with 12 boolean layout props
- Forgetting to export subcomponents

## Stretch goals

- React Context for Card theme
- Polymorphic `as` prop
