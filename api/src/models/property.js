module.exports = function (sequelize, DataTypes) {
const Property = sequelize.define('Property',
    {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    hostId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    hostSince: {
        type: DataTypes.DATE,
        allowNull: false
    },
    hostName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    hostLocation: {
        type: DataTypes.STRING,
        allowNull: true
    },
    neighburhood: {
        type: DataTypes.STRING,
        allowNull: false
    },
    roomType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bedrooms: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    beds: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    numberOfReviews: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    availability30: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    availability60: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    availability90: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    availability365: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.STRING,
        allowNull: false
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