require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; // Use port from environment variables or default to 3000

// Serve static content from the 'public' directory
app.use(express.static('public'));

// Optional: Define a route for the home page
app.get('/', (req, res) => {
    // Send an HTML file as response - assuming there's an index.html in the 'public' folder
    res.sendFile(__dirname + '/public/index.html');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
