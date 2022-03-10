const SubCategory = require("../models/subCategory.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const subCategory = new SubCategory({
      subCategoryName: req.body.subCategoryName,
   });

   SubCategory.create(subCategory, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   SubCategory.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   SubCategory.findById(req.params.id, (err, data) => {
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

   SubCategory.updateById(
      req.params.id,
      new SubCategory(req.body),
      (err, data) => {
         if (err) res.status(err.code).send(err);
         else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   SubCategory.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `SubCategory was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   SubCategory.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `All SubCategorys were deleted successfully!` });
   });
};
