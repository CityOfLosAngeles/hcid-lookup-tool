import fs from 'fs';
import csv from 'fast-csv';
import addressParser from 'parse-address';
import addressController from './address.js';

module.exports = {
    readData: (app) => {
        let stream = fs.createReadStream("./temp-data/prop_site_address.csv");
        let rawBatch = [];
        let addressMasterBatch = [];
        let counter = 0;

        function RawData(c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13, c14, c15, c16, c17, c18, c19, c20, c21, c22, c23, c24, c25, c26, c27, c28, c29, c30, c31, c32, c33, c34, c35, c36, c37, c38, c39, c40, c41, c42, c43, c44, c45, c46, c47) {
            this.Apn = c1;
            this.HouseID = c2;
            this.Pin = c3;
            this.HouseNum = c4;
            this.HouseFracNum = c5;
            this.PreDirCd = c6;
            this.StreetName = c7;
            this.StreetTypeCd = c8;
            this.PostDirCd = c9;
            this.UnitRange = c10;
            this.City = c11;
            this.Zip = c12;
            this.ZipSuffix = c13;
            this.XCoord = c14;
            this.YCoord = c15;
            this.Lon = c16;
            this.Lat = c17;
            this.Pind = c18;
            this.EngDist = c19;
            this.CouncilDistrict = c20;
            this.LupLandUseCd = c21;
            this.FlgHistMonument = c22;
            this.LutCodeOfficeCd = c23;
            this.LutRentAreaCd = c24;
            this.LutHistPresZoneCd = c25;
            this.TbmPage = c26;
            this.TbmRow = c27;
            this.TbmCol = c28;
            this.CenTract2010 = c29;
            this.CenBlock2010GeoID = c30;
            this.CenBlock2010 = c31;
            this.CenBlockGrp2010 = c32;
            this.CommunityName = c33;
            this.FlgInsideCoi = c34;
            this.CraRedevCd = c35;
            this.StateAssemDist = c36;
            this.StateSenDist = c37;
            this.UsCongDist = c38;
            this.CountySupDistNum = c39;
            this.CommunityPlanAreaID = c40;
            this.NeighborhoodCouncilID = c41;
            this.FlgNsp1 = c42;
            this.FlgNsp2 = c43;
            this.FlgNsp3 = c44;
            this.HseAssignedCd = c45;
            this.HseFlgDeleted = c46;
            this.ApnFlgDeleted = c47;
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
                if(!data[0].includes("Apn")){
                    console.log("^^^^^^ Inside if statement of 'on data' ^^^^^^");
                    runConstructors(cleanUpLine(data));
                }
            })
            .on("end", function(){
                // Last batch DB function goes here
                console.log("done");
            });
            
        let runAddressMaster = (readableStream) => {
            let state = 'CA';

            let street_num = readableStream[3];
            if(!street_num){street_num = null;}

            let street_dir_cd = readableStream[5];
            if(!street_dir_cd){street_dir_cd = null;}

            let street_name = readableStream[6];
            if(!street_name){street_name = null;}

            let street_type = readableStream[7];
            if(!street_type){street_type = null;}

            let street_unit = readableStream[9];
            if(!street_unit){street_unit = null;}

            let zipcode = readableStream[11];
            if(!zipcode){zipcode = null;}

            let city = readableStream[10];
            if(!city){city = null;}

            let tempAddress = new AddressMaster(street_num, street_name, street_type, street_dir_cd, street_unit, city, state, zipcode);
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
            addressController.createPropSite(addressMasterBatchObject, rawBatchObject, resume3);
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

