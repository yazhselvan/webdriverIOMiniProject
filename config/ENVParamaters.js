export class param{

    static getURL(){
        return "https://www.hyrtutorials.com/p/add-padding-to-containers.html";
    }

    //get Test Data type through command line
    static getWorkSheet(){
        if(process.argv.includes("ValidData")){
            return "ValidData";
        }else if(process.argv.includes("ExtraRow")){
            return "ExtraRow";
        }else if(process.argv.includes("ValuesModified")){
            return "ValuesModified";
        }else{
            return "ValidData";
        }
    }
    
}
