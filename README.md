# HCID  - Lookup Tool 

## About

Single Lookup Tool - The Department maintains over 8 different database and data sources (Excel & Access files) containing information about different rental properties. The Department often needs to lookup and attribute different programs to these units. This tool would consider of an unified ETL pipeline and deduplication service that allows staff to lookup properties and see which programs have been used, along with alternate addresses, etc. 

## Sponsors

Rushmore Cervantes

Laura Guglielmo

Luz Santiago

## Partners

UCLA

## City Team

Grace Benedicto

Donya Plazo (Code)

Stephen Lew

Rollin Nelson

Emmanuel Yuen

Bryan Kirkness (Code)

Franklin Campos

Rent

Compliance

Neighborhood Development

## Goals

1. Single query of multiple data sources to provide all information on a single (and related) property i.e. Property Information Sheet/Snapshot

2. Minimize need to search using multiple platforms.

3. Ensure non-duplication of data

4. Long-term goal:  Additional query options.  Generate a report that produces results from the search of the multiple data sources based on shared common criteria.  Criteria search vs. Property Search. i.e. properties that have a land use covenant, financed new construction that are now in the Rent Escrow Program.

## Deliverables

Lookup Tool - a website with an automated ETL process on the data exports and a search and lookup functionality. 

## Data Sources

HIMS

BIMS

CCRIS

Rent

Preservation Properties - Historical Access Database

Land Use

Neighborhood Development

Homeownership

Other Non-City Tax Credits and Financed

We've pulled these togehter into a single SQL Server database backup, called `datalake.bak`. The Database name is DataLake. 

## Resources

[LA City Geohub Parcel](http://geohub.lacity.org/datasets/6d85cb5f5f5641c6aa95203849ca05bb_0)
[LA County APN Change File](https://data.lacounty.gov/Parcel-/Assessor-Parcel-Change-File/qju6-wpwm)
[LA County Parcel Data](https://data.lacounty.gov/Parcel-/Assessor-Parcels-Data-2016/7rjj-f2pv)


## Technology / Node Packages

[Node v6.x](https://nodejs.org/dist/latest-v6.x/docs/api/)
[Postgres v9.6](https://www.postgresql.org/docs/9.6/static/index.html)

[Sequelize ORM](http://docs.sequelizejs.com/en/v3/)
[Babel](https://babeljs.io/)

[BlueBird npm](http://bluebirdjs.com/docs/getting-started.html)
[Parse-address npm](https://www.npmjs.com/package/parse-address)
[Fast-csv npm](https://www.npmjs.com/package/fast-csv)
[Multer npm](https://www.npmjs.com/package/multer)

