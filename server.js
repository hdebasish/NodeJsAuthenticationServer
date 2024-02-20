import { app } from "./index.js";
import connectUsingMongoose from "./src/config/mongoose.config.js";

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectUsingMongoose();
});
