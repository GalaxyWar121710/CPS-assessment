const express = require("express");
const app = express();
const drugRouter = require("./routes/drugRoutes");

// Middlewares
app.use(express.json());

// Routes
app.use("/api/drugs", drugRouter);

// Server listener
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
