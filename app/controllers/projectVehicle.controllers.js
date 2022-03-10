const ProjectVehicle = require("../models/projectVehicle.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const projectVehicle = new ProjectVehicle({
      projectVehicleName: req.body.projectVehicleName,
   });

   ProjectVehicle.create(projectVehicle, (err, data) => {
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
