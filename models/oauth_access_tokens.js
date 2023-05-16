"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class oauth_access_tokens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  oauth_access_tokens.init(
    {
      id: { type: DataTypes.STRING, primaryKey: true },
    },
    {
      sequelize,
      tableName: "oauth_access_tokens",
      createdAt: "created_at",
      updatedAt: "updated_at",
      modelName: "oauth_access_tokens",
    }
  );
  return oauth_access_tokens;
};
