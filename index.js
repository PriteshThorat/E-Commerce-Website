const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Enable CORS

// Endpoint that sends the secret as plain text
app.get('/api/secret', (req, res) => {
    const mySecret = process.env.USER_KEY;
    res.send(mySecret); // Send as plain text
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
