CREATE VIEW master_table AS

SELECT bims_out."APN",
		bims_out."Property_Address",
		hims_out."Apn"	,
		hims_out."StreetName",
		prop_site_address_out."Apn",
		prop_site_address_out."StreetName",
		rent_out."APN"
FROM bims_out
FULL OUTER JOIN hims_out
    ON to_number(bims_out."APN",'9') = to_number(hims_out."Apn",'9')
FULL OUTER JOIN prop_site_address_out 
    ON to_number(bims_out."APN",'9') = to_number(prop_site_address_out."Apn",'9')
FULL OUTER JOIN rent_out 
    ON to_number(bims_out."APN",'9') = to_number(rent_out."APN",'9');
