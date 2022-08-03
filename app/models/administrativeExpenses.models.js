const sql = require("./db.js");

const AdministrativeExpenses = function (administrativeExpenses) {
  this.projectId = administrativeExpenses.projectId;
  this.expensesTypeId = administrativeExpenses.expensesTypeId;
  this.amount = administrativeExpenses.amount;
  this.note = administrativeExpenses.note;
  this.createdBy = administrativeExpenses.createdBy;
};

AdministrativeExpenses.create = (newAdministrativeExpenses, result) => {
  sql.query("INSERT INTO administrativeExpenses SET ?", newAdministrativeExpenses, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created administrativeExpenses: ", { id: res.insertId, ...newAdministrativeExpenses });
    result(null, { id: res.insertId, ...newAdministrativeExpenses });
  });
};

AdministrativeExpenses.getAll = (result) => {
  sql.query("SELECT * FROM administrativeExpenses", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("administrativeExpenses: ", res);
    result(null, res);
  });
};

AdministrativeExpenses.getOneByProjectId = (projectId, result) => {
  sql.query(
    `SELECT * FROM administrativeExpenses JOIN expensesType ON administrativeExpenses.expensesTypeId = expensesType.idExpensesType JOIN user ON administrativeExpenses.createdBy = user.idUser WHERE projectId = ${projectId}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("administrativeExpenses: ", res);
      result(null, res);
    }
  );
};

AdministrativeExpenses.findById = (administrativeExpensesId, result) => {
  sql.query(`SELECT * FROM administrativeExpenses WHERE idAdministrativeExpenses = ${administrativeExpensesId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found administrativeExpenses: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

AdministrativeExpenses.updateById = (id, administrativeExpenses, result) => {
  sql.query("UPDATE administrativeExpenses SET ? WHERE idAdministrativeExpenses = ?", [administrativeExpenses, id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("updated administrativeExpenses: ", { id: id, ...administrativeExpenses });
    result(null, { id: id, ...administrativeExpenses });
  });
};

AdministrativeExpenses.remove = (id, result) => {
  sql.query("DELETE FROM administrativeExpenses WHERE idAdministrativeExpenses = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted administrativeExpenses with id: ", id);
    result(null, res);
  });
};

module.exports = AdministrativeExpenses;
