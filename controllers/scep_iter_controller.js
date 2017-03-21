import fs from 'fs';
import csv from 'fast-csv';

module.exports = {
    readData: (app) => {
        let stream = fs.createReadStream("./temp-data/prop_unit.csv");
        let batchSize = 1000;
        let rawBatch = [];
        let addressMasterBatch = [];

        function RawData(c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13, c14, c15, c16) {
            this.propID = c1;
            this.PermExemptions  = c2;
            this.TotalExemptions  = c3;
            this.councilDistrictNo  = c4;
            this.censusTract  = c5;
            this.yearBuilt  = c6;
            this.units  = c7;
            this.APN  = c8;
            this.landUseDesc  = c9;
            this.CodeDistrict  = c10;
            this.CodeDistrictID  = c11;
            this.HouseNum  = c12;
            this.StreetName  = c13;
            this.Property_Address  = c14;
            this.StreetDirection  = c15;
            this.FlgDeleted  = c16;
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
  
                // runAddressMaster(data)
                runRawData(cleanUpLine(data));
            })
            .on("end", function(){
                // Last batch DB function goes here
                console.log("done");
            });
            
        let runAddressMaster = (readableStream) => {
            let rawPropAddress = readableStream[4].trim();
            let rawCityStateZip = readableStream[5].trim();
            let tempAddress = new AddressMaster();
        }

        let runRawData = (readableStream) => {
            let tempData = new RawData(...readableStream);
            console.log(tempData);
            rawBatch.push(tempData);
            if(rawBatch.length % batchSize === 0){
                pause();
                resume();
            }
        }

        function pause(){
            stream.unpipe(csvStream);
            return csvStream.pause();
        }

        function resume(){
            rawBatch = [];
            addressMasterBatch = [];
            stream.pipe(csvStream);
            return csvStream.resume();
        } 
        stream.pipe(csvStream);
    }
}