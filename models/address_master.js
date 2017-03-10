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
			timestamps: true
		}
	);
		return AddressMaster;
};