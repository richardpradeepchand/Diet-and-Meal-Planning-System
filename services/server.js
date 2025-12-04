const mongoose = require("mongoose");
const app = require("./app");
const { PORT, MONGO_URL } = require("./config");

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));
