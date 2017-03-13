export default (sequelize, DataTypes) => {
	var Scep = sequelize.define("Scep", {
        propID: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        PermExemptions: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        TotalExemptions: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        councilDistrictNo: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        censusTract: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        yearBuilt: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        units: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        APN: {
			type: DataTypes.STRING,
            allowNull: false,
			validate: { len: [1] }
		},
        landUseDesc: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        CodeDistrict: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        CodeDistrictID: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        HouseNum: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        StreetName: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        Property_Address: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        StreetDirection: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        FlgDeleted: {
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
                Scep.belongsTo(models.AddressMaster);
            }
        },
        timestamps: false
    });
	return Scep;
};