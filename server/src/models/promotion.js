module.exports = (sequelize, DataTypes) => {
    const Promotion = sequelize.define('Promotion', {
        promotionId: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        discount: {
            type: DataTypes.FLOAT
        },
        endDate: {
            type: DataTypes.DATE
        },
        startDate: {
            type: DataTypes.DATE
        }
    })
    Promotion.associate = function(models) {
        Promotion.belongsTo(models.Product)
    }
    return Promotion
}