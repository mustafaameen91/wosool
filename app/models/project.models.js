const sql = require("./db.js");

const Project = function (project) {
   this.projectName = project.projectName;
   this.startDate = project.startDate;
   this.endDate = project.endDate;
   this.totalCost = project.totalCost;
   this.note = project.note;
   this.workPlace = project.workPlace;
   this.createdBy = project.createdBy;
};

Project.create = (newProject, result) => {
   sql.query("INSERT INTO project SET ?", newProject, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created project: ", { id: res.insertId, ...newProject });
      result(null, { id: res.insertId, ...newProject });
   });
};

Project.getAll = (result) => {
   sql.query(
      "SELECT * ,DATE_FORMAT(startDate,'%d/%m/%Y') AS startDateFormatted , DATE_FORMAT(endDate,'%d/%m/%Y') AS endDateFormatted FROM project",
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }

         console.log("project: ", res);
         result(null, res);
      }
   );
};

Project.findById = (projectId, result) => {
   sql.query(
      `SELECT *  FROM project WHERE idProject = ${projectId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found project: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

Project.updateById = (id, project, result) => {
   sql.query(
      "UPDATE project SET ? WHERE idProject = ?",
      [project, id],
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

         console.log("updated project: ", { id: id, ...project });
         result(null, { id: id, ...project });
      }
   );
};

Project.remove = (id, result) => {
   sql.query("DELETE FROM project WHERE idProject = ?", id, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      if (res.affectedRows == 0) {
         result({ kind: "not_found" }, null);
         return;
      }

      console.log("deleted project with id: ", id);
      result(null, res);
   });
};

module.exports = Project;
