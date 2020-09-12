const mysql = require('mysql');

const con = mysql.createConnection({
  host: 'database-1.c2wdzhaji73y.us-east-2.rds.amazonaws.com',
  user: 'admin',
  password: 'karimatwa',
  database: 'Task',
});

exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const sql = 'UPDATE Via SET number = 0 WHERE id = 1 ';
  con.query(sql, function (err, result) {
    if (err) throw err;
    const sql2 = 'SELECT number FROM Via WHERE id = 1';
    con.query(sql2, function (err, result) {
      if (err) throw err;
      callback(null, result);
    });
  });
};
