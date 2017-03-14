module.exports = function(sequelize, DataTypes) {
	var Scep = sequelize.define("Scep", {
        propID: {
			type: DataTypes.STRING
		},  
        PermExemptions: {
			type: DataTypes.STRING
		},  
        TotalExemptions: {
			type: DataTypes.STRING
		},  
        councilDistrictNo: {
			type: DataTypes.STRING
		},  
        censusTract: {
			type: DataTypes.STRING
		},  
        yearBuilt: {
			type: DataTypes.STRING
		},  
        units: {
			type: DataTypes.STRING
		},  
        APN: {
			type: DataTypes.STRING,
            allowNull: false
		},
        landUseDesc: {
			type: DataTypes.STRING
		},  
        CodeDistrict: {
			type: DataTypes.STRING
		},  
        CodeDistrictID: {
			type: DataTypes.STRING
		},  
        HouseNum: {
			type: DataTypes.STRING
		},  
        StreetName: {
			type: DataTypes.STRING
		},  
        Property_Address: {
			type: DataTypes.STRING
		},  
        StreetDirection: {
			type: DataTypes.STRING
		},  
        FlgDeleted: {
			type: DataTypes.STRING
		},
        is_active: {
			type: DataTypes.BOOLEAN,
            defaultValue: true
		}	
	},{
            classMethods: {
            associate: (models) => {
                Scep.belongsTo(models.AddressMaster);
            }
        },
        timestamps: false,
		freezeTableName: true
    });
	return Scep;
};
