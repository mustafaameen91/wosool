const sql = require("./db.js");

const Category = function (category) {
   this.categoryName = category.categoryName;
};

Category.create = (newCategory, result) => {
   sql.query("INSERT INTO category SET ?", newCategory, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created category: ", { id: res.insertId, ...newCategory });
      result(null, { id: res.insertId, ...newCategory });
   });
};

Category.getAll = (result) => {
   sql.query(
      "SELECT * , (select json_arrayagg(json_object('subCategoryName', subCategory.subCategoryName,'idSubCategory' , subCategory.idSubCategory)) FROM subCategory WHERE subCategory.categoryId = category.idCategory) AS subCategory  FROM category  GROUP BY category.idCategory",
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }

         console.log("category: ", res);
         result(null, res);
      }
   );
};

Category.findById = (categoryId, result) => {
   sql.query(
      `SELECT * FROM category WHERE idCategory = ${categoryId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found category: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

Category.updateById = (id, category, result) => {
   sql.query(
      "UPDATE category SET ? WHERE idCategory = ?",
      [category, id],
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

         console.log("updated category: ", { id: id, ...category });
         result(null, { id: id, ...category });
      }
   );
};

Category.remove = (id, result) => {
   sql.query("DELETE FROM category WHERE idCategory = ?", id, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      if (res.affectedRows == 0) {
         result({ kind: "not_found" }, null);
         return;
      }

      console.log("deleted category with id: ", id);
      result(null, res);
   });
};

module.exports = Category;
