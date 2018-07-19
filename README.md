# aurelia-visible-attribute

[![TravisCI](https://travis-ci.com/questmetrics/aurelia-visible-attribute.svg?branch=master)](https://travis-ci.com/questmetrics/aurelia-visible-attribute)

A custom attribute for managing common element visibility observation and notification

## Installation

  ```
  npm install aurelia-visible-attribute --save
  ```

## Development

  * Standard process: pull, install and build
    ```
    npm install
    npm run build
    ```

## Test

  ```
  npm run test
  ```

## Plugin Configuration

  Simplest form of plugin configuration:

  ```js
  // main.js
  import { configure as configureVisibleAttribute } from 'aurelia-visible-attribute';

  export function main(aurelia) {
    aurelia
      .use
      .plugin(configureVisibleAttribute)

    // ...
  }
  ```

  The plugin uses [`IntersectionObserver`](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API), which is quite a new feature of the web,

  which means you may want to supply your own polyfill. Recommended polyfill at https://github.com/w3c/IntersectionObserver/tree/master/polyfill .

## Usage

  Annotate any element that has its **visibility** that needs to be observed with attribute `visible` and `bind` command. like the following:

  ```html
  <!-- app.html -->
  <template>
    <div class='container' visible.bind="isContainerVisible">

    </div>
  </template>
  ```

  By default, the binding direction is `from-view`, which means only the custom attribute will notify the view model it resides in. (And the other direction doesn't make sense).

## Problem & solution

