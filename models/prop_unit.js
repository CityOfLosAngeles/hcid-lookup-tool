export default (sequelize, DataTypes) => {
	var Prop_unit = sequelize.define("Prop_unit", {
        APN: {
			type: DataTypes.STRING,
            allowNull: false,
			validate: { len: [1] }
		},
        UnitID: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},   
        BldgID: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},   
        HouseID: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},   
        BldgUnitID: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},   
        propbldgid: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},   
        LutUnitStatusCd: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},   
        UnitNum: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},   
        LegacyUnitNum: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},   
        DateBuilt: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},   
        DateDemolished: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},   
        LutModReasonCd: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},   
        LutModVerifiedCd: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},   
        ModComment: {
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
                Prop_unit.belongsTo(models.AddressMaster);
            }
        },
        timestamps: false
    });
	return Prop_unit;
};