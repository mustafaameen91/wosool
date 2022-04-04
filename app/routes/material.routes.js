module.exports = (app) => {
   const material = require("../controllers/material.controllers.js");

   app.post("/api/addMaterial", material.create);

   app.get("/api/materials", material.findAll);

   app.get("/api/material/:id", material.findOne);

   app.get("/api/materialReport/:id", material.findOneByReportId);

   app.put("/api/material/:id", material.update);

   app.delete("/api/material/:id", material.delete);

   app.delete("/api/materials", material.deleteAll);
};
