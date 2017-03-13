export default (sequelize, DataTypes) => {
	var Bims = sequelize.define("Bims", {
		StatementNum: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},
        StatementDate: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},
        APN: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: { len: [1] }
		},
        Property_Address: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},
        Property_City_State_Zip: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},
        RSO_Exemptions: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},
        SCEP_Exmpetions: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},
        IS_RSO: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},
        IS_SCEP: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},
        RSO_Invoice_Num: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},
        SCEP_Invoice_Num: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},
        Total_Units: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},
        RSO_Units_Billed: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},
        SCEP_Units_Billed: {
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
                Bims.belongsTo(models.AddressMaster);
            }
        },
        timestamps: false
    });
	return Bims;
};