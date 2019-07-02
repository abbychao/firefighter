const { Pool, Client } = require('pg');
const connectionString = 'postgres://student:ilovetesting@localhost/ff-db';
const pool = new Pool({ connectionString });
const queries = [];

function createQuestionsTable() {
  const sql = `CREATE TABLE IF NOT EXISTS questions (
  "_id" SERIAL PRIMARY KEY,
  "position" VARCHAR,
  "building_type" VARCHAR,
  "fire_type" VARCHAR,
  "question" VARCHAR(500),
  "fire_type" VARCHAR,
  "created_at" TIMESTAMPTZ,
  "updated_at" TIMESTAMPTZ
  );`;

  pool.query(sql, (err, res) => {
    console.log(err, res);
    pool.end();
  });
};

function populateQuestionsTable() {
  const starterQs = [
    {
      position: 'Forcible Entry',
      buildingType: 'Taxpayer',
      fireType: 'Cellar Fire',
      text: 'What do you bring?',
    },
    {
      position: 'Forcible Entry',
      buildingType: 'Taxpayer',
      fireType: 'Cellar Fire',
      text: 'What do you bring?',
    },
  ];
  starterQs.forEach((q => {
    { position, buildingType, fireType, text } = q;
    const sql = {
      text: `INSERT INTO questions 
      ("position", "building_type", "fire_type", "text", "created_at", "updated_at")
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      values: [position, buildingType, fireType, text, Date.now(), Date.now()],
    };
    queries.push(addQuestion(sql));
  }));
};

function addQuestion(sql) {
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, res) => {
      return err ? reject(err) : resolve(res);
    });
  });
}

module.exports = () => {
  createQuestionsTable();
  populateQuestionsTable();
  Promise.all(queries).then(pool.end)
  // .catch((err) => console.log(err));
};
