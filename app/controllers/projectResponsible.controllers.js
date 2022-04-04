const ProjectResponsible = require("../models/projectResponsible.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const projectResponsible = new ProjectResponsible({
      projectId: req.body.projectId,
      userId: req.body.userId,
   });

   ProjectResponsible.create(projectResponsible, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   ProjectResponsible.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOneByUserId = (req, res) => {
   ProjectResponsible.findByIdUser(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   ProjectResponsible.findById(req.params.id, (err, data) => {
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

   ProjectResponsible.updateById(
      req.params.id,
      new ProjectResponsible(req.body),
      (err, data) => {
         if (err) res.status(err.code).send(err);
         else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   ProjectResponsible.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else
         res.send({ message: `ProjectResponsible was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   ProjectResponsible.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else
         res.send({
            message: `All ProjectResponsible were deleted successfully!`,
         });
   });
};
