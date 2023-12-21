export class webTable{

    static getTableData(){
        return "#contactList";
    }

    static async ScrolltoWebTableData(){
        const TableData = $(this.getTableData());
        await TableData.scrollIntoView();
    }
}