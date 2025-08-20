const mysql = require('../db');

class ContributorDetail {
  static getAllContributors() {
    return new Promise((resolve, reject) => {
      mysql.query('SELECT * FROM t_ka_contributor_detail WHERE is_active = 1', (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  static getContributorById(contributorId) {
    return new Promise((resolve, reject) => {
      mysql.query(
        'SELECT * FROM t_ka_contributor_detail WHERE contributor_id = ? AND is_active = 1',
        [contributorId],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results[0]);
          }
        }
      );
    });
  }

  static getContributorByEmployeeAid(employeeAid) {
    return new Promise((resolve, reject) => {
      mysql.query(
        'SELECT * FROM t_ka_contributor_detail WHERE employee_aid = ? AND is_active = 1',
        [employeeAid],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results[0]);
          }
        }
      );
    });
  }

  static createContributor(employeeAid, createdBy) {
    return new Promise((resolve, reject) => {
      const now = new Date();
      mysql.query(
        'INSERT INTO t_ka_contributor_detail (employee_aid, created_by, created_on, is_active) VALUES (?, ?, ?, 1)',
        [employeeAid, createdBy, now],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result.insertId);
          }
        }
      );
    });
  }

  static updateContributor(contributorId, updatedBy) {
    return new Promise((resolve, reject) => {
      const now = new Date();
      mysql.query(
        'UPDATE t_ka_contributor_detail SET updated_by = ?, updated_on = ? WHERE contributor_id = ? AND is_active = 1',
        [updatedBy, now, contributorId],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result.affectedRows > 0);
          }
        }
      );
    });
  }

  static deactivateContributor(contributorId, updatedBy) {
    return new Promise((resolve, reject) => {
      const now = new Date();
      mysql.query(
        'UPDATE t_ka_contributor_detail SET is_active = 0, updated_by = ?, updated_on = ? WHERE contributor_id = ?',
        [updatedBy, now, contributorId],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result.affectedRows > 0);
          }
        }
      );
    });
  }
}

module.exports = ContributorDetail;
