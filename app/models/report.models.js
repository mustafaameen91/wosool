const sql = require("./db.js");

const Report = function (report) {
   this.reportName = report.reportName;
};

Report.create = (newReport, result) => {
   sql.query("INSERT INTO report SET ?", newReport, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created report: ", { id: res.insertId, ...newReport });
      result(null, { id: res.insertId, ...newReport });
   });
};

Report.getAll = (result) => {
   sql.query("SELECT * FROM report", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("report: ", res);
      result(null, res);
   });
};

Report.findById = (reportId, result) => {
   sql.query(
      `SELECT * FROM report WHERE idReport = ${reportId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found report: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

Report.updateById = (id, report, result) => {
   sql.query(
      "UPDATE report SET ? WHERE idReport = ?",
      [report, id],
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

         console.log("updated report: ", { id: id, ...report });
         result(null, { id: id, ...report });
      }
   );
};

Report.remove = (id, result) => {
   sql.query("DELETE FROM report WHERE idReport = ?", id, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      if (res.affectedRows == 0) {
         result({ kind: "not_found" }, null);
         return;
      }

      console.log("deleted report with id: ", id);
      result(null, res);
   });
};

module.exports = Report;
