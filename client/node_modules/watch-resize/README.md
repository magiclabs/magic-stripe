# 👀 `watchResize`

[![code style: airbnb](https://img.shields.io/badge/code%20style-airbnb-blue.svg?style=flat)](https://github.com/airbnb/javascript)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://github.com/prettier/prettier)

> Watch any DOM element for size changes without polyfills.

## 💁🏼‍♂️ Introduction

A zero-dependency, cross-compatible [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) alternative that doesn't require polyfills. You can watch any element for size changes based on its bounding box.

## 🔗 Installation

Install via `yarn` or `npm`:

```sh
yarn add watch-resize
```

```sh
npm install watch-resize
```

## 🛠️ Usage

```ts
import { watchResize } from 'watch-resize';

const target = document.getElementById('my-element');

watchResize(target, ({ element, event, prevBoundingClientRect, destroy }) => {
  // Do stuff here for each "resize"
})).then(() => {
  // Once the promise resolves, the resize watcher has successfully mounted!
});
```

An object implementing `ResizePayload` is passed to subscribe handler:

```ts
export interface ResizePayload<T extends HTMLElement> {
  element: T;
  event: UIEvent;
  prevBoundingClientRect: ClientRect | DOMRect; // The previous result of "element.getBoundingClientRect()".
  destroy: () => void; // Unobserves the element and cleans up event listeners
}
```
