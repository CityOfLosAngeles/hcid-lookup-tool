import fs from 'fs';
import csv from 'fast-csv';
import addressParser from 'parse-address';
import addressController from './address.js';

module.exports = {
    readData: (app) => {
        let stream = fs.createReadStream("./temp-data/hims.csv");
        let rawBatch = [];
        let addressMasterBatch = [];
        let counter = 0;

        function RawData(c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13, c14, c15, c16, c17, c18, c19, c20, c21, c22 , c23) {
            this.HOUSING_PROGRAM = c1;
            this.ProjUniqueID = c2;
            this.ProjectNo = c3;
            this.PROJECT_STATUS = c4;
            this.PROJECT_INFO = c5;
            this.APN = c6;
            this.HouseId = c7;
            this.HouseNum = c8;
            this.HouseFracNum = c9;
            this.PIN = c10; 
            this.CouncilDistrict = c11;
            this.PreDirCd = c12;
            this.StreetName = c13;
            this.StreetTypeCd = c14;
            this.PostDirCd = c15;
            this.UnitRange = c16;
            this.Unit_Number = c17;
            this.ZipCode = c18;
            this.City = c19;
            this.LAHD_Count = c20;
            this.LUPAM_Count = c21;
            this.IsInFloodZone = c22;
            this.CensusTract = c23;
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
        let cleanUpLine = (data)=> {
                let line = data.toString();
                let cleanLine = line
                    .replace(/, /g, ' ')
                    .replace(/","/g, ',')
                    .replace(/"/g, '')
                    .split(',')
               return cleanLine
        }

        let csvStream = csv({quote: null})
            .on("data", function(data){
                console.log('\n$$$$$$$$$ Inside "on data" $$$$$$$$$');
                if(!data[0].includes("HOUSING_PROGRAM")){
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
            
        function runAddressMaster(readableStream){
            let state = 'CA';

            let street_num = readableStream[7];
            if(!street_num){street_num = null;}

            let street_dir_cd = readableStream[11];
            if(!street_dir_cd){street_dir_cd = null;}

            let street_name = readableStream[12];
            if(!street_name){street_name = null;}

            let street_type = readableStream[13];
            if(!street_type){street_type = null;}

            let street_unit = `${readableStream[15]} ${readableStream[16]}`;
            if(street_unit === ' '){street_unit = null;}

            let zipcode = readableStream[17];
            if(!zipcode){zipcode = null;}

            let city = readableStream[18];
            if(!city){city = null;}

            let tempAddress = new AddressMaster(street_num, street_name, street_type, street_dir_cd, street_unit, city, state, zipcode);
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
            addressController.createHims(addressMasterBatchObject, rawBatchObject, resume3);
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
