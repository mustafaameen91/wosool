module.exports = (app) => {
   const report = require("../controllers/report.controllers.js");

   app.post("/api/addReport", report.create);

   app.get("/api/reports", report.findAll);

   app.get("/api/report/:id", report.findOne);

   app.get("/api/reportProject/:id", report.findOneByProjectId);

   app.put("/api/report/:id", report.update);

   app.delete("/api/report/:id", report.delete);

   app.delete("/api/reports", report.deleteAll);
};
