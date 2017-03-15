export default (sequelize, DataTypes) => {
	let Prop_site_address = sequelize.define("Prop_site_address", {
		Apn: {
			type: DataTypes.STRING,
            allowNull: false
		},
        HouseID: {
			type: DataTypes.STRING
		},
        HouseID: {
			type: DataTypes.STRING
		},  
        Pin: {
			type: DataTypes.STRING
		},  
        HouseNum: {
			type: DataTypes.STRING
		},  
        HouseFracNum: {
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
        City: {
			type: DataTypes.STRING
		},  
        Zip: {
			type: DataTypes.STRING
		},  
        ZipSuffix: {
			type: DataTypes.STRING
		},  
        XCoord: {
			type: DataTypes.STRING
		},  
        YCoord: {
			type: DataTypes.STRING
		},  
        Lon: {
			type: DataTypes.STRING
		},  
        Lat: {
			type: DataTypes.STRING
		},  
        Pind: {
			type: DataTypes.STRING
		},  
        EngDist: {
			type: DataTypes.STRING
		},  
        CouncilDistrict: {
			type: DataTypes.STRING
		},  
        LupLandUseCd: {
			type: DataTypes.STRING
		},  
        FlgHistMonument: {
			type: DataTypes.STRING
		},  
        LutCodeOfficeCd: {
			type: DataTypes.STRING
		},  
        LutRentAreaCd: {
			type: DataTypes.STRING
		},  
        LutHistPresZoneCd: {
			type: DataTypes.STRING
		},  
        TbmPage: {
			type: DataTypes.STRING
		},  
        TbmRow: {
			type: DataTypes.STRING
		},  
        TbmCol: {
			type: DataTypes.STRING
		},  
        CenTract2010: {
			type: DataTypes.STRING
		},  
        CenBlock2010GeoID: {
			type: DataTypes.STRING
		},  
        CenBlock2010: {
			type: DataTypes.STRING
		},  
        CenBlockGrp2010: {
			type: DataTypes.STRING
		},  
        CommunityName: {
			type: DataTypes.STRING
		},  
        FlgInsideCoi: {
			type: DataTypes.STRING
		},  
        CraRedevCd: {
			type: DataTypes.STRING
		},  
        StateAssemDist: {
			type: DataTypes.STRING
		},  
        StateSenDist: {
			type: DataTypes.STRING
		},  
        UsCongDist: {
			type: DataTypes.STRING
		},  
        CountySupDistNum: {
			type: DataTypes.STRING
		},  
        CommunityPlanAreaID: {
			type: DataTypes.STRING
		},  
        NeighborhoodCouncilID: {
			type: DataTypes.STRING
		},  
        FlgNsp1: {
			type: DataTypes.STRING
		},  
        FlgNsp2: {
			type: DataTypes.STRING
		},  
        FlgNsp3: {
			type: DataTypes.STRING
		},  
        HseAssignedCd: {
			type: DataTypes.STRING
		},  
        HseFlgDeleted: {
			type: DataTypes.STRING
		},  
        ApnFlgDeleted: {
			type: DataTypes.STRING
		},
        is_active: {
			type: DataTypes.BOOLEAN,
            defaultValue: true
		}
	},{
            classMethods: {
            associate: (models) => {
                Prop_site_address.belongsTo(models.AddressMaster);
            }
        },
        timestamps: false,
		freezeTableName: true
    });
	return Prop_site_address;
};    
