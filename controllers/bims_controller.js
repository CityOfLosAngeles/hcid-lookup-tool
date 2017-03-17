import fs from 'fs';
import csv from 'fast-csv';


module.exports = {
    readData: (app) => {
        let stream = fs.createReadStream("./temp-data/bims.csv");
        let i = 0;
        let num = 1000;
        let batch = [];

        function Row(c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13, c14) {
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

        let csvStream = csv({quote: null})
            .on("data", function(data){
                i++
                console.log(`----------${i}-----------------`);
                runConstructor(data);
            })
            .on("end", function(){
                console.log("done");
            });


        let runConstructor = (readableStream) => {
            let tempRow = new Row(...readableStream);
            // batch.push(tempRow);
            console.log(tempRow);
            return;
        }

        stream.pipe(csvStream);
    }
}

