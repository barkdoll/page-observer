# Page Observer

A DOM mutation 'event listener' built with MutationObservers. 

Not available on npm yet. Never published a package before. Maybe if people like this I would! 🍹


## Description

This is a small module that utilizes MutationObservers to listen for DOM changes.
If the desired node is found, it can then be bound.

It's original use case was for React, to help create a bridge for re-rendering (ReactDOM.render) to an element in legacy (multi-page) applications if the element to be rendered to was added/removed from the page. ReactDOM binds a root component in its "virtual DOM" to an actual DOM element and renders its own application markup in place of that element. To use it with legacy sites where many actual DOM mutations may happen frequently (by APIs such as jQuery and the native DOM API), it can listen and find the element (via its CSS selector) and then run a callback to initialize React— or whatever you'd like to do with a callback function. 

The good news is the callback does not have to be React-related— it can be anything. So it's basically a mini-mini-framework for creating DOM mutation event listeners.

## Usage

1. `import`/`require` it as a module
    ```js
    // example.js
    
	import pageObserver from './path/to/page-observer';

	// OR
    
	const pageObserver = require('page-observer');
    ```
    
    OR load it in a `<script>` tag
    
    ```html
	<!-- example_page.html -->
    <script src="/path/to/page-observer.js"></script>
    <!-- 
		OR module style 
    -->
    <script type="module" src="/path/to/page-observer.mjs"></script>
    <script nomodule src="/path/to/page-observer.js"></script>
    ```
1. run the observer with your callback 

    ```js
    createObserver('.my-selector', function() { 
		console.log('found the element!');
    });
    ```
    
1. WIN
