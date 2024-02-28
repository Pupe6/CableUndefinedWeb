import * as WokwiElements from "@b.borisov/cu-elements";

// Define a function to get JSX elements from Wokwi elements
const getWokwiElements = () => {
	// Get all the elements from Wokwi elements into an array
	console.log(WokwiElements.ArduinoMegaElement.properties);
	const elements = Object.keys(WokwiElements).map(element => {
		// Get the element from Wokwi elements
		const Element = WokwiElements[element] as any;
		// Return the element as JSX
		return Element;
	});
	// Return the elements
	console.log(elements);
	return elements;
};

// Export the function
export const wokwiElements = getWokwiElements();
