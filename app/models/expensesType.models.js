const sql = require("./db.js");

const ExpensesType = function (expensesType) {
  this.expensesTypeName = expensesType.expensesTypeName;
};

ExpensesType.create = (newExpensesType, result) => {
  sql.query("INSERT INTO expensesType SET ?", newExpensesType, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created expensesType: ", { id: res.insertId, ...newExpensesType });
    result(null, { id: res.insertId, ...newExpensesType });
  });
};

ExpensesType.getAll = (result) => {
  sql.query("SELECT * FROM expensesType", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("expensesType: ", res);
    result(null, res);
  });
};

ExpensesType.findById = (expensesTypeId, result) => {
  sql.query(`SELECT * FROM expensesType WHERE idExpensesType = ${expensesTypeId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found expensesType: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

ExpensesType.updateById = (id, expensesType, result) => {
  sql.query("UPDATE expensesType SET ? WHERE idExpensesType = ?", [expensesType, id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("updated expensesType: ", { id: id, ...expensesType });
    result(null, { id: id, ...expensesType });
  });
};

ExpensesType.remove = (id, result) => {
  sql.query("DELETE FROM expensesType WHERE idExpensesType = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted expensesType with id: ", id);
    result(null, res);
  });
};

module.exports = ExpensesType;
