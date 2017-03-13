export default (sequelize, DataTypes) => {
	var Hims = sequelize.define("Hims", {
		HOUSEING_PROGRAM: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},
        ProjUniqueID: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},
        ProjectNo: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},
        PROJECT_STATUS: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},
        PROJECT_INFO: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},
        APN: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: { len: [1] }
		},
        HouseId: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},
        HouseNum: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},
        HouseFracNum: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},
        PIN: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},
        CouncilDistric: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},
        PreDirCd: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},
        StreetName: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},
        StreetTypeCd: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},
        PostDirCd: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},
        UnitRange: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},
        Unit_Number: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},
        ZipCode: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},
        City: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},
        LAHD_Count: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},
        LUPAM_Count: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},
        IsInFloodZone: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},
        CensusTract: {
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
                Hims.belongsTo(models.AddressMaster);
            }
        },
        timestamps: false
    });
	return Hims;
};
