#!/bin/zsh

DIR_NAME=$1

# Run CSVclean to clean the datasets
ls ./$DIR_NAME/* | parallel "csvclean -v {}" 

# insert into postgres
ls ./$DIR_NAME/*_out.csv | parallel "csvsql --db postgresql:///hcid-disp  --insert {}"

# remove output files
rm ./$DIR_NAME/*_out.csv
rm ./$DIR_NAME/*_err.csv

# create a view with all APNs in the same rows. Full outer join style
#psql -d hcid-disp -a -f ./etl/join.sql

