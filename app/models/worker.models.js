const sql = require("./db.js");

const Worker = function (worker) {
   this.workerName = worker.workerName;
   this.cost = worker.cost;
   this.fromTime = worker.fromTime;
   this.toTime = worker.toTime;
   this.workerDuration = worker.workerDuration;
   this.reportId = worker.reportId;
   this.createdBy = worker.createdBy;
};

Worker.create = (newWorker, result) => {
   sql.query("INSERT INTO worker SET ?", newWorker, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created worker: ", { id: res.insertId, ...newWorker });
      result(null, { id: res.insertId, ...newWorker });
   });
};

Worker.getAll = (result) => {
   sql.query("SELECT * FROM worker", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("worker: ", res);
      result(null, res);
   });
};

Worker.findByIdReport = (reportId, result) => {
   sql.query(
      `SELECT * FROM worker WHERE reportId = ${reportId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }
         result(null, res);
      }
   );
};

Worker.findById = (workerId, result) => {
   sql.query(
      `SELECT * FROM worker WHERE idWorker = ${workerId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found worker: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

Worker.updateById = (id, worker, result) => {
   sql.query(
      "UPDATE worker SET ? WHERE idWorker = ?",
      [worker, id],
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

         console.log("updated worker: ", { id: id, ...worker });
         result(null, { id: id, ...worker });
      }
   );
};

Worker.remove = (id, result) => {
   sql.query("DELETE FROM worker WHERE idWorker = ?", id, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      if (res.affectedRows == 0) {
         result({ kind: "not_found" }, null);
         return;
      }

      console.log("deleted worker with id: ", id);
      result(null, res);
   });
};

module.exports = Worker;
