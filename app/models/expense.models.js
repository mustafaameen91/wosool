const sql = require("./db.js");

const Expense = function (expense) {
   this.expenseType = expense.expenseType;
   this.cost = expense.cost;
   this.totalCost = expense.totalCost;
   this.phone = expense.phone;
   this.note = expense.note;
   this.number = expense.number;
   this.reportId = expense.reportId;
   this.createdBy = expense.createdBy;
};

Expense.create = (newExpense, result) => {
   sql.query("INSERT INTO expense SET ?", newExpense, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created expense: ", { id: res.insertId, ...newExpense });
      result(null, { id: res.insertId, ...newExpense });
   });
};

Expense.getAll = (result) => {
   sql.query("SELECT * FROM expense", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("expense: ", res);
      result(null, res);
   });
};

Expense.findByIdReport = (reportId, result) => {
   sql.query(
      `SELECT * FROM expense WHERE reportId = ${reportId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }
         console.log("found expense: ", res);
         result(null, res);
      }
   );
};

Expense.findById = (expenseId, result) => {
   sql.query(
      `SELECT * FROM expense WHERE idExpense = ${expenseId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found expense: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

Expense.updateById = (id, expense, result) => {
   sql.query(
      "UPDATE expense SET ? WHERE idExpense = ?",
      [expense, id],
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }

         if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
         }

         console.log("updated expense: ", { id: id, ...expense });
         result(null, { id: id, ...expense });
      }
   );
};

Expense.remove = (id, result) => {
   sql.query("DELETE FROM expense WHERE idExpense = ?", id, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      if (res.affectedRows == 0) {
         result({ kind: "not_found" }, null);
         return;
      }

      console.log("deleted expense with id: ", id);
      result(null, res);
   });
};

module.exports = Expense;
