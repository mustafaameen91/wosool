const ExpensesType = require("../models/expensesType.models.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const expensesType = new ExpensesType({
    expensesTypeName: req.body.expensesTypeName,
  });

  ExpensesType.create(expensesType, (err, data) => {
    if (err) res.status(err.code).send(err);
    else {
      res.send(data);
    }
  });
};

exports.findAll = (req, res) => {
  ExpensesType.getAll((err, data) => {
    if (err) res.status(err.code).send(err);
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  ExpensesType.findById(req.params.id, (err, data) => {
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

  ExpensesType.updateById(req.params.id, new ExpensesType(req.body), (err, data) => {
    if (err) res.status(err.code).send(err);
    else res.send(data);
  });
};

exports.delete = (req, res) => {
  ExpensesType.remove(req.params.id, (err, data) => {
    if (err) res.status(err.code).send(err);
    else res.send({ message: `ExpensesType was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  ExpensesType.removeAll((err, data) => {
    if (err) res.status(err.code).send(err);
    else res.send({ message: `All ExpensesTypes were deleted successfully!` });
  });
};
