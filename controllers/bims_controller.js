import fs from 'fs';
import csv from 'fast-csv';
import addressParser from 'parse-address';

module.exports = {
    readData: (app) => {
        let stream = fs.createReadStream("./temp-data/bims.csv");
        let batchSize = 1000;
        let rawBatch = [];
        let addressMasterBatch = [];

        function RawData(c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13, c14) {
            this.StatementNum = c1;
            this.StatementDate = c2;
            this.APN = c3;
            this.Property_Address = c4;
            this.Property_City_State_Zip = c5;
            this.RSO_Exemptions = c6;
            this.SCEP_Exmpetions = c7;
            this.IS_RSO = c8;
            this.IS_SCEP = c9;
            this.RSO_Invoice_Num = c10; 
            this.SCEP_Invoice_Num = c11;
            this.Total_Units = c12;
            this.RSO_Units_Billed = c13;
            this.SCEP_Units_Billed = c14;
        }

        function AddressMaster(a1, a2, a3, a4, a5, a6 , a7, a8){
            this.street_num = a1;
            this.street_name = a2;
            this.street_type = a3;
            this.street_dir_cd = a4;
            this.street_unit = a5;
            this.city = a6;
            this.state = a7;
            this.zipcode = a8;
        }

        // CLEANS EACH LINE, Replaces unwated , with spaces, replaces "," with , and removes " before and after each string
        function cleanUpLine(data){
                let line = data.toString();
                let cleanLine = line
                    .replace(/, /g, ' ')
                    .replace(/","/g, ',')
                    .replace(/"/g, '')
                    .replace(/&/g, ' ')
                    .split(',')
               return cleanLine
        }

        let csvStream = csv({quote: null})
            .on("data", function(data){
                runConstructors(cleanUpLine(data));
            })
            .on("end", function(){
                // Last batch DB function goes here
                console.log("done");
            });
        
        function runRawData(readableStream){
            let tempData = new RawData(...readableStream);
            rawBatch.push(tempData); 
        }

        function runAddressMaster(readableStream){
            let rawPropAddress = readableStream[3];
            let rawCityStateZip = readableStream[4];
            let splitCityStateZip = rawCityStateZip.split(' ');
            let splitPropAddress = rawPropAddress.split(' ');

            // Gets Zipcode
            let rawZipcode = splitCityStateZip.pop();

            // Gets State
            let rawState = splitCityStateZip.pop();

            // Gets City
            let rawCity = splitCityStateZip.join(' ');

            // Parses Address using parse-address module
            let addressObject = addressParser.parseLocation(rawPropAddress);

            // Shaves off street number as first step to find apartment unit info 
            let splitNum = splitPropAddress.indexOf(addressObject.number);
            splitPropAddress.splice(splitNum, 1);

            // If direction (North, South, East, West) is part of address, assigns it, otherwise makes it null
            let addressDirection;
            if(addressObject.prefix !== undefined){
                addressDirection = addressObject.prefix;
                splitPropAddress.shift();
            } else {
                addressDirection = null;
            }

            // Loop to shave off street name to find apartment unit info
            let splitParsedName = addressObject.street.split(' ');
            for (var i = 0, x = splitParsedName.length; i < x; i++) {
                let splitName = splitPropAddress.indexOf(splitParsedName[i]);
                splitPropAddress.splice(splitName, 1);
            }

            // Shaves off type of road to find apartment unit info
            let splitType = splitPropAddress.indexOf(addressObject.type);
            splitPropAddress.splice(splitType, 1);

            // Aparment unit info is what's left in array, assigns it to addressUnit if it exists, otherwise makes it null
            let addressUnit = splitPropAddress.join(' ');
            if(!addressUnit){
                addressUnit = null;
            }

            // Runs parsed data through AddressMaster contrustor and pushes it to the batch
            let tempAddress = new AddressMaster(addressObject.number, addressObject.street, addressObject.type, addressDirection, addressUnit, rawCity, rawState, rawZipcode);
            addressMasterBatch.push(tempAddress); 
        }

        function runConstructors(readableStream) {
            runRawData(readableStream);
            runAddressMaster(readableStream);

            // Batch control: limits arrays to 1000 address objects, then runs DB functions and starts again
            if(rawBatch.length % batchSize === 0 && rawBatch.length !== 0){
                pause();
                console.log(rawBatch[999]);
                console.log(addressMasterBatch[999]);
                // Function call for checking DB and seeding DB goes here
                resume();
            }
        }

        // Function to pause data stream from file
        function pause(){
            stream.unpipe(csvStream);
            return csvStream.pause();
        }

        // Function to reset batches and resume data stream from file
        function resume(){
            rawBatch = [];
            addressMasterBatch = [];
            stream.pipe(csvStream);
            return csvStream.resume();
        } 

        // Runs the data stream through the csv parser
        stream.pipe(csvStream);
    }
}
