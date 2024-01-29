module.exports = function (sequelize, DataTypes) {
  const Chat = sequelize.define('Chat', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    assistantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notNull: {
        msg: 'Por favor, rellena el campo "AssistantId".'
      }
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notNull: {
        msg: 'Por favor, rellena el campo "CustomerId".'
      }
    },
    resume: {
      type: DataTypes.STRING,
      allowNull: false,
      notNull: {
        msg: 'Por favor, rellena el campo "Resume".'
      }
    },
    thread: {
      type: DataTypes.STRING,
      allowNull: false,
      notNull: {
        msg: 'Por favor, rellena el campo "Thread".'
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
    tableName: 'chats',
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
        name: 'chats_assistantId_fk',
        using: 'BTREE',
        fields: [
          { name: 'assistantId' }
        ]
      },
      {
        name: 'chats_customerId_fk',
        using: 'BTREE',
        fields: [
          { name: 'customerId' }
        ]
      },
    ]
  })

  Chat.associate = function (models) {
    Chat.belongsTo(models.Assistant, { as: 'assistant' , foreignkey: 'assistantId'})
    Chat.belongsTo(models.Customer, { as: 'customer' , foreignkey: 'customerId'})
    Chat.hasMany(models.Prompt, { as: 'prompts', foreignKey: 'chatId' })
  }

  return Chat
}