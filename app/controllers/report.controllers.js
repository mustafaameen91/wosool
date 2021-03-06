const Report = require("../models/report.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const report = new Report({
      projectId: req.body.projectId,
      workPlace: req.body.workPlace,
      documentNumber: req.body.documentNumber,
      workDuration: req.body.workDuration,
      day: req.body.day,
      reportDate: req.body.reportDate,
      subCategoryId: req.body.subCategoryId,
      createdBy: req.body.createdBy,
   });

   Report.create(report, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   Report.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOneByProjectId = (req, res) => {
   Report.findByIdOfProject(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   Report.findById(req.params.id, (err, data) => {
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

   Report.updateById(req.params.id, new Report(req.body), (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.delete = (req, res) => {
   Report.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `Report was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   Report.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `All Reports were deleted successfully!` });
   });
};
