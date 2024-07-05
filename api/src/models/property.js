module.exports = function (sequelize, DataTypes) {
const Property = sequelize.define('Property',
    {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true
    },
    hostId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    hostSince: {
        type: DataTypes.DATE,
        allowNull: true
    },
    hostName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    hostLocation: {
        type: DataTypes.STRING,
        allowNull: true
    },
    neighburhood: {
        type: DataTypes.STRING,
        allowNull: true
    },
    roomType: {
        type: DataTypes.STRING,
        allowNull: true
    },
    bedrooms: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    beds: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    numberOfReviews: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    availability30: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    availability60: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    availability90: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    availability365: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    price: {
        type: DataTypes.STRING,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    }
    }, {
    sequelize,
    tableName: 'properties',
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
        }
    ]
    }
)

Property.associate = function (models) {
    
}

return Property
}