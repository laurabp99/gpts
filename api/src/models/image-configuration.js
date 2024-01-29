module.exports = function (sequelize, DataTypes) {
  const ImageConfiguration = sequelize.define('ImageConfiguration', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    entity: {
      type: DataTypes.STRING,
      allowNull: false,
      notNull: {
        msg: 'Por favor, rellena el campo "Entity".'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      notNull: {
        msg: 'Por favor, rellena el campo "Name".'
      }
    },
    mediaQuery: {
      type: DataTypes.STRING,
      allowNull: false,
      notNull: {
        msg: 'Por favor, rellena el campo "MediaQuery".'
      }
    },
    widthPx: {
      type: DataTypes.INTEGER
    },
    heightPx: {
      type: DataTypes.INTEGER
    },
    createdAt: {
      type: DataTypes.DATE,
      get () {
        return this.getDataValue('createdAt')
          ? this.getDataValue('createdAt').toISOString().split('T')[0]
          : null
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      get () {
        return this.getDataValue('updatedAt')
          ? this.getDataValue('updatedAt').toISOString().split('T')[0]
          : null
      }
    }
  }, {
    sequelize,
    tableName: 'image_configurations',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [
          { name: 'id' }
        ]
      },
      {
        name: 'image_configurations_entity_name_mediaQuery_index',
        using: 'BTREE',
        fields: [
          { name: 'entity' },
          { name: 'name' },
          { name: 'mediaQuery' },
        ]
      },
    ]
  })

  ImageConfiguration.associate = function (models) {
    ImageConfiguration.hasMany(models.Image, { as: 'images', foreignKey: 'imageConfigurationId' })
  }

  return ImageConfiguration
}