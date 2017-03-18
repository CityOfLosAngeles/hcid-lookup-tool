import fs from 'fs';
import csv from 'fast-csv';

module.exports = {
    readData: (app) => {
        let stream = fs.createReadStream("./temp-data/hims.csv");
        let batchSize = 1000;
        let rawBatch = [];
        let addressMasterBatch = [];

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
            this.CouncilDistric = c11;
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
  
                // runAddressMaster(data)
                runRawData(cleanUpLine(data));
            })
            .on("end", function(){
                // Last batch DB function goes here
                console.log("done");
            });
            
        let runAddressMaster = (readableStream) => {
            let tempAddress = new AddressMaster();
        }

        let runRawData = (readableStream) => {
            let tempData = new RawData(...readableStream);
            console.log(tempData)
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

