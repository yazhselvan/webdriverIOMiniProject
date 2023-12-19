import xlsx from 'xlsx';
import fs from 'fs';
import allureReporter from '@wdio/allure-reporter';

export class excelFileHandlingUtils{

    static async ConvertExceltoJSON(){

        const workbook = xlsx.read(fs.readFileSync("./testData/ContactDetails.xlsx")) 
        const worksheet = workbook.Sheets["Table 0"];
        let ContactDetails = xlsx.utils.sheet_to_json(worksheet);
        return ContactDetails;

    }

    static async readContactsFromExcel(){
        let contacts = await this.ConvertExceltoJSON();
        let contactArray = [];
        for(var i=0;i<(await contacts).length;i++){
            contactArray.push(await contacts[i].Contact);
            contactArray.push(await contacts[i].Country);
            contactArray.push(await (contacts[i].Salary).toString());
        }
        
        return contactArray;
        
    }

}

