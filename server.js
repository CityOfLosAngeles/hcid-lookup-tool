// ******************************************************************************
// *** Dependencies
// =============================================================
const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');


// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 8080;


// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


// Static directory
app.use(express.static("./public"));

// Routes =============================================================
require("./controllers/controller.js")(app);

// Syncing our sequelize models and then starting our express app
app.listen(PORT, ()=> {
    console.log(`App listening on PORT  ${PORT}`);
});
