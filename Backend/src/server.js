const app = require("./app.js")
const connectDB = require("./db/db.js")
const PORT = process.env.PORT || 4000

connectDB();

app.listen(PORT, () => {
    console.log("Server started at port 3000");
})