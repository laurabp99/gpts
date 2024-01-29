module.exports = function (sequelize, DataTypes) {
  const Prompt = sequelize.define('Prompt', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    chatId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notNull: {
        msg: 'Por favor, rellena el campo "ChatId".'
      }
    },
    prompt: {
      type: DataTypes.TEXT,
      allowNull: false,
      notNull: {
        msg: 'Por favor, rellena el campo "Prompt".'
      }
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false,
      notNull: {
        msg: 'Por favor, rellena el campo "Answer".'
      }
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
    tableName: 'prompts',
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
        name: 'prompts_chatId_fk',
        using: 'BTREE',
        fields: [
          { name: 'chatId' }
        ]
      },
    ]
  })

  Prompt.associate = function (models) {
    Prompt.belongsTo(models.Chat, { as: 'chat', foreignKey: 'chatId' })
  }

  return Prompt
}