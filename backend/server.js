import "dotenv/config";
import app from "./src/app.js";
import connecttodb from "./src/config/database.js";

connecttodb();

app.listen(3000, () => {
    console.log("server is running on port 3000");
});