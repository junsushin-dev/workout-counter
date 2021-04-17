const mysql = require('mysql2/promise');

const exerciseIdMap = {
  1: 2,
  2: 5,
  3: 3,
  4: 4,
  5: 6,
  6: 7,
}

const main = async () => {
  const oldDBConnection = await mysql.createConnection({
    "host": "27.96.130.188",
    "port": 3306,
    "user": "workout_counter",
    "password": "momjjang",
    "database": "workout_counter"
  })
  
  const [rows, fields] = await oldDBConnection.execute('SELECT * FROM workout');
  console.log(rows);
  console.log(fields);

  const timeStamp = new Date();
  rows.forEach(row => {
    row.exercise_id = exerciseIdMap[row.exercise_id];
    row.created_at = timeStamp;
    row.updated_at = timeStamp;
  })

  const mappedRows = rows.map(({date, done, created_at, updated_at, exercise_id}) => [date, created_at, updated_at, done, exercise_id.toString()]);

  const newDBConnection = await mysql.createConnection({
    "host": "27.96.130.188",
    "port": 3306,
    "user": "workout_counter",
    "password": "momjjang",
    "database": "workout_counter_v2"
  })

  console.log(mappedRows);

  await newDBConnection.query('INSERT INTO workout (date, created_at, updated_at, done_count, exercise_id) VALUES ?', [mappedRows]);
  
  oldDBConnection.end();
  newDBConnection.end();
}

main();
