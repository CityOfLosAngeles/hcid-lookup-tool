module.exports = function(sequelize, DataTypes) {
	var Hims = sequelize.define("Hims", {
		HOUSING_PROGRAM: {
			type: DataTypes.STRING
		},
        ProjUniqueID: {
			type: DataTypes.STRING
		},
        ProjectNo: {
			type: DataTypes.STRING
		},
        PROJECT_STATUS: {
			type: DataTypes.STRING
		},
        PROJECT_INFO: {
			type: DataTypes.STRING
		},
        APN: {
			type: DataTypes.STRING,
			allowNull: false
		},
        HouseId: {
			type: DataTypes.STRING
		},
        HouseNum: {
			type: DataTypes.STRING
		},
        HouseFracNum: {
			type: DataTypes.STRING
		},
        PIN: {
			type: DataTypes.STRING
		},
        CouncilDistric: {
			type: DataTypes.STRING
		},
        PreDirCd: {
			type: DataTypes.STRING
		},
        StreetName: {
			type: DataTypes.STRING
		},
        StreetTypeCd: {
			type: DataTypes.STRING
		},
        PostDirCd: {
			type: DataTypes.STRING
		},
        UnitRange: {
			type: DataTypes.STRING
		},
        Unit_Number: {
			type: DataTypes.STRING
		},
        ZipCode: {
			type: DataTypes.STRING
		},
        City: {
			type: DataTypes.STRING
		},
        LAHD_Count: {
			type: DataTypes.STRING
		},
        LUPAM_Count: {
			type: DataTypes.STRING
		},
        IsInFloodZone: {
			type: DataTypes.STRING
		},
        CensusTract: {
			type: DataTypes.STRING
		},
        is_active: {
			type: DataTypes.BOOLEAN,
            defaultValue: true
		}
	},{
            classMethods: {
            associate: (models) => {
                Hims.belongsTo(models.AddressMaster);
            }
        },
        timestamps: false,
		freezeTableName: true
    });
	return Hims;
};
