const PORT = 5000;
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const todoRoutes = require("./routes/todoRoutes");

try {
    mongoose.connect(process.env.DB_URL);
    console.log('Connected to MongoDB');
} catch (error) {
    console.log("Error while connecting to DB:", error)
}

app.use(express.json());
app.use('/todos', todoRoutes);

app.listen(3000, () => {
    console.log(`Api is listening on port 3000`);
});