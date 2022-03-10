module.exports = (app) => {
   const project = require("../controllers/project.controllers.js");

   app.post("/api/addProject", project.create);

   app.get("/api/projects", project.findAll);

   app.get("/api/project/:id", project.findOne);

   app.put("/api/project/:id", project.update);

   app.delete("/api/project/:id", project.delete);

   app.delete("/api/projects", project.deleteAll);
};
