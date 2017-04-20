import fs from 'fs';
import csv from 'fast-csv';
import addressParser from 'parse-address';
import addressController from './address.js';
import Promise from 'bluebird';

module.exports = {
    readData: (app) => {
        let stream = fs.createReadStream("./temp-data/rent.csv");
        let rawBatch = [];
        let addressMasterBatch = [];
        let counter = 0;

        function RawData(c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13) {
            this.APN = c1;
            this.Property_Address = c2;
            this.Service_Date = c3;
            this.Land_Use_Code = c4;
            this.Unit_Count = c5;
            this.Exempted_Units = c6;
            this.RSO_Units = c7;
            this.Year_Built = c8;
            this.Category = c9;
            this.Council_District = c10;
            this.Secondary_Address = c11;
            this.houseID = c12;
            this.FC_NOTES = c13;
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

        let cleanUpLine = (data)=> {
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
                console.log('\n$$$$$$$$$ Inside "on data" $$$$$$$$$');
                if( !data[0].includes("APN") ){ 
                    console.log("^^^^^^ Inside if statement of 'on data' ^^^^^^");
                    runConstructors( cleanUpLine(data) );
                }
            })
            .on("end", function(){
                console.log("done");
            });

        function runRawData(readableStream){
            let tempData = new RawData(...readableStream);
            rawBatch.push(tempData);
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
            let rawCity = null;
            let rawState = 'CA';
            let rawZipcode = readableStream[10].split(' ').pop();
            let rawDirection,
                rawUnit,
                addressObject;

            [rawDirection, rawUnit, addressObject] = addressParse(readableStream[1]);

            if(!addressObject.type && addressObject){addressObject.type = null;}
            if(!addressObject.number && addressObject){addressObject.number = null;}

            let tempAddress = new AddressMaster(addressObject.number, addressObject.street, addressObject.type, rawDirection, rawUnit, rawCity, rawState, rawZipcode);
            addressMasterBatch.push(tempAddress);
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
            addressController.createRent(addressMasterBatchObject, rawBatchObject, resume3);
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
