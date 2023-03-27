const sql = require("./db.js");

// constructor
const File = function(file) {
    this.bot_id = file.bot_id;
    this.doc_name = file.doc_name;
    this.type = file.type;
    this.content = file.content;
};
const tablename="yuliao_text";
File.create = async (newFile, result) => {
    try {
        let res=await sql.insert(tablename,newFile);
        result(null, res);
    }
    catch (err){
        console.log(err)
    }
};
File.find = async (where,result) =>{
    try {
        let res=await sql.selectByWhere(tablename,where);
        result(null, res);
    }
    catch (err){
        console.log(err)
        result(null, err);
    }
}
File.deleteFileInfo = async (data,result)=>{
    try {
        let res = await sql.delete(tablename,data);
        result(null, res);
    }
    catch (err){
        console.log(err)
        result(null, err);
    }
}
module.exports = File;