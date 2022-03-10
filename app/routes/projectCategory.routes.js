module.exports = (app) => {
   const projectCategory = require("../controllers/projectCategory.controllers.js");

   app.post("/api/addProjectCategory", projectCategory.create);

   app.get("/api/projectCategories", projectCategory.findAll);

   app.get("/api/projectCategory/:id", projectCategory.findOne);

   app.put("/api/projectCategory/:id", projectCategory.update);

   app.delete("/api/projectCategory/:id", projectCategory.delete);

   app.delete("/api/projectCategories", projectCategory.deleteAll);
};
