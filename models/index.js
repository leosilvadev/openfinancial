if (!global.hasOwnProperty('db')) {
  var Sequelize = require('sequelize')
  , sequelize = null

  if (process.env.HEROKU_POSTGRESQL_BRONZE_URL) {
    // the application is executed on Heroku ... use the postgres database
    var match = process.env.HEROKU_POSTGRESQL_BRONZE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/)

    sequelize = new Sequelize(match[5], match[1], match[2], {
      dialect:  'postgres',
      protocol: 'postgres',
      port:     match[4],
      host:     match[3],
      logging:  true //false
    })
  } else {
    sequelize = new Sequelize('openfinancial', 'postgres', 'root', {
      dialect:  'postgres',
      protocol: 'postgres',
      port:     '5432',
      host:     'localhost'
    });
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
    .sync({ force: true })
    .complete(function(err) {
      if (!!err) {
        console.log('An error occurred while creating the table:', err)
      } else {
        console.log('It worked!')
      }
    })
  }

  global.db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    Payment:   sequelize.import(__dirname + '/payment'),
    User:      sequelize.import(__dirname + '/user')

  }

  var userPaymentsFK = {
    name: 'user_id',
    allowNull: false
  };

  global.db.User.hasMany(global.db.Payment,{
      foreignKey:userPaymentsFK
  });
  global.db.Payment.belongsTo(global.db.User,{
    foreignKey:userPaymentsFK
  });
  /*
  Associations can be defined here. E.g. like this:
  global.db.User.hasMany(global.db.SomethingElse)
  */
}

module.exports = global.db
