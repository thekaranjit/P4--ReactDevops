const express = require("express");
var sql = require("mssql");
var cors = require("cors");
const app = express();

app.use(express.json());
const corsOptions = {
  // origin: "http://localhost:3000", // Allow only requests from this origin
  methods: "GET,POST", // Allow only these methods
  allowedHeaders: ["Content-Type", "Authorization"],
  // "Access-Control-Allow-Origin"
  // Allow only these headers
};
app.use(
  cors({
    origin: "*",
  })
);
// Set up a port
const PORT = process.env.PORT || 3000;

// db info
const config = {
  user: "", // better stored in an app setting such as process.env.DB_USER
  password: "", // better stored in an app setting such as process.env.DB_PASSWORD
  server: "enter your server name", // better stored in an app setting such as process.env.DB_SERVER
  port: 1433, // optional, defaults to 1433, better stored in an app setting such as process.env.DB_PORT
  database: "enter your db name", // better stored in an app setting such as process.env.DB_NAME
  authentication: {
    type: "default",
  },
  options: {
    encrypt: true,
  },
};

console.log("Starting...");

app.get("/customerInfo", (req, res) => {
  const data = req;
  sql.connect(config, function () {
    var request = new sql.Request();
    request.query("select * from demo", function (err, recordset) {
      if (err) console.log(err);
      // res.end(JSON.stringify(recordset)); // Result in JSON format
      res.send(recordset);
    });
  });
});

// Define a route
app.get("/", (req, res) => {
  res.send("Hello, World! Welcome to my Node.js app!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
