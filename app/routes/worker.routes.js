module.exports = (app) => {
   const worker = require("../controllers/worker.controllers.js");

   app.post("/api/addWorker", worker.create);

   app.get("/api/workers", worker.findAll);

   app.get("/api/worker/:id", worker.findOne);

   app.get("/api/workerReport/:id", worker.findOneByReportId);

   app.put("/api/worker/:id", worker.update);

   app.delete("/api/worker/:id", worker.delete);

   app.delete("/api/workers", worker.deleteAll);
};
