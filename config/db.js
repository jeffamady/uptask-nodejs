const { Sequelize } = require('sequelize');
require('dotenv').config( {path: 'variables.env'});

// Option 2: Passing parameters separately (other dialects)
const db = new Sequelize(process.env.BD_NAME, process.env.BD_USER, process.env.DB_PASS, {
  host: process.env.BD_HOST,
  port: process.env.BD_PORT,
  dialect:'mysql',
  define: {
    timestamps: false
  }
});


module.exports = db;
