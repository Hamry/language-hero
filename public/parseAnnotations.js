function parseAnnotations(annotated) {
    // Function to get the error color based on type
    function getErrorColor(type) {
        const errorColors = {
            V: 'red', // Verb errors
            N: 'blue', // Noun errors
            S: 'green', // Syntax errors
            L: 'orange' // Lexical errors
        };
        return errorColors[type] || 'grey'; // Default color if type is unknown
    }

    // Updated Regex to dynamically match the error number without hardcoding
    const regex = /<(\d+) ([VNSL]) ([^>]+)>([^<]+)<\1>/g;
    
    // Replace function to transform annotated text into HTML with tooltips
    const replaceFunction = (match, number, type, reason, offendingPhrase) => {
        const colorClass = `tooltip ${getErrorColor(type)}`; // Get color class based on error type
	const explanation = reason.trim().replace(/"/g, '&quot;')
        // Return a span element with the class, data attribute for explanation, and the offending phrase
        return `<span class="${colorClass}" data-explanation="${explanation}">${offendingPhrase}</span>`;
    };
    
    // Replace annotated errors with HTML spans using the replace method and the replaceFunction callback
    const html = annotated.replace(regex, replaceFunction);

    return `<p>${html}</p>`; // Wrap the result in paragraph tags for HTML output
}

module.exports = parseAnnotations;
