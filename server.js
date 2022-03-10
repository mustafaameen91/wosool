const express = require("express");
const cors = require("cors");
const app = express();
const { urlencoded } = require("express");
const history = require("connect-history-api-fallback");

app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(express.json({ limit: "50mb" }));

require("./app/routes/user.routes.js")(app);
require("./app/routes/role.routes.js")(app);
require("./app/routes/category.routes.js")(app);
require("./app/routes/expense.routes.js")(app);
require("./app/routes/material.routes.js")(app);
require("./app/routes/project.routes.js")(app);
require("./app/routes/projectCategory.routes.js")(app);
require("./app/routes/projectResponsible.routes.js")(app);
require("./app/routes/projectVehicle.routes.js")(app);
require("./app/routes/report.routes.js")(app);
require("./app/routes/subCategory.routes.js")(app);
require("./app/routes/worker.routes.js")(app);

const staticFileMiddleware = express.static(__dirname + "/dist");
app.use(staticFileMiddleware);
app.use(
   history({
      disableDotRule: true,
      verbose: true,
   })
);

app.listen(5520, () => {
   console.log("Server is running on port 5520");
});
