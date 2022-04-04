const sql = require("./db.js");

const ProjectVehicle = function (projectVehicle) {
   vehicleType = projectVehicle.vehicleType;
   fromTime = projectVehicle.fromTime;
   toTime = projectVehicle.toTime;
   number = projectVehicle.number;
   dailyCost = projectVehicle.dailyCost;
   driverName = projectVehicle.driverName;
   phone = projectVehicle.phone;
   reportId = projectVehicle.reportId;
   createdBy = projectVehicle.createdBy;
};

ProjectVehicle.create = (newProjectVehicle, result) => {
   sql.query(
      "INSERT INTO projectVehicle SET ?",
      newProjectVehicle,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         console.log("created projectVehicle: ", {
            id: res.insertId,
            ...newProjectVehicle,
         });
         result(null, { id: res.insertId, ...newProjectVehicle });
      }
   );
};

ProjectVehicle.getAll = (result) => {
   sql.query("SELECT * FROM projectVehicle", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("projectVehicle: ", res);
      result(null, res);
   });
};

ProjectVehicle.findByIdReport = (reportId, result) => {
   sql.query(
      `SELECT * FROM projectVehicle WHERE reportId = ${reportId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         console.log("found projectVehicle: ", res);
         result(null, res);
      }
   );
};

ProjectVehicle.findById = (projectVehicleId, result) => {
   sql.query(
      `SELECT * FROM projectVehicle WHERE idProjectVehicle = ${projectVehicleId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found projectVehicle: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

ProjectVehicle.updateById = (id, projectVehicle, result) => {
   sql.query(
      "UPDATE projectVehicle SET ? WHERE idProjectVehicle = ?",
      [projectVehicle, id],
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

         console.log("updated projectVehicle: ", { id: id, ...projectVehicle });
         result(null, { id: id, ...projectVehicle });
      }
   );
};

ProjectVehicle.remove = (id, result) => {
   sql.query(
      "DELETE FROM projectVehicle WHERE idProjectVehicle = ?",
      id,
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

         console.log("deleted projectVehicle with id: ", id);
         result(null, res);
      }
   );
};

module.exports = ProjectVehicle;
