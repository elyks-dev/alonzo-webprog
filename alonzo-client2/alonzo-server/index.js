require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const articleRoutes = require("./routes/articleRoutes");

const app = express();

// CONNECT DATABASE
connectDB();

// MIDDLEWARE
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTES
app.use("/api/users", userRoutes);
app.use("/api/articles", articleRoutes);

// TEST ROUTE
app.get("/", (req, res) => {
    res.send("API is running...");
});

// ERROR HANDLER
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
        message: "Server Error",
    });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});