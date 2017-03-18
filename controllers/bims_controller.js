import fs from 'fs';
import csv from 'fast-csv';

module.exports = {
    readData: (app) => {
        let stream = fs.createReadStream("./temp-data/bims.csv");
        let num = 1000;
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
        let cleanUpLine = (data)=> {
                let cleanedLine = data.toString();
                cleanedLine
                    .replace(/, /g, ' ')
                    .replace(/","/g, ',')
                    .replace(/"/g, '')
                    .split(',')
               return cleanedLine
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
            rawBatch.push(tempData);
            if(rawBatch.length % num === 0){
                pause();
                console.log(rawBatch);
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

