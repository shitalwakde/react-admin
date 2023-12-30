import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Company = db.define(
  "Company", // Model name
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobile_no: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cin_no: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gst_no: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    tableName: 'company', // Explicitly specify the table name
  }

);

export default Company;
