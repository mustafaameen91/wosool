const Project = require("../models/project.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const project = new Project({
      projectName: req.body.projectName,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      totalCost: req.body.totalCost,
      note: req.body.note,
      workPlace: req.body.workPlace,
      createdBy: req.body.createdBy,
   });

   Project.create(project, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   Project.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   Project.findById(req.params.id, (err, data) => {
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

   Project.updateById(req.params.id, new Project(req.body), (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.delete = (req, res) => {
   Project.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `Project was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   Project.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `All Projects were deleted successfully!` });
   });
};
