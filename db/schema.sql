-- Can't have the following lines when IMPORTING a csv file, but will need these equivalents in sequelize models
--     is_active BOOLEAN DEFAULT TRUE,
--     id SERIAL PRIMARY KEY,
--     createdAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()

CREATE DATABASE hcid_tool_db;
USE hcid_tool_db;
 
CREATE TABLE address_list (
    id SERIAL PRIMARY KEY,
    street_num INTEGER NOT NULL,
    street_name CHAR(40) NOT NULL,
    street_type CHAR(40) NOT NULL,
    street_dir_cd CHAR(40) NOT NULL,
    street_unit CHAR(40),
    city CHAR(40),
    state CHAR(40) NOT NULL,
    zipcode INTEGER,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    createdAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);
 
CREATE TABLE bims (
    StatementNum CHAR(40),
    StatementDate CHAR(40) 
    APN CHAR(40) NOT NULL,
    Property_Address CHAR(40),
    Property_City_State_Zip CHAR(40),
    RSO_Exemptions CHAR(40),
    SCEP_Exmpetions CHAR(40),
    IS_RSO CHAR(40),
    IS_SCEP CHAR(40),
    RSO_Invoice_Num CHAR(40),
    SCEP_Invoice_Num CHAR(40),
    Total_Units CHAR(40),
    RSO_Units_Billed CHAR(40),
    SCEP_Units_Billed CHAR(40)
);

CREATE TABLE hims (
    HOUSEING_PROGRAM CHAR(40),
    ProjUniqueID CHAR(40),
    ProjectNo CHAR(40),
    PROJECT_STATUS CHAR(40),
    PROJECT_INFO TEXT,
    APN CHAR(40) NOT NULL,
    HouseId CHAR(40),
    HouseNum CHAR(40),
    HouseFracNum CHAR(40),
    PIN CHAR(40),
    CouncilDistric CHAR(40),
    PreDirCd CHAR(40),
    StreetName CHAR(40),
    StreetTypeCd CHAR(40),
    PostDirCd CHAR(40),
    UnitRange CHAR(40),
    Unit_Number CHAR(40),
    ZipCode CHAR(40),
    City CHAR(40),
    LAHD_Count CHAR(40),
    LUPAM_Count CHAR(40),
    IsInFloodZone CHAR(40),
    CensusTract CHAR(40)
);

CREATE TABLE prop_site_address (
    Apn CHAR(40) NOT NULL,
    HouseID CHAR(40),
    Pin CHAR(40),
    HouseNum CHAR(40),
    HouseFracNum CHAR(40),
    PreDirCd CHAR(40),
    StreetName CHAR(40),
    StreetTypeCd CHAR(40),
    PostDirCd CHAR(40),
    UnitRange CHAR(40),
    City CHAR(40),
    Zip CHAR(40),
    ZipSuffix CHAR(40),
    XCoord CHAR(40),
    YCoord CHAR(40),
    Lon CHAR(40),
    Lat CHAR(40),
    Pind CHAR(40),
    EngDist CHAR(40),
    CouncilDistrict CHAR(40),
    LupLandUseCd CHAR(40),
    FlgHistMonument CHAR(40),
    LutCodeOfficeCd CHAR(40),
    LutRentAreaCd CHAR(40),
    LutHistPresZoneCd CHAR(40),
    TbmPage CHAR(40),
    TbmRow CHAR(40),
    TbmCol CHAR(40),
    CenTract2010 CHAR(40),
    CenBlock2010GeoID CHAR(40),
    CenBlock2010 CHAR(40),
    CenBlockGrp2010 CHAR(40),
    CommunityName CHAR(40),
    FlgInsideCoi CHAR(40),
    CraRedevCd CHAR(40),
    StateAssemDist CHAR(40),
    StateSenDist CHAR(40),
    UsCongDist CHAR(40),
    CountySupDistNum CHAR(40),
    CommunityPlanAreaID CHAR(40),
    NeighborhoodCouncilID CHAR(40),
    FlgNsp1 CHAR(40),
    FlgNsp2 CHAR(40),
    FlgNsp3 CHAR(40),
    HseAssignedCd CHAR(40),
    HseFlgDeleted CHAR(40),
    ApnFlgDeleted CHAR(40)
);
-- ** ISSUES with PROP SITE ADDRESS ** --
-- @ find: 5581004021 - had to delete single quotes around "1-50"
-- @ find: 6011002034 - had to delete single quotes around "1-12"


CREATE TABLE prop_unit (
    APN CHAR(40) NOT NULL,
    UnitID CHAR(40),
    BldgID CHAR(40),
    HouseID CHAR(40),
    BldgUnitID CHAR(40),
    propbldgid CHAR(40),
    LutUnitStatusCd CHAR(40),
    UnitNum CHAR(40),
    LegacyUnitNum CHAR(40),
    DateBuilt CHAR(40),
    DateDemolished CHAR(40),
    LutModReasonCd CHAR(40),
    LutModVerifiedCd CHAR(40),
    ModComment TEXT
);
-- ** ISSUES with PROP UNIT ** --
-- Using pgADMIN 4 ver 1.2 had to ENCODE with ISO_8859_5 on import/export screen, to upload file
-- @ find: 5483017028 - had to delete single quotes around "manual-mod"
-- @ find: 2785018041 - had to delete single quotes around "manual-mod"
-- @ find: 5082023025 - had to delete extra " in front of  "_x1"

CREATE TABLE rent (
    APN CHAR(40) NOT NULL,
    Property_Address TEXT,
    Service_Date CHAR(40),
    Land_Use_Code CHAR(40),
    Unit_Count CHAR(40),
    Exempted_Units CHAR(40),
    RSO_Units CHAR(40),
    Year_Built CHAR(40),
    Category CHAR(40),
    Council_District CHAR(40),
    Secondary_Address TEXT,
    houseID CHAR(40),
    FC_NOTES CHAR(40)
);

CREATE TABLE scep (
    propID CHAR(40),
    PermExemptions CHAR(40),
    TotalExemptions CHAR(40),
    councilDistrictNo CHAR(40),
    censusTract CHAR(40),
    yearBuilt CHAR(40),
    units CHAR(40),
    APN CHAR(40) NOT NULL,
    landUseDesc CHAR(40),
    CodeDistrict CHAR(40),
    CodeDistrictID CHAR(40),
    HouseNum CHAR(40),
    StreetName CHAR(40),
    Property_Address CHAR(40),
    StreetDirection CHAR(40),
    FlgDeleted CHAR(40)
);