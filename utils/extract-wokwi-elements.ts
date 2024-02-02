import * as WokwiElements from "@wokwi/elements";

// Define a function to get JSX elements from Wokwi elements
const getWokwiElements = () => {
	// Get all the elements from Wokwi elements into an array
	const elements = Object.keys(WokwiElements).map(element => {
		// Get the element from Wokwi elements
		const Element = WokwiElements[element];
		// Return the element as JSX
		return Element;
	});
	// Return the elements
	console.log(elements);
	return elements;
};

// Export the function
export const wokwiElements = getWokwiElements();
