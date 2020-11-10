'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pembayaran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.tagihan, {
        foreignKey: "id_tagihan",
        as: "tagihan"
      })

      this.belongsTo(models.admin, {
        foreignKey: "id_admin",
        as: "admin"
      })
    }
  };
  pembayaran.init({
    id_pembayaran:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_tagihan: DataTypes.INTEGER,
    tgl_pembayaran: DataTypes.DATE,
    bulan_bayar: DataTypes.STRING,
    biaya_admin: DataTypes.INTEGER,
    total_bayar: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    bukti: DataTypes.STRING,
    id_admin: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'pembayaran',
    tableName: 'pembayaran'
  });
  return pembayaran;
};