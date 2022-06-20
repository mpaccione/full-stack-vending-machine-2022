module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        productId: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.Integer,
        },
        currentInventory: {
            default: 0,
            type: DataTypes.Integer
        },
        description: {
            type: DataTypes.String
        },
        maximumInventory: {
            type: DataTypes.Integer
        },
        name: {
            type: DataTypes.String
        },
        price: {
            type: DataTypes.Float
        }
    })
    Product.associate = function(models) {
        Product.hasMany(models.Promotions)
    }
    return Product
}