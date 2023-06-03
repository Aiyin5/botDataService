const sql = require("./db.js");
// constructor
const newFile = function(file) {
    this.bot_id = file.bot_id;
    this.file_name = file.file_name;
    this.file_content = file.content;
};
const tablename="file_info";
newFile.create = async (fileInfo, result) => {
    try {
        let res=await sql.insert(tablename,fileInfo);
        console.log("end")
        result(null, res);
    }
    catch (err){
        console.log(err)
        result(null, err);
    }
};
newFile.findAll= async(result) =>{
    try {
        let res=await sql.select(tablename);
        result(null, res);
    }
    catch (err){
        console.log(err)
        result(null, err);
    }
}
newFile.find = async (where,result) =>{
    try {
        let res=await sql.selectByWhere(tablename,where);
        result(null, res);
    }
    catch (err){
        console.log(err)
        result(null, err);
    }
}
newFile.update = async (where,result) =>{
    let condition={
        "id":where.id
    }
    try {
        let res=await sql.update(tablename,where,condition);
        result(null, res);
    }
    catch (err){
        console.log(err)
        result(null, err);
    }
}

newFile.findByPage = async (where,result) =>{
    let condition={
        "bot_id":where.bot_id
    }
    let searchCondition={
        "flag":false,
        "word":""
    }
    if(!where.searchWord){
        searchCondition.flag=false;
    }
    else {
        searchCondition.flag=true;
        searchCondition.word=where.searchWord;
    }
    try {
        let res=await sql.fileByPage(tablename,condition,where.page,where.pageSize,searchCondition);
        result(null, res);
    }
    catch (err){
        console.log(err)
        result(null, err);
    }
}
newFile.deleteFileInfo = async (data,result)=>{
    try {
        let res1 = await sql.delete(tablename,data);
        result(null, res1);
    }
    catch (err){
        console.log(err)
        result(null, err);
    }
}
module.exports = newFile;