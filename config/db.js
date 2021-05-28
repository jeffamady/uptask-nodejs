const { Sequelize } = require('sequelize');

// Option 2: Passing parameters separately (other dialects)
const db = new Sequelize('uptasknode', 'root', 'root1234', {
  host: 'localhost',
  port: '3306',
  dialect:'mysql',
  define: {
    timestamps: false
  }
});


module.exports = db;
