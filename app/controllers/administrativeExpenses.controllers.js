const AdministrativeExpenses = require("../models/administrativeExpenses.models.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const administrativeExpenses = new AdministrativeExpenses({
    projectId: req.body.projectId,
    expensesTypeId: req.body.expensesTypeId,
    amount: req.body.amount,
    note: req.body.note,
    createdBy: req.body.createdBy,
  });

  AdministrativeExpenses.create(administrativeExpenses, (err, data) => {
    if (err) res.status(err.code).send(err);
    else {
      res.send(data);
    }
  });
};

exports.findOneByProjectId = (req, res) => {
  AdministrativeExpenses.getOneByProjectId(req.params.id, (err, data) => {
    if (err) res.status(err.code).send(err);
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  AdministrativeExpenses.getAll((err, data) => {
    if (err) res.status(err.code).send(err);
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  AdministrativeExpenses.findById(req.params.id, (err, data) => {
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

  AdministrativeExpenses.updateById(req.params.id, new AdministrativeExpenses(req.body), (err, data) => {
    if (err) res.status(err.code).send(err);
    else res.send(data);
  });
};

exports.delete = (req, res) => {
  AdministrativeExpenses.remove(req.params.id, (err, data) => {
    if (err) res.status(err.code).send(err);
    else res.send({ message: `AdministrativeExpenses was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  AdministrativeExpenses.removeAll((err, data) => {
    if (err) res.status(err.code).send(err);
    else res.send({ message: `All AdministrativeExpensess were deleted successfully!` });
  });
};
