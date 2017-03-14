module.exports = function(sequelize, DataTypes) {
	var Rent = sequelize.define("Rent", {
        APN: {
			type: DataTypes.STRING,
            allowNull: false
		},
        Property_Address: {
			type: DataTypes.STRING
		},
        Service_Date: {
			type: DataTypes.STRING
		},  
        Land_Use_Code: {
			type: DataTypes.STRING
		},  
        Unit_Count: {
			type: DataTypes.STRING
		},  
        Exempted_Units: {
			type: DataTypes.STRING
		},  
        RSO_Units: {
			type: DataTypes.STRING
		},  
        Year_Built: {
			type: DataTypes.STRING
		},  
        Category: {
			type: DataTypes.STRING
		},  
        Council_District: {
			type: DataTypes.STRING
		},  
        Secondary_Address: {
			type: DataTypes.STRING
		},
        houseID: {
			type: DataTypes.STRING
		},  
        FC_NOTES: {
			type: DataTypes.STRING
		},
        is_active: {
			type: DataTypes.BOOLEAN,
            defaultValue: true
		}
	},{
            classMethods: {
            associate: (models) => {
                Rent.belongsTo(models.AddressMaster);
            }
        },
        timestamps: false,
		freezeTableName: true
    });
	return Rent;
};
