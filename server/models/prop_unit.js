export default (sequelize, DataTypes) => {
	let Prop_unit = sequelize.define("Prop_unit", {
        APN: {
			type: DataTypes.STRING,
            allowNull: false
		},
        UnitID: {
			type: DataTypes.STRING
		},   
        BldgID: {
			type: DataTypes.STRING
		},   
        HouseID: {
			type: DataTypes.STRING
		},   
        BldgUnitID: {
			type: DataTypes.STRING
		},   
        propbldgid: {
			type: DataTypes.STRING
		},   
        LutUnitStatusCd: {
			type: DataTypes.STRING
		},   
        UnitNum: {
			type: DataTypes.STRING
		},   
        LegacyUnitNum: {
			type: DataTypes.STRING
		},   
        DateBuilt: {
			type: DataTypes.STRING
		},   
        DateDemolished: {
			type: DataTypes.STRING
		},   
        LutModReasonCd: {
			type: DataTypes.STRING
		},   
        LutModVerifiedCd: {
			type: DataTypes.STRING
		},   
        ModComment: {
			type: DataTypes.STRING
		},
        is_active: {
			type: DataTypes.BOOLEAN,
            defaultValue: true
		}
	},{
            classMethods: {
            associate: (models) => {
                Prop_unit.belongsTo(models.AddressMaster);
            }
        },
        timestamps: false,
		freezeTableName: true
    });
	return Prop_unit;
};
