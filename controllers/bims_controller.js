import fs from 'fs';
import csv from 'fast-csv';
import addressParser from 'parse-address';
import addressController from './address.js';

module.exports = {
    readData: (app) => {
        let stream = fs.createReadStream("./temp-data/bims.csv");
        let batchSize = 100;
        let rawBatch = [];
        let addressMasterBatch = [];
        let counter = 0;

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
                if(!data[0].includes("StatementNum")){
                    runConstructors(cleanUpLine(data));
                }
            })
            .on("end", function(){
                // Last batch DB function goes here
                console.log("done");
            });
        
        function runRawData(readableStream){
            let tempData = new RawData(...readableStream);
            rawBatch.push(tempData); 
        }

        function cityStateZipParse(rawCityStateZip){
            let parsedCity = [];
            let splitCityStateZip = rawCityStateZip.split(' ');
            parsedCity.push(splitCityStateZip.pop());
            parsedCity.push(splitCityStateZip.pop());
            parsedCity.push(splitCityStateZip.join(' '));
            return parsedCity;
        }

        function addressParse(rawPropAddress){
            let splitPropAddress = rawPropAddress.split(' ');
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
            if(!addressUnit){addressUnit = null;}

            addressObject.number = parseInt(addressObject.number);

            let parsedAddress = [addressDirection, addressUnit, addressObject];

            return parsedAddress;
        }

        function runAddressMaster(readableStream){
            let rawCity, 
                rawState,
                rawZipcode,
                rawDirection,
                rawUnit,
                addressObject;

            [rawZipcode, rawState, rawCity] = cityStateZipParse(readableStream[4]);
            [rawDirection, rawUnit, addressObject] = addressParse(readableStream[3]);

             // Checking to see if street_type exists, setting it null if it does not
            if(!addressObject.type && addressObject){addressObject.type = null;}
             // Checking to see if street_type exists, setting it null if it does not
            if(!addressObject.number && addressObject){addressObject.number = null;}

            // Runs parsed data through AddressMaster contrustor and pushes it to the batch
            let tempAddress = new AddressMaster(addressObject.number, addressObject.street, addressObject.type, rawDirection, rawUnit, rawCity, rawState, rawZipcode);
            addressMasterBatch.push(tempAddress); 
        }

        function runConstructors(readableStream) {
            runRawData(readableStream);
            runAddressMaster(readableStream);
            checkAddress(rawBatch[0], addressMasterBatch[0]);
        }
        
        // function checkAddress(rawBatch, addressMasterBatch, callback ) {
        function checkAddress(rawBatchObject, addressMasterBatchObject) {
          
            pause2()
                .then( () => {
                    counter++;
                    console.log(`**********************\n  Object Counter: ${counter}\n***************************************************`);
                   return addressController.createAddress7(addressMasterBatchObject, rawBatchObject);
                })
                .then( () => {
                    rawBatch.shift();
                    addressMasterBatch.shift();
                })
                .then( () => {
                    resume();
                })
                .catch( (error) => {
                    console.log(error);
                });
        }

        // Function to pause data stream from file
        function pause(){
            counter++;
            console.log(`**********************\n  Object Counter: ${counter}\n***************************************************`);
            stream.unpipe(csvStream)
            return csvStream.pause();
        }

        function pause2() {
            console.log('$$ inside pause2 - outside promise $$');
            return new Promise(
                (resolve, reject) => {
                    console.log('** inside pause2 - inside PROMISE **');
                    stream.unpipe(csvStream)
                    resolve( csvStream.pause() );
                }
            )
        }

        function deleteObject() {
            console.log('inside deleteObject');
            return new Promise(
                (resolve, reject) => {
                    rawBatch.shift();
                    addressMasterBatch.shift();
                }
            )
        }

        // Function to reset batches and resume data stream from file
        function resume(){
            stream.pipe(csvStream);
            return csvStream.resume();
        } 

        // Runs the data stream through the csv parser
        stream.pipe(csvStream);
    }
}
