import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Company = db.define(
  "Company", // Model name
  {
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'name', 
    },
    stateid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'state_id', 
    },
    cityid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'city_id', 
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'address', 
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: 'email', 
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'mobile_no', 
    },
    cinNo: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'cin_no', 
    },
    gstNo: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'gst_no', 
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'image', 
    },
  },
  {
    freezeTableName: true,
    tableName: 'company', // Explicitly specify the table name
  }

);

export default Company;
