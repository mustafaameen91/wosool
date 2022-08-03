module.exports = (app) => {
  const administrativeExpenses = require("../controllers/administrativeExpenses.controllers.js");

  app.post("/api/addAdministrativeExpenses", administrativeExpenses.create);

  app.get("/api/allAdministrativeExpenses", administrativeExpenses.findAll);

  app.get("/api/projectExpenses/:id", administrativeExpenses.findOneByProjectId);

  app.get("/api/administrativeExpenses/:id", administrativeExpenses.findOne);

  app.put("/api/administrativeExpenses/:id", administrativeExpenses.update);

  app.delete("/api/administrativeExpenses/:id", administrativeExpenses.delete);

  app.delete("/api/allAdministrativeExpenses", administrativeExpenses.deleteAll);
};
