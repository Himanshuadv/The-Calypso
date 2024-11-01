const morgan = require("morgan");
const express = require("express");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
app.use(helmet());

////////////////////////////////////
// Import of all the route
const userRouter = require("./routes/userRoute");
const gameRouter = require("./routes/gameRoute");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// body parser , reading data from body into req.body
app.use(cors({ credentials: true, origin: true }));
app.use(express.json({ limit: "10kb" })); //middleWare
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
    limit: "10kb",
  })
); //for parsing the data that come with url post request

/// DATA sanitization against noSql query injection
app.use(mongoSanitize());
/// DATA sanitization against XSS
app.use(xss());

/////////// Creating our own middleWare function
app.use((req, res, next) => {
  console.log("hello from the middleware 😎");
  console.log(req.cookies);
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
/////////////////////////////////////////////

////////////////////////////////////////////
// Here all the routes are
app.use("/api/v1/users", userRouter);
app.use("/api/v1/game", gameRouter);

module.exports = app;
