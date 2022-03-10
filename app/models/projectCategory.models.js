const sql = require("./db.js");

const ProjectCategory = function (projectCategory) {
   this.projectCategoryName = projectCategory.projectCategoryName;
};

ProjectCategory.create = (newProjectCategory, result) => {
   sql.query(
      "INSERT INTO projectCategory SET ?",
      newProjectCategory,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         console.log("created projectCategory: ", {
            id: res.insertId,
            ...newProjectCategory,
         });
         result(null, { id: res.insertId, ...newProjectCategory });
      }
   );
};

ProjectCategory.getAll = (result) => {
   sql.query("SELECT * FROM projectCategory", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("projectCategory: ", res);
      result(null, res);
   });
};

ProjectCategory.findById = (projectCategoryId, result) => {
   sql.query(
      `SELECT * FROM projectCategory WHERE idProjectCategory = ${projectCategoryId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found projectCategory: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

ProjectCategory.updateById = (id, projectCategory, result) => {
   sql.query(
      "UPDATE projectCategory SET ? WHERE idProjectCategory = ?",
      [projectCategory, id],
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

         console.log("updated projectCategory: ", {
            id: id,
            ...projectCategory,
         });
         result(null, { id: id, ...projectCategory });
      }
   );
};

ProjectCategory.remove = (id, result) => {
   sql.query(
      "DELETE FROM projectCategory WHERE idProjectCategory = ?",
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

         console.log("deleted projectCategory with id: ", id);
         result(null, res);
      }
   );
};

module.exports = ProjectCategory;
