#!/bin/zsh

# stop if error
set -e 

DIR_NAME=$1

# Run CSVclean to clean the datasets
for file in ./$DIR_NAME/*; do
  echo "cleaning: " $file
  if [[ $file == *"prop_unit.csv"* ]]; then
      echo "Prop Unit is bad"
      continue 
  fi
  csvclean -v $file & # send to background for speed
  echo "clean finishing for " $file
done
wait #until processes are done. 

# insert into postgres
for clean_file in ./$DIR_NAME/*_out.csv; do
  echo "Inserting " $clean_file
  csvsql --db postgresql:///hcid-disp  --insert $clean_file
  echo "Finished " $clean_file
done

# remove output files
rm ./$DIR_NAME/*_out.csv
rm ./%DIR_NAME/*_err.csv

# create a view with all APNs in the same rows. Full outer join style
psql -d hcid-disp -a -f ./etl/join.sql

