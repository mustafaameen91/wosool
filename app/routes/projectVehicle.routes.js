module.exports = (app) => {
   const projectVehicle = require("../controllers/projectVehicle.controllers.js");

   app.post("/api/addProjectVehicle", projectVehicle.create);

   app.get("/api/projectVehicles", projectVehicle.findAll);

   app.get("/api/projectVehicle/:id", projectVehicle.findOne);

   app.put("/api/projectVehicle/:id", projectVehicle.update);

   app.delete("/api/projectVehicle/:id", projectVehicle.delete);

   app.delete("/api/projectVehicles", projectVehicle.deleteAll);
};
