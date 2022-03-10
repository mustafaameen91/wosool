const sql = require("./db.js");

const ProjectResponsible = function (projectResponsible) {
   this.projectResponsibleName = projectResponsible.projectResponsibleName;
};

ProjectResponsible.create = (newProjectResponsible, result) => {
   sql.query(
      "INSERT INTO projectResponsible SET ?",
      newProjectResponsible,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         console.log("created projectResponsible: ", {
            id: res.insertId,
            ...newProjectResponsible,
         });
         result(null, { id: res.insertId, ...newProjectResponsible });
      }
   );
};

ProjectResponsible.getAll = (result) => {
   sql.query("SELECT * FROM projectResponsible", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("projectResponsible: ", res);
      result(null, res);
   });
};

ProjectResponsible.findById = (projectResponsibleId, result) => {
   sql.query(
      `SELECT * FROM projectResponsible WHERE idProjectResponsible = ${projectResponsibleId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found projectResponsible: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

ProjectResponsible.updateById = (id, projectResponsible, result) => {
   sql.query(
      "UPDATE projectResponsible SET ? WHERE idProjectResponsible = ?",
      [projectResponsible, id],
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

         console.log("updated projectResponsible: ", {
            id: id,
            ...projectResponsible,
         });
         result(null, { id: id, ...projectResponsible });
      }
   );
};

ProjectResponsible.remove = (id, result) => {
   sql.query(
      "DELETE FROM projectResponsible WHERE idProjectResponsible = ?",
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

         console.log("deleted projectResponsible with id: ", id);
         result(null, res);
      }
   );
};

module.exports = ProjectResponsible;
