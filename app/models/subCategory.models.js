const sql = require("./db.js");

const SubCategory = function (subCategory) {
   this.subCategoryName = subCategory.subCategoryName;
};

SubCategory.create = (newSubCategory, result) => {
   sql.query("INSERT INTO subCategory SET ?", newSubCategory, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created subCategory: ", {
         id: res.insertId,
         ...newSubCategory,
      });
      result(null, { id: res.insertId, ...newSubCategory });
   });
};

SubCategory.getAll = (result) => {
   sql.query("SELECT * FROM subCategory", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("subCategory: ", res);
      result(null, res);
   });
};

SubCategory.findById = (subCategoryId, result) => {
   sql.query(
      `SELECT * FROM subCategory WHERE idSubCategory = ${subCategoryId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found subCategory: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

SubCategory.updateById = (id, subCategory, result) => {
   sql.query(
      "UPDATE subCategory SET ? WHERE idSubCategory = ?",
      [subCategory, id],
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

         console.log("updated subCategory: ", { id: id, ...subCategory });
         result(null, { id: id, ...subCategory });
      }
   );
};

SubCategory.remove = (id, result) => {
   sql.query(
      "DELETE FROM subCategory WHERE idSubCategory = ?",
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

         console.log("deleted subCategory with id: ", id);
         result(null, res);
      }
   );
};

module.exports = SubCategory;
