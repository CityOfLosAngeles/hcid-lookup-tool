module.exports = function(sequelize, DataTypes){
	var AddressMaster = sequelize.define("AddressMaster", {
		street_num: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: { len: [1] }
		},
        street_name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: { len: [1] }
		},
        street_type: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: { len: [1] }
		},
        street_dir_cd: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: { len: [1] }
		},
        street_unit: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: { len: [1] }
		},
        city: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: { len: [1] }
		},
        state: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: { len: [1] }
		},
        zipcode: {
			type: DataTypes.INTEGER,
			allowNull: false,
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
                AddressMaster.hasMany(models.Bims),
                AddressMaster.hasMany(models.Hims),
                AddressMaster.hasMany(models.Prop_site_address),
                AddressMaster.hasMany(models.Prop_unit),
                AddressMaster.hasMany(models.Rent),
                AddressMaster.hasMany(models.Scep)
            }
        },
        timestamps: true,
		freezeTableName: true
    });
		return AddressMaster;
};