import fs from 'fs';
import csv from 'fast-csv';

module.exports = {
    readData: (app) => {
        let stream = fs.createReadStream("./temp-data/rent.csv");
        let batchSize = 1000;
        let rawBatch = [];
        let addressMasterBatch = [];

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