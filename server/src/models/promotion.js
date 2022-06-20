module.exports = (sequelize, DataTypes) => {
    const Promotion = sequelize.define('Promotion', {
        promotionId: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.Integer,
        },
        discount: {
            type: DataTypes.Float
        },
        endDate: {
            type: DataTypes.Date
        },
        startDate: {
            type: DataTypes.Date
        }
    })
    Promotion.associate = function(models) {
        Promotion.belongsTo(models.Product)
    }
    return Promotion
}