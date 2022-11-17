// Add Express
const express = require("express");
var cors = require("cors");
const { MongoClient } = require("mongodb");
const connectionString =
  "mongodb+srv://ut-circles-user:ut-circles-user@cluster0.csb8sik.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

// Initialize Express
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

// Create GET request
app.get("/", (req, res) => {
  res.send("Testing");
});

app.get("/get/friends/:username", async (req, res) => {
  users = await dbConnection.collection("users");
  //console.log(users);
  obj = await users.findOne({ username: req.params.username });
  //console.log(obj);
  if (obj) {
    res.send({ friends: obj.friends });
  } else {
    res.send({});
  }
});

async function connect() {
  await client.connect();
  await client.db("Database").command({ ping: 1 });
  dbConnection = await client.db("Database");
  //console.log(dbConnection);
  console.log("Connected successfully to server");
}

// Initialize server
app.listen(port, () => {
  console.log(`Running on port ${port}.`);
  connect();
});

// Export the Express API for vercel
module.exports = app;
