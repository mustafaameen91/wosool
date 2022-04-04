const Expense = require("../models/expense.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const expense = new Expense({
      expenseType: req.body.expenseType,
      cost: req.body.cost,
      totalCost: req.body.totalCost,
      phone: req.body.phone,
      note: req.body.note,
      number: req.body.number,
      reportId: req.body.reportId,
      createdBy: req.body.createdBy,
   });

   Expense.create(expense, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   Expense.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOneByReportId = (req, res) => {
   Expense.findByIdReport(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   Expense.findById(req.params.id, (err, data) => {
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

   Expense.updateById(req.params.id, new Expense(req.body), (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.delete = (req, res) => {
   Expense.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `Expense was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   Expense.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `All Expenses were deleted successfully!` });
   });
};
