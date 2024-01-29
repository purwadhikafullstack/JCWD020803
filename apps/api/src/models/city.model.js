import { Model, DataTypes } from 'sequelize';

export default class City extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    City.hasMany(models.Address);
    City.hasMany(models.Branch);
    City.belongsTo(models.Province);
  }
}

export const init = (sequelize) => {
  City.init(
    {
      city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      city_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      postal_code: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.ENUM('Kota', 'Kabupaten'),
      },
    },
    {
      sequelize,
      modelName: 'City',
    },
  );
  return City;
};
