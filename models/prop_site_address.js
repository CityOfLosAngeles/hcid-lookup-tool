export default (sequelize, DataTypes) => {
	var Prop_site_address = sequelize.define("Prop_site_address", {
		Apn: {
			type: DataTypes.STRING,
            allowNull: false,
			validate: { len: [1] }
		},
        HouseID: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},
        HouseID: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        Pin: {
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
        City: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        Zip: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        ZipSuffix: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        XCoord: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        YCoord: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        Lon: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        Lat: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        Pind: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        EngDist: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        CouncilDistrict: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        LupLandUseCd: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        FlgHistMonument: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        LutCodeOfficeCd: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        LutRentAreaCd: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        LutHistPresZoneCd: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        TbmPage: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        TbmRow: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        TbmCol: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        CenTract2010: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        CenBlock2010GeoID: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        CenBlock2010: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        CenBlockGrp2010: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        CommunityName: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        FlgInsideCoi: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        CraRedevCd: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        StateAssemDist: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        StateSenDist: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        UsCongDist: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        CountySupDistNum: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        CommunityPlanAreaID: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        NeighborhoodCouncilID: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        FlgNsp1: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        FlgNsp2: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        FlgNsp3: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        HseAssignedCd: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        HseFlgDeleted: {
			type: DataTypes.STRING,
			validate: { len: [1] }
		},  
        ApnFlgDeleted: {
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
			timestamps: true
		}
	);
	return Prop_site_address;
};    
