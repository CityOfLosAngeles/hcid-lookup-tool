export default (sequelize, DataTypes) => {
    var Bims = sequelize.define("Bims", {
        StatementNum: {
            type: DataTypes.STRING
        },
        StatementDate: {
            type: DataTypes.STRING
        },
        APN: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Property_Address: {
            type: DataTypes.STRING
        },
        Property_City_State_Zip: {
            type: DataTypes.STRING
        },
        RSO_Exemptions: {
            type: DataTypes.STRING
        },
        SCEP_Exmpetions: {
            type: DataTypes.STRING
        },
        IS_RSO: {
            type: DataTypes.STRING
        },
        IS_SCEP: {
            type: DataTypes.STRING
        },
        RSO_Invoice_Num: {
            type: DataTypes.STRING
        },
        SCEP_Invoice_Num: {
            type: DataTypes.STRING
        },
        Total_Units: {
            type: DataTypes.STRING
        },
        RSO_Units_Billed: {
            type: DataTypes.STRING
        },
        SCEP_Units_Billed: {
            type: DataTypes.STRING
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    },
		{
			classMethods:{
				associate:  (models)  =>  {
					Bims.belongsTo(models.AddressMaster,
					{
						foreignKey: {
							allowNull: false
							}
						});
				            }
			        },
			        timestamps:  false,
			freezeTableName: true
    });
    return Bims;
};
