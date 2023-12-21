import chalk from "chalk";
import allureReporter from '@wdio/allure-reporter';

export class comparatorUtils{

    static async compareObjects(obj1, obj2){
        const webTableValues = Object.values(obj1);
        const excelValues = Object.values(obj2);
        let webTableParsed =[];
        let excelValuesParsed =[];
        let mismatchedRows = []
        let result = true;

        //check for table row length
        if(webTableValues.length!=excelValues.length){
            result = false;
            //logger when web Table row values are greater than excel row values
            if(webTableValues.length>excelValues.length){
                console.log(chalk.red("Number of rows is higher in Web Table"));
                for (let i = 0; i < webTableValues.length; i+=3) {
                    webTableParsed.push(webTableValues.slice(i, i+3));
                    excelValuesParsed.push(excelValues.slice(i, i+3));
                }
                allureReporter.addAttachment("Complete Parsed Data from Web Table", webTableParsed);
                allureReporter.addAttachment("Complete Parsed Data from Excel", excelValuesParsed);
            } else { //logger when excel row values are greater than web table row values
                console.log(chalk.red("Number of rows is higher in Excel Sheet"))
                for (let i = 0; i < excelValues.length; i+=3) {
                    excelValuesParsed.push(excelValues.slice(i, i+3));
                    webTableParsed.push(webTableValues.slice(i, i+3));   
                }
                allureReporter.addAttachment("Complete Parsed Data from Web Table", webTableParsed);
                allureReporter.addAttachment("Complete Parsed Data from Excel", excelValuesParsed);
            }
        }else{// when row values are equal
            for (let i = 0; i < webTableValues.length; i+=3) {
                webTableParsed.push(webTableValues.slice(i, i+3));
                excelValuesParsed.push(excelValues.slice(i, i+3));    
            } //check whether the data are equal in each row
            result = JSON.stringify(webTableParsed) === JSON.stringify(excelValuesParsed);
        }

        //loggers if data are not equal
        if(!result){
            for (let i = 0; i < webTableParsed.length; i++) {
                if (JSON.stringify(webTableParsed[i]) !== JSON.stringify(excelValuesParsed[i])) {
                    mismatchedRows.push({ index: i, obj1Row: webTableParsed[i], obj2Row: excelValuesParsed[i] });
                }
            }

            console.log('Mismatched Rows:');
            mismatchedRows.forEach(row => {
                console.log(chalk.red(`Mismatched at Row ${row.index+1}:`));
                console.log(chalk.red('Web Table Data:', '['+row.obj1Row+']'));
                console.log(chalk.red('Excel Data:', '['+row.obj2Row+']'));
                console.log('__________________________________________');
                allureReporter.addAttachment('Mismatched Row:', row.index+1);
                allureReporter.addAttachment('Web Table Data:', row.obj1Row);
                allureReporter.addAttachment('Excel Data:', row.obj2Row);

            });
        } else{//loggers when data are equal
            console.log(chalk.green("Rows Matched"));
            console.log("Web Table data: ", chalk.green(webTableParsed));
            console.log("Excel Data: ", chalk.green(excelValuesParsed));
            allureReporter.addAttachment("Complete Parsed Data from Web Table", webTableParsed);
            allureReporter.addAttachment("Complete Parsed Data from Excel", excelValuesParsed);
        }
        return result;
          
    }

}

