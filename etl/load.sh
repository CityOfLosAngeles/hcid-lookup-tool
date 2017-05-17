#!/bin/zsh

# stop if error
set -e 

# Run CSVclean to clean the datasets
for file in ./data/*; do
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
for clean_file in ./data/*_out.csv; do
  echo "Inserting " $clean_file
  csvsql --db postgresql:///hcid-disp --prefix REPLACE --insert $clean_file
  echo "Finished " $clean_file
done

# remove output files
rm ./data/*_out.csv
rm ./data/*_err.csv

# create a view with all APNs in the same rows. Full outer join style
psql -d hcid-disp -a -f ./etl/join.sql

