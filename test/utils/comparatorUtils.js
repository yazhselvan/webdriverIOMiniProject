import chalk from "chalk";
import allureReporter from '@wdio/allure-reporter';

export class comparatorUtils{

    static async compareObjects(obj1, obj2){
        const webTableValues = Object.values(obj1);
        const excelValues = Object.values(obj2);
        const webTableParsed =[];
        const excelValuesParsed =[];
        const mismatchedRows = []
      
        for (let i = 0; i < webTableValues.length; i+=3) {
            webTableParsed.push(webTableValues.slice(i, i+3));
            excelValuesParsed.push(excelValues.slice(i, i+3));
            
        }

        allureReporter.addAttachment("Complete Parsed Data from Web Table", webTableParsed);
        allureReporter.addAttachment("Complete Parsed Data from Excel", excelValuesParsed);

        const result = JSON.stringify(webTableParsed) === JSON.stringify(excelValuesParsed);

        if(!result){
            for (let i = 0; i < webTableParsed.length; i++) {
                if (JSON.stringify(webTableParsed[i]) !== JSON.stringify(excelValuesParsed[i])) {
                    mismatchedRows.push({ index: i, obj1Row: webTableParsed[i], obj2Row: excelValuesParsed[i] });
                }
            }

            console.log('Mismatched Rows:');
            mismatchedRows.forEach(row => {
                console.log(chalk.red(`Row ${row.index+1}:`));
                console.log(chalk.red('Web Table Data:', row.obj1Row));
                console.log(chalk.red('Excel Data:', row.obj2Row));
                console.log('__________________________________________');
                allureReporter.addAttachment('Mismatched Row:', row.index+1);
                allureReporter.addAttachment('Web Table Data:', row.obj1Row);
                allureReporter.addAttachment('Excel Data:', row.obj2Row);

            });
        }
        return result;
          
    }

}

