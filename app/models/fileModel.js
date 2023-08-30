const sql = require("./db.js");
const User = require("./userModel");
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
        let trimmedStr = fileInfo.file_content.replace(/\s/g, ""); // 使用正则表达式去除空格
        let con_length = trimmedStr.length;
        let where={
            "bot_id":fileInfo.bot_id
        }
        let updateData={
            "columnName":"yuliao_count",
            "increaseAmount" :con_length
        }
        await User.updateLimit(updateData,where, (err, data)=> {
            if (err) {
                result(err, null);
            } else {
                result(null, res);
            }
        })
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
newFile.newfind =async function (where) {
    try {
        let res=await sql.selectByWhere(tablename,where);
        return res;
    }
    catch (err){
        return null;
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
        let res=await sql.fileInfoByPage(tablename,condition,where.page,where.pageSize,searchCondition);
        result(null, res);
    }
    catch (err){
        console.log(err)
        result(null, err);
    }
}
newFile.deleteFileInfo = async (data,limitInfo,result)=>{

    try {
        let res1 = await sql.delete(tablename,data);
        let where={
            "bot_id":limitInfo.bot_id
        }
        let updateData={
            "columnName":"yuliao_count",
            "increaseAmount" :0-limitInfo.doc_length
        }
        await User.updateLimit(updateData,where, (err, data)=>{
            if(err){
                result(err, null);
            }
            else {
                result(null, res1);
            }
        })
    }
    catch (err){
        console.log(err)
        result(null, err);
    }
}

module.exports = newFile;