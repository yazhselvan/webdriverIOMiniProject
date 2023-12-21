import { webTablesUtils } from '../utils/webTablesUtils.js';
import { excelFileHandlingUtils } from '../utils/excelFileHandlingUtils.js'
import { comparatorUtils } from '../utils/comparatorUtils.js'
import { webTable } from '../pageObjects/webTable.js';



describe('Xpath Tutorials Application', async() =>{

    it('Web Tables should match with the given Excel data', async()=>{

        await webTable.ScrolltoWebTableData();
        
        expect(await comparatorUtils.compareObjects(await webTablesUtils.readContactsfromWebTable(), 
        await excelFileHandlingUtils.readContactsFromExcel())).toBe(true);
    
    }) 

})