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

        function AddressMaster(a1, a2, a3, a4, a5) {
            this.street_num = a1;
            this.street_name = a2;
            this.street_type = a3;
            this.street_dir_cd = a4;
            this.state = a5 
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
                console.log('\n$$$$$$$$$ Inside "on data" $$$$$$$$$');
                if (!data[0].includes("propID")) {
                    console.log("^^^^^^ Inside if statement of 'on data' ^^^^^^");
                    runConstructors(cleanUpLine(data));
                }
            })
            .on("end", function () {
                console.log("done");
            });

        let runAddressMaster = (readableStream) => {
            let state = 'CA';

            let street_num = readableStream[11];
            if (!street_num) { street_num = null; }

            let street_name = readableStream[12];
            if (!street_name) { street_name = null; }

            let street_type = readableStream[13].split(' ').pop()
            if (!street_type) { street_type = null; }

            let street_dir_cd = readableStream[14];
            if(!street_dir_cd){street_dir_cd = null;}

            let tempAddress = new AddressMaster(street_num, street_name, street_type, street_dir_cd, state);
            addressMasterBatch.push(tempAddress);
        }

        let runRawData = (readableStream) => {
            let tempData = new RawData(...readableStream);
            rawBatch.push(tempData);

        }

        function runConstructors(readableStream) {
            console.log('####### Inside Run Constructors #######');
            runRawData(readableStream);
            runAddressMaster(readableStream);
            checkAddress( rawBatch[counter], addressMasterBatch[counter] );      
        }

        function checkAddress(rawBatchObject, addressMasterBatchObject) {
            console.log(`********************** Object Counter: ${counter} **********************`);
            console.log(addressMasterBatchObject);
            counter++;
            pause3();
            addressController.createScep(addressMasterBatchObject, rawBatchObject, resume3);
        }
        
        function pause3(){
            csvStream.pause();
            stream.unpipe(csvStream);  
        }

        function resume3(){
            csvStream.resume();
            stream.pipe(csvStream);
        }

        stream.pipe(csvStream); 
    }
}