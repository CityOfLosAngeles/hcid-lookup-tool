export default (sequelize, DataTypes) => {
	var Rent = sequelize.define("Rent", {
        APN: {
			type: DataTypes.STRING,
            allowNull: false,
			validate: { len: [1] }
		},
        Property_Address: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},
        Service_Date: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        Land_Use_Code: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        Unit_Count: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        Exempted_Units: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        RSO_Units: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        Year_Built: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        Category: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        Council_District: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        Secondary_Address: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},
        houseID: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        FC_NOTES: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},
        is_active: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			validate: { len: [1] },
            defaultValue: true
		}
	},{
            classMethods: {
            associate: (models) => {
                Rent.belongsTo(models.AddressMaster);
            }
        },
        timestamps: false
    });
	return Rent;
};