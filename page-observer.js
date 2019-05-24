/**
 * A small plugin that utilizes MutationObservers to listen for DOM changes.
 * If the desired node is found, it can then be bound.
 *
 * It's original use case was for React, to help create a bridge for 
 * re-rendering (ReactDOM.render) to an element in legacy (multi-page) applications 
 * if the element to be rendered to was added/removed from the page.
 * 
 *
 * ReactDOM binds a root component in its "virtual DOM" to an actual DOM element and renders
 * its own application markup in place of that element. To use it with legacy sites where
 * many actual DOM mutations may happen frequently (by APIs such as jQuery and the native
 * DOM API), it can listen and find the element (via its CSS selector) and then run a callback
 * to initialize React— or whatever you'd like to do with a callback function.
 *
 *
 * The good news is the callback does not have to be React-related— it can be anything. 
 * So it's basically a mini-mini-framework for creating DOM mutation event listeners.
 *
 * @param selector string the CSS selector of the element you'd like to listen for
 * @param callback function the callback to be executed when @selector is found
 * @param observeAfterCB bool whether or not to keep observing for the element
 *                              after executing the callback
 */
const createObserver = (selector, callback, observeAfterCB=true) => {

	const body = document.querySelector('body');

	const observerOptions = {
		attributes: true,
		childList: true,
		subtree: true // Watch child nodes for changes
	}

	if ( document.querySelector(selector) !== null )
	{
		callback();
	}

	const nodeObserver = new MutationObserver( (mutations, observer) => {

		const addMutations = mutations
			.filter(m => m.addedNodes.length > 0);

		if (addMutations.length <= 0)
		{
			return;
		}

		const bindingElm = document.querySelector(selector);
		if (bindingElm === null)
		{
			return;
		}

		callback();
		observer.disconnect();

		if ( observeAfterCB )
		{
			reinitialize(nodeObserver);
		}
	});

	nodeObserver.observe(body, observerOptions);



	const reinitialize = (obz) => {

		const reinitializer = new MutationObserver( (mutations, observer) => {

			const removeMutations = mutations
				.filter(m => m.removedNodes.length > 0)

			if (removeMutations.length <= 0)
			{
				return;
			}

			const bindingElm = document.querySelector(selector);
			if (bindingElm !== null)
			{
				return;
			}

			observer.disconnect();

			obz.observe(body, observerOptions)
		});

		reinitializer.observe(body, observerOptions);
	}

}

export default createObserver;
