const Material = require("../models/material.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const material = new Material({
      materialType: req.body.materialType,
      quantity: req.body.quantity,
      price: req.body.price,
      totalPrice: req.body.totalPrice,
      driverName: req.body.driverName,
      note: req.body.note,
      reportId: req.body.reportId,
      createdBy: req.body.createdBy,
   });

   Material.create(material, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   Material.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOneByReportId = (req, res) => {
   Material.findByIdReport(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   Material.findById(req.params.id, (err, data) => {
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

   Material.updateById(req.params.id, new Material(req.body), (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.delete = (req, res) => {
   Material.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `Material was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   Material.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `All Materials were deleted successfully!` });
   });
};
