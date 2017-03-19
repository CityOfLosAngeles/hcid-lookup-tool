import fs from 'fs';
import csv from 'fast-csv';

module.exports = {
    readData: (app) => {
        let stream = fs.createReadStream("./temp-data/prop_site_address.csv");
        let batchSize = 1000;
        let rawBatch = [];
        let addressMasterBatch = [];

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

