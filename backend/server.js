const dotenv = require("dotenv");
const mongoose = require("mongoose");
const url = "mongodb+srv://hthimanshu7390:MTXxtmhvTKqSbXQW@cluster0.psg4r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
dotenv.config({
  path: "./config.env",
});
//////////////////////////////////////////////
////// catching uncaught exception
process.on("uncaughtException", (err) => {
  console.log("uncaught exception .......... shutiing down 💣💣💣💣💣💣");
  console.log(err);
  process.exit(1);
});

const app = require("./app");
// console.log(process.env.DATABASE);
// uncomment this line when you are not ujjwal
// const DB = process.env.DATABASE.replace(
//   "<PASSWORD>",
//   process.env.DATABASE_PASSWORD
// );
const DB = url;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // console.log(con.connections);
    console.log("connection is stabliished");
  });

//created a serverr
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App is running on a server ${port} ....`);
});

// handling the unhandled error rejection

process.on("unhandledRejection", (err) => {
  // console.log(err.name, err.message);
  console.log("unhandlled rejection .......... shutiing down 💣💣💣💣💣💣");
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (err) => {
  console.log("uncaught exception .......... shutiing down 💣💣💣💣💣💣");
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
