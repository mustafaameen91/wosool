const ProjectCategory = require("../models/projectCategory.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const projectCategory = new ProjectCategory({
      projectCategoryName: req.body.projectCategoryName,
   });

   ProjectCategory.create(projectCategory, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   ProjectCategory.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   ProjectCategory.findById(req.params.id, (err, data) => {
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

   ProjectCategory.updateById(
      req.params.id,
      new ProjectCategory(req.body),
      (err, data) => {
         if (err) res.status(err.code).send(err);
         else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   ProjectCategory.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `ProjectCategory was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   ProjectCategory.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else
         res.send({
            message: `All ProjectCategorys were deleted successfully!`,
         });
   });
};
