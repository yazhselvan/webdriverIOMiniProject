import allureReporter from '@wdio/allure-reporter';

export class webTablesUtils{

    static async getContactXpath(rowIndex, dataIndex){
        var xpathTemplate = "//table[@id='contactList']/tbody/tr["+rowIndex+"]/td["+dataIndex+"]";
        var contactText = $(xpathTemplate).getText();
        return contactText
    }

    //get all Values from web Table
    static async readContactsfromWebTable(){ 
        var rows = await $$("//table[@id='contactList']/tbody/tr");
        var contacts = [];
        for(var i =2; i<=rows.length; i++){
            for(var j =2; j<=4; j++){
                contacts.push(await this.getContactXpath(i, j))
            }
        }
    
        return contacts;
    }

}



