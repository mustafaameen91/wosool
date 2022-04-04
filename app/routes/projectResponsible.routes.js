module.exports = (app) => {
   const projectResponsible = require("../controllers/projectResponsible.controllers.js");

   app.post("/api/addProjectResponsible", projectResponsible.create);

   app.get("/api/projectsResponsible", projectResponsible.findAll);

   app.get("/api/projectResponsible/:id", projectResponsible.findOne);

   app.get("/api/responsibleProjects/:id", projectResponsible.findOneByUserId);

   app.put("/api/projectResponsible/:id", projectResponsible.update);

   app.delete("/api/projectResponsible/:id", projectResponsible.delete);

   app.delete("/api/projectsResponsible", projectResponsible.deleteAll);
};
