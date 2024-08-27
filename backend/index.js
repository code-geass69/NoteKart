const express = require('express');
const connectToMongo = require('./db');

// Connect to MongoDB
connectToMongo();

const app = express();
const port = 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Use the correct path prefixes for routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
    console.log(`Server running on Port: http://localhost:${port}`);
    
});
