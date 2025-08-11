const express = require("express");
const app = express();
const userRoutes = require("./routes/userAuthRoutes");
const cabDriverRoutes = require("./routes/cabDriverAuthRoutes");
const adminRoutes = require("./routes/adminAuthRoutes");
const adRoutes = require("./routes/adRequestRoutes");
const resetPasswordRoutes = require("./routes/resetPasswordRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const cron = require("node-cron");
dotenv.config();
const connectDB = require("./lib/db");
const { checkAndUpdateAdStatus } = require("./controllers/adRequestController");
// const path = require("path");

const PORT = process.env.PORT;
// const __dirname = path.resolve();
connectDB();
app.use(express.json({ limit: '10mb' })); // or higher
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser()); // <-- Then parse cookies
app.use(cors({
  origin: "https://adpromotionplatform.netlify.app",
  credentials: true
}));


app.use("/api/auth", userRoutes);
app.use("/api/auth", cabDriverRoutes);
app.use("/api/auth", adminRoutes);
app.use("/api/ad", adRoutes);
app.use("/api/auth", resetPasswordRoutes);

// if(process.env.NODE_ENV === "development"){
//     app.use(express.static(path.join(__dirname, "../Frontend/dist")));
// }



cron.schedule("0 0 * * *", () => {
  console.log("Running daily ad status update job...");
  checkAndUpdateAdStatus();
});
app.listen(PORT, () => {
    console.log("This App is working on PORT : ",PORT);
})