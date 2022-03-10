module.exports = (app) => {
   const expense = require("../controllers/expense.controllers.js");

   app.post("/api/addExpense", expense.create);

   app.get("/api/expenses", expense.findAll);

   app.get("/api/expense/:id", expense.findOne);

   app.put("/api/expense/:id", expense.update);

   app.delete("/api/expense/:id", expense.delete);

   app.delete("/api/expenses", expense.deleteAll);
};
