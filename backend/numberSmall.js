const mysql = require('mysql');

const con = mysql.createConnection({
  host: 'database-1.c2wdzhaji73y.us-east-2.rds.amazonaws.com',
  user: 'admin',
  password: 'karimatwa',
  database: 'Task',
});

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

exports.handler = (event, context, callback) => {
  sleep(1000).then(() => {
    context.callbackWaitsForEmptyEventLoop = false;
    const sql = 'SELECT number FROM Via WHERE id = 1';
    con.query(sql, function (err, result) {
      if (err) throw err;
      let number = parseInt(result[0].number) + 25;
      const sql2 = 'UPDATE Via SET number = ' + number + ' WHERE id = 1';
      con.query(sql2, function (err, result) {
        if (err) throw err;
        const sql3 = 'SELECT number FROM Via WHERE id = 1';
        con.query(sql3, function (err, result) {
          if (err) throw err;
          callback(null, result);
        });
      });
    });
  });
};
