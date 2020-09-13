require('dotenv').config()
const express = require('express');
const path = require('path');
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors())

// Routes
app.use("/api/auth", require("./routes/api/auth"))
app.use("/api/items", require("./routes/api/items"))
app.use("/api/users", require("./routes/api/users"))

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`))