module.exports = (sequelize, DataTypes) => {
    const Promotion = sequelize.define('Promotions', {
        promotionId: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        discount: {
            type: DataTypes.INTEGER,
            set(value) {
                this.setDataValue('discount', parseInt(value))
            }
        },
        endDate: {
            type: DataTypes.DATE,
            set(date) {
                console.log(date)
                this.setDataValue('endDate', new Date(date).toJSON().slice(0, 10))
            }
        },
        startDate: {
            type: DataTypes.DATE,
            set(date) {
                console.log(date)
                this.setDataValue('startDate', new Date(date).toJSON().slice(0, 10))
            }
        }
    })
    Promotion.associate = function(models) {
        Promotion.belongsTo(models.Products, { foreignKey: 'productId' })
    }
    return Promotion
}