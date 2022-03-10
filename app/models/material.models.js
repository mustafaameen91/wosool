const sql = require("./db.js");

const Material = function (material) {
   this.materialName = material.materialName;
};

Material.create = (newMaterial, result) => {
   sql.query("INSERT INTO material SET ?", newMaterial, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created material: ", { id: res.insertId, ...newMaterial });
      result(null, { id: res.insertId, ...newMaterial });
   });
};

Material.getAll = (result) => {
   sql.query("SELECT * FROM material", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("material: ", res);
      result(null, res);
   });
};

Material.findById = (materialId, result) => {
   sql.query(
      `SELECT * FROM material WHERE idMaterial = ${materialId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found material: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

Material.updateById = (id, material, result) => {
   sql.query(
      "UPDATE material SET ? WHERE idMaterial = ?",
      [material, id],
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

         console.log("updated material: ", { id: id, ...material });
         result(null, { id: id, ...material });
      }
   );
};

Material.remove = (id, result) => {
   sql.query("DELETE FROM material WHERE idMaterial = ?", id, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      if (res.affectedRows == 0) {
         result({ kind: "not_found" }, null);
         return;
      }

      console.log("deleted material with id: ", id);
      result(null, res);
   });
};

module.exports = Material;
