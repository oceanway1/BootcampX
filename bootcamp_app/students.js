const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});
const cohortName = process.argv[2];
const limit = process.argv[3] || 5;
// Store all potentially malicious values in an array. 

const queryString = {
  text: `SELECT students.id as student_id, students.name as name, cohorts.name as cohort
  FROM students
  JOIN cohorts ON cohorts.id = cohort_id
  WHERE cohorts.name LIKE $1
  LIMIT $2;
  `,
  values: [`%${cohortName}%`, limit]
};
pool.query(queryString)
  .then(res => {
    console.log(res.rows);
  })
  .catch(err => console.error('query error', err.stack));


// pool.query(`
// SELECT students.id as student_id, students.name as name, cohorts.name as cohort
// FROM students
// JOIN cohorts ON cohorts.id = cohort_id
// WHERE cohorts.name LIKE '%${process.argv[2]}%'
// LIMIT ${process.argv[3] || 5};
// `)
//   .then(res => {
//     res.rows.forEach(user => {
//       console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
//     })
//   }).catch(err => console.error('query error', err.stack));