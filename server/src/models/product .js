module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Products', {
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
        image: {
            get() {
              return this.getDataValue('image').toString()
            },
            type: DataTypes.BLOB('medium')
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
        Product.hasMany(models.Promotions, { foreignKey: 'promotionId' })
    }
    return Product
}