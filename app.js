const express = require("express");
const app = express();
const port = 3000;

// Load dotenv to read environment variables
require("dotenv").config();

// Template view engine
app.set("view engine", "ejs");

// Serve static files
app.use(express.static("public"));

// Routes
const dashboardRouter = require("./routes/dashboard");
app.use("/", dashboardRouter);

// MQTT connection details endpoint
app.get("/mqttConnDetails", (req, res) => {
  res.send(
    JSON.stringify({
      mqttServer: process.env.MQTT_BROKER,
      mqttTopic: process.env.MQTT_TOPIC,
    })
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
