// SEQUELIZE
const Sequelize = require('sequelize');
let env = process.env.NODE_ENV || 'development';
let config = require('../config')[env];

let { db: { name, user, pass, host, port }} = config;
const connection = new Sequelize(
  name, user, pass, {host, port }
);

export const User = connection.define("user", {
  username: {
    type: Sequelize.STRING,
    unique: true,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
  },
  admin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  password: Sequelize.STRING,
});

// Updated to new
export const Coin = connection.define("coin", {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  issue_id: Sequelize.STRING,
  mint: Sequelize.STRING,
  mintage: Sequelize.STRING,
  description: Sequelize.STRING,
}, {
  timestamps: false
});

// Updated to new
export const Mint = connection.define("mint", {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  mark: Sequelize.STRING,
  name: Sequelize.STRING,
}, {
  timestamps: false
});

// Updated to new
export const Denomination = connection.define("denomination", {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  kind: Sequelize.STRING,
  val: Sequelize.FLOAT,
}, {
  timestamps: false
});

// Updated to new
export const Designer = connection.define('designer', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  name: Sequelize.STRING,
}, {
  timestamps: false
});

export const Issue = connection.define('issue', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  denomination_id: Sequelize.STRING,
  variety_name: Sequelize.STRING,
  from_year: Sequelize.STRING,
  to_year: Sequelize.STRING,
  composition: Sequelize.STRING,
  mass: Sequelize.STRING,
  diameter: Sequelize.STRING,
}, {
  timestamps: false
});
