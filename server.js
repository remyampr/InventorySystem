const express = require("express");
const app = express();
const inventoryRoutes = require("./routes/inventoryRoutes");

app.use(express.json());
app.use("/api/inventory", inventoryRoutes);

const PORT = process.env.PORT || 7500;

app.listen(PORT, () => {
  console.log(`server running at port : http://localhost:${PORT}`);
  console.log(`Stocks list  : http://localhost:${PORT}/api/inventory/`);
});
