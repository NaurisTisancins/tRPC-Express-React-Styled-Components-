import { Sequelize, Model, DataTypes } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');

export const YourDetails = sequelize.define('YourDetails', {
  firstName: DataTypes.STRING,
  surname: DataTypes.STRING,
  email: DataTypes.STRING,
});

export const MoreComments = sequelize.define('MoreComments', {
  telephoneNumber: DataTypes.NUMBER,
  gender: DataTypes.ENUM('Male', 'Female', 'Other', 'None'),
  dateOfBirth: DataTypes.STRING,
});

export const FinalComments = sequelize.define('FinalComments', {
  comments: DataTypes.STRING,
});
