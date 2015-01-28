var path = require("path");
var fs = require("fs");
var Sequelize = require("sequelize");
var sequelize = null;
var schema = null;

module.exports = function(app) {
  if (!schema) {
    if (!sequelize) {
      if (process.env.HEROKU_POSTGRESQL_BRONZE_URL) {
        var match = process.env.HEROKU_POSTGRESQL_BRONZE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/)

        sequelize = new Sequelize(match[5], match[1], match[2], {
          dialect:  'postgres',
          protocol: 'postgres',
          port:     match[4],
          host:     match[3],
          logging:  true
        })
      } else {
        sequelize = new Sequelize('openfinancial', 'postgres', 'root', {
          dialect:  'postgres',
          protocol: 'postgres',
          port:     '5432',
          host:     'localhost'
        });
      }
      sequelize
        .authenticate()
        .complete(function(err) {
          if (!!err) {
            console.log('Unable to connect to the database:', err)
          } else {
            console.log('Connection has been established successfully.')
          }
        });
      sequelize
        .sync({force:false})
        .complete(function(err) {
          if (!!err) {
            console.log('An error occurred while creating the table:', err)
          } else {
            console.log('It worked!')
          }
        })
    }

    var schema = {};
    fs.readdirSync(__dirname)
      .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "schema.js");
      })
      .forEach(function(file) {
        var model = sequelize.import(path.join(__dirname, file));
        schema[model.name] = model;
      });

    Object.keys(schema).forEach(function(model) {
      if ("associate" in schema[model]) {
        schema[model].associate(schema)
      };
    });

  }
  return schema;
};
