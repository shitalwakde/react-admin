import { Sequelize } from 'sequelize';


const db = new Sequelize('construction_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});


// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'construction_db',
//   });

  export default db;