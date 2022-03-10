const Worker = require("../models/worker.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const worker = new Worker({
      workerName: req.body.workerName,
   });

   Worker.create(worker, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   Worker.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   Worker.findById(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.update = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   Worker.updateById(req.params.id, new Worker(req.body), (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.delete = (req, res) => {
   Worker.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `Worker was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   Worker.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `All Workers were deleted successfully!` });
   });
};
