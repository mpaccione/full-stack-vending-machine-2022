module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        productId: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        currentInventory: {
            default: 0,
            type: DataTypes.INTEGER
        },
        description: {
            type: DataTypes.STRING
        },
        maximumInventory: {
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.FLOAT
        }
    })
    Product.associate = function(models) {
        Product.hasMany(models.Promotion)
    }
    return Product
}