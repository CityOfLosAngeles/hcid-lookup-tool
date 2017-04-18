import fs from 'fs';
import csv from 'fast-csv';
import addressParser from 'parse-address';
import addressController from './address.js';

module.exports = {
    readData: (app) => {
        let stream = fs.createReadStream("./temp-data/scep.csv");
        let rawBatch = [];
        let addressMasterBatch = [];
        let counter = 0;

        function RawData(c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13, c14, c15, c16) {
            this.propID = c1;
            this.PermExemptions = c2;
            this.TotalExemptions = c3;
            this.councilDistrictNo = c4;
            this.censusTract = c5;
            this.yearBuilt = c6;
            this.units = c7;
            this.APN = c8;
            this.landUseDesc = c9;
            this.CodeDistrict = c10;
            this.CodeDistrictID = c11;
            this.HouseNum = c12;
            this.StreetName = c13;
            this.Property_Address = c14;
            this.StreetDirection = c15;
            this.FlgDeleted = c16;
        }

        function AddressMaster(a1, a2, a3, a4) {
            this.street_num = a1;
            this.street_name = a2;
            this.street_type = a3;
            this.street_dir_cd = a4;
        }

        // CLEANS EACH LINE, Replaces unwated , with spaces, replaces "," with , and removes " before and after each string
        let cleanUpLine = (data) => {
            let line = data.toString();
            let cleanLine = line
                .replace(/, /g, ' ')
                .replace(/","/g, ',')
                .replace(/"/g, '')
                .split(',')
            return cleanLine
        }

        let csvStream = csv({ quote: null })
            .on("data", function (data) {
                // runAddressMaster(data)
                if (!data[0].includes("propID")) {
                    runConstructors(cleanUpLine(data));
                }
                // runRawData(cleanUpLine(data));
            })
            .on("end", function () {
                // Last batch DB function goes here
                console.log("done");
            });

        let runAddressMaster = (readableStream) => {
            let state = 'CA';
            let street_num = readableStream[11];
            let street_name = readableStream[12];
            let street_type = readableStream[13].split(' ').pop()
           
            let tempAddress = new AddressMaster(street_num, street_name, street_type, state);
            addressMasterBatch.push(tempAddress); 
        }

        let runRawData = (readableStream) => {
            let tempData = new RawData(...readableStream);
            console.log(tempData);
            rawBatch.push(tempData);
            
        }

        function runConstructors(readableStream) {
            runRawData(readableStream);
            runAddressMaster(readableStream);
            checkAddress(rawBatch[0], addressMasterBatch[0]);
        }

        // function checkAddress(rawBatch, addressMasterBatch, callback ) {
        function checkAddress(rawBatchObject, addressMasterBatchObject) {
            pause()
                .then(() => {
                    counter++;
                    console.log(`**********************\nObject Counter: ${counter}\n***************************************************`);
                    return addressController.createAddress10(addressMasterBatchObject, rawBatchObject);
                })
                .then(() => {
                    deleteObject();
                })
                .then(() => {
                    resume();
                })
                .catch((error) => {
                    console.error(error);
                });
        }


        function pause() {
            return new Promise(
                (resolve, reject) => {
                    stream.unpipe(csvStream)
                    resolve(csvStream.pause());
                }
            )
        }

        function deleteObject() {
            console.log('\ninside deleteObject\n');
            return new Promise(
                (resolve, reject) => {
                    rawBatch.shift();
                    addressMasterBatch.shift();
                }
            )
        }

        function resume() {
            stream.pipe(csvStream);
            return csvStream.resume();
        }


        stream.pipe(csvStream);
    }
}