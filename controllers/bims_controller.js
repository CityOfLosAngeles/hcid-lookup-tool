let fs = require('fs'),
    csv = require("csv-parse");

let parser = csv();

module.exports = {
    readData: (app) => {
        let stream = fs.createReadStream("./temp-data/bims_iter2.csv-1489463580578");
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
     
        done = () => {
            console.log(batch);
            stream.unpipe(parser);
            parser.end();
            stream.destroy();
        }

        runConstructor = (r) => {
            var tempRow = new Row(r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7], r[8], r[9], r[10], r[11], r[12], r[13]);
            batch.push(tempRow);
        }

        parser.on('readable', () => {
            if (i <= num) {
                runConstructor(parser.read());
                i++;
            } else {
                done();
            }
        });

        parser.on('error', () => {
            console.log('Error');
        });

        parser.on('finish', done);
        stream.pipe(parser);
    }
}
