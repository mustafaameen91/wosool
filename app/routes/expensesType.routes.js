module.exports = (app) => {
  const expensesType = require("../controllers/expensesType.controllers.js");

  app.post("/api/addExpensesType", expensesType.create);

  app.get("/api/expensesTypes", expensesType.findAll);

  app.get("/api/expensesType/:id", expensesType.findOne);

  app.put("/api/expensesType/:id", expensesType.update);

  app.delete("/api/expensesType/:id", expensesType.delete);

  app.delete("/api/expensesTypes", expensesType.deleteAll);
};
