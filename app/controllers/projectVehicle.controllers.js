const ProjectVehicle = require("../models/projectVehicle.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const projectVehicle = new ProjectVehicle({
      vehicleType: req.body.vehicleType,
      fromTime: req.body.fromTime,
      toTime: req.body.toTime,
      number: req.body.number,
      dailyCost: req.body.dailyCost,
      driverName: req.body.driverName,
      phone: req.body.phone,
      reportId: req.body.reportId,
      createdBy: req.body.createdBy,
   });

   console.log(projectVehicle);

   ProjectVehicle.create(req.body, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   ProjectVehicle.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   ProjectVehicle.findById(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOneByReportId = (req, res) => {
   ProjectVehicle.findByIdReport(req.params.id, (err, data) => {
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

   ProjectVehicle.updateById(
      req.params.id,
      new ProjectVehicle(req.body),
      (err, data) => {
         if (err) res.status(err.code).send(err);
         else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   ProjectVehicle.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `ProjectVehicle was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   ProjectVehicle.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else
         res.send({
            message: `All ProjectVehicles were deleted successfully!`,
         });
   });
};
